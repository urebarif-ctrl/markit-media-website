import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Analytics Setup Services",
  description:
    "GA4, Google Tag Manager, conversion tracking, and custom dashboards. Markit Media sets up accurate analytics infrastructure so you can measure what matters and make data-driven decisions.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/digital-marketing/analytics-setup",
  },
};

export default function AnalyticsSetupPage() {
  return (
    <SubServicePage
      parentTitle="Digital Marketing"
      parentHref="/services/digital-marketing"
      title="Analytics Setup"
      description="You can't optimize what you can't measure. We implement clean, accurate analytics infrastructure — GA4, Google Tag Manager, conversion tracking, and reporting dashboards — so your team has reliable data to make marketing decisions, attribute revenue, and identify what's working."
      details={[
        "GA4 implementation and configuration — set up Google Analytics 4 with proper property settings, data streams, event tracking, custom dimensions, and user properties tailored to your business model.",
        "Google Tag Manager setup — implement GTM as your central tag management system, organizing triggers, variables, and tags for clean deployment without relying on developer resources for every change.",
        "Conversion tracking and goal configuration — define and implement conversion events across your website, forms, phone calls, and ecommerce transactions so you know which channels drive real business results.",
        "Cross-domain and enhanced ecommerce tracking — configure tracking across multiple domains, subdomains, and ecommerce platforms to capture the complete user journey from first touch to purchase.",
        "Custom dashboard and reporting setup — build automated dashboards in Looker Studio or your preferred platform that surface the metrics your team actually needs, updated in real time.",
        "Data audit and quality assurance — review existing tracking for gaps, duplicates, and misconfigurations, then fix issues to ensure the data you're making decisions on is accurate.",
      ]}
      benefits={[
        "Accurate, reliable data you can trust for decision-making",
        "Clear visibility into which channels and campaigns drive revenue",
        "Centralized tag management that reduces dependency on developers",
        "Custom dashboards that surface the metrics your team needs daily",
        "Proper conversion tracking across every touchpoint and platform",
        "Clean data foundation that supports advanced analysis and automation",
      ]}
      faq={[
        {
          q: "Why should we move to GA4?",
          a: "GA4 is Google's current analytics platform, built around event-based tracking that better captures modern user behavior across devices and platforms. It offers improved cross-device measurement, built-in machine learning insights, and tighter integration with Google Ads.",
        },
        {
          q: "What is Google Tag Manager and do we need it?",
          a: "Google Tag Manager is a container system that lets you manage tracking tags, pixels, and scripts from one interface without editing website code. It gives your marketing team the ability to deploy and update tracking independently from your development team.",
        },
        {
          q: "How do you ensure tracking accuracy?",
          a: "We follow a structured QA process: verifying every event fires correctly in debug mode, testing across browsers and devices, validating data against known benchmarks, and documenting the full tracking implementation for ongoing maintenance.",
        },
        {
          q: "Can you set up tracking for platforms beyond Google?",
          a: "Yes. We implement tracking for Meta Pixel, LinkedIn Insight Tag, TikTok Pixel, and other advertising and analytics platforms. GTM serves as the central hub for deploying and managing all of these tags.",
        },
      ]}
    />
  );
}
