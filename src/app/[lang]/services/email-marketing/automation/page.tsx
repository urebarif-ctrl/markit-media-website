import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Email Automation Services",
  description:
    "Email automation services including welcome sequences, drip campaigns, abandoned cart recovery, and lifecycle email flows. Markit Media builds automated emails that nurture leads and recover revenue.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/email-marketing/automation",
  },
  openGraph: {
    title: "Email Automation Services",
    description: "Email automation services including welcome sequences, drip campaigns, abandoned cart recovery, and lifecycle email flows. Markit Media builds automated...",
  },
};

export default function EmailAutomationPage() {
  return (
    <SubServicePage
      parentTitle="Email Marketing"
      parentHref="/services/email-marketing"
      title="Email Automation"
      description="Set up automated email sequences that work around the clock to nurture leads, onboard new subscribers, and recover lost sales. We design and build flows that send the right message at the right time based on subscriber behavior and lifecycle stage."
      details={[
        "Welcome sequences — create a series of emails that introduce new subscribers to your brand, set expectations, and guide them toward their first purchase or desired action within the first few days.",
        "Drip campaigns — build timed email sequences that deliver educational content, product information, or promotional offers over days or weeks to keep your brand top of mind and move contacts toward conversion.",
        "Abandoned cart recovery — set up automated emails that remind shoppers about items left in their cart, address common objections, and provide a clear path back to complete their purchase.",
        "Post-purchase follow-up — design automated emails that confirm orders, request reviews, suggest related products, and encourage repeat purchases to maximize customer lifetime value.",
        "Re-engagement campaigns — build win-back sequences that identify inactive subscribers and attempt to re-engage them with targeted offers or content before removing them from your active list.",
        "Flow mapping and logic — plan the complete automation architecture including triggers, timing delays, conditional branching, and exit conditions to ensure every subscriber gets a relevant experience.",
      ]}
      benefits={[
        "Revenue generation that continues even when your team is offline",
        "Consistent onboarding experience for every new subscriber",
        "Recovered sales from abandoned carts without manual follow-up",
        "Stronger customer relationships through timely, relevant communication",
        "Reduced manual workload for your marketing team",
        "Clear performance data for each automated flow to guide optimization",
      ]}
      faq={[
        {
          q: "What is the difference between email automation and a regular email campaign?",
          a: "A regular campaign is a one-time send to a list. Email automation is a pre-built sequence that triggers automatically based on subscriber actions like signing up, making a purchase, or abandoning a cart. Automations run continuously without manual intervention.",
        },
        {
          q: "Which automated flows should I set up first?",
          a: "We typically recommend starting with a welcome sequence and abandoned cart recovery because they address the highest-impact moments in the customer journey. From there, we add post-purchase, re-engagement, and nurture flows based on your priorities.",
        },
        {
          q: "How many emails should be in an automated sequence?",
          a: "It depends on the goal. A welcome sequence might have three to five emails over a week. A nurture drip could run for several weeks. We design each flow based on subscriber behavior data and the complexity of your sales cycle.",
        },
        {
          q: "Can automations be personalized for different audience segments?",
          a: "Yes. We use conditional logic and segmentation to tailor automated emails based on subscriber attributes, behavior, and engagement history. This means different people can receive different messages within the same automation based on what is most relevant to them.",
        },
      ]}
    />
  );
}
