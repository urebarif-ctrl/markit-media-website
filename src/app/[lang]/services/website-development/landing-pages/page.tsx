import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Landing Page Design",
  description:
    "High-converting landing page design for campaigns, product launches, and lead generation. Conversion-focused layouts with A/B testing and performance tracking.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/services/website-development/landing-pages",
  },
};

export default function LandingPagesPage() {
  return (
    <SubServicePage
      parentTitle="Website Development"
      parentHref="/services/website-development"
      title="Landing Page Design"
      description="Get landing pages built to convert. We design and develop focused, single-purpose pages for your ad campaigns, product launches, and lead generation efforts, with clear messaging, strong calls to action, and the tracking infrastructure to measure what works."
      details={[
        "Conversion-focused design with clear visual hierarchy, compelling headlines, and strategically placed calls to action that guide visitors toward your goal.",
        "Responsive development ensuring your landing page looks and performs well on desktop, tablet, and mobile devices without compromising load speed.",
        "A/B testing setup to compare headlines, layouts, form lengths, and CTAs so you can make data-driven decisions about what converts best.",
        "Conversion tracking implementation with pixels, UTM parameters, and event tracking to measure campaign performance and attribute leads to their source.",
        "Form and lead capture integration connecting to your CRM, email marketing platform, or custom backend so leads are routed and followed up on immediately.",
        "Page speed optimization with lightweight code, optimized images, and minimal dependencies to keep load times fast and bounce rates low.",
      ]}
      benefits={[
        "Purpose-built pages that focus visitors on a single action",
        "Faster time to market for campaigns and launches",
        "Data-driven optimization through A/B testing",
        "Seamless integration with your ad platforms and CRM",
        "Fast load times that reduce bounce rates",
        "Clear performance tracking from click to conversion",
      ]}
      faq={[
        {
          q: "What makes a landing page different from a regular website page?",
          a: "A landing page is designed for a single goal, whether that is capturing a lead, driving a signup, or promoting a specific offer. Unlike a full website page with navigation and multiple paths, a landing page removes distractions and focuses the visitor on one action.",
        },
        {
          q: "Do you handle A/B testing?",
          a: "Yes. We set up A/B tests to compare different versions of your landing page, including variations in headlines, images, form fields, and calls to action. We track the results and recommend the winning version based on your conversion goals.",
        },
        {
          q: "Can you build landing pages for my ad campaigns?",
          a: "Absolutely. We build landing pages specifically designed to match the messaging and intent of your Google Ads, Meta Ads, or other paid campaigns, with proper tracking to measure cost per lead and return on ad spend.",
        },
        {
          q: "How fast can you deliver a landing page?",
          a: "A standard landing page can be designed, developed, and launched within 1-2 weeks. For urgent campaigns, we offer expedited timelines to get your page live quickly without cutting corners on quality.",
        },
      ]}
    />
  );
}
