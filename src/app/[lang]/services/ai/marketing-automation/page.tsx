import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Marketing Automation Services",
  description:
    "Marketing automation services including workflow design, trigger-based campaigns, lead nurturing sequences, and CRM integration. Markit Media builds systems that move leads through your funnel automatically.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/ai/marketing-automation",
  },
  openGraph: {
    title: "Marketing Automation Services",
    description: "Marketing automation services including workflow design, trigger-based campaigns, lead nurturing sequences, and CRM integration. Markit Media builds sys...",
  },
};

export default function MarketingAutomationPage() {
  return (
    <SubServicePage
      parentTitle="AI Solutions"
      parentHref="/services/ai"
      title="Marketing Automation"
      description="Automate repetitive marketing tasks so your team can focus on strategy and creative work. We design workflows, triggers, and sequences that nurture leads, re-engage inactive contacts, and move prospects through your funnel with the right message at the right time."
      details={[
        "Workflow design and mapping — plan end-to-end automation workflows that define what happens at each stage of your customer journey, from first touch to post-purchase follow-up.",
        "Trigger-based campaigns — set up behavioral triggers such as form submissions, page visits, and cart activity that automatically launch targeted messages when a prospect takes a meaningful action.",
        "Lead nurturing sequences — build multi-step email and messaging sequences that educate, build trust, and guide prospects closer to a purchase decision over days or weeks.",
        "Lead scoring implementation — configure scoring models that assign points based on engagement activity and demographic fit so your sales team knows which leads are ready for outreach.",
        "CRM and tool integration — connect your marketing automation platform with your CRM, email tools, ad platforms, and analytics to create a unified system where data flows between tools without manual effort.",
        "Performance monitoring and optimization — track workflow performance metrics including open rates, conversion rates, and drop-off points, then refine sequences based on what the data reveals.",
      ]}
      benefits={[
        "Consistent lead follow-up that never falls through the cracks",
        "Personalized messaging delivered at scale without manual effort",
        "Faster lead-to-customer conversion through timely, relevant touchpoints",
        "Better alignment between marketing and sales through shared lead data",
        "Reduced time spent on repetitive campaign tasks",
        "Clear visibility into which workflows drive results and which need adjustment",
      ]}
      faq={[
        {
          q: "What marketing automation platforms do you work with?",
          a: "We work with major platforms including HubSpot, ActiveCampaign, Mailchimp, Klaviyo, and others. We recommend a platform based on your business size, budget, and the complexity of workflows you need.",
        },
        {
          q: "How is marketing automation different from email marketing?",
          a: "Email marketing is one channel. Marketing automation uses multiple channels and behavioral triggers to deliver the right message at the right time. It includes lead scoring, workflow branching, CRM syncing, and cross-channel coordination that goes beyond sending emails.",
        },
        {
          q: "Do I need a large contact list to benefit from automation?",
          a: "No. Even businesses with smaller lists benefit because automation ensures every lead gets consistent, timely follow-up. The value comes from the quality and timing of your messages, not the size of your list.",
        },
        {
          q: "How do you measure the success of automation workflows?",
          a: "We track metrics like email open and click rates, lead scoring accuracy, conversion rates at each workflow stage, and time-to-conversion. Regular reporting shows which sequences perform well and where we need to make adjustments.",
        },
      ]}
    />
  );
}
