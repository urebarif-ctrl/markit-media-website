import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Email List Management Services",
  description:
    "Email list management services including segmentation, list hygiene, subscriber growth strategies, and lifecycle management. Markit Media keeps your list healthy, organized, and ready to perform.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/email-marketing/list-management",
  },
};

export default function ListManagementPage() {
  return (
    <SubServicePage
      parentTitle="Email Marketing"
      parentHref="/services/email-marketing"
      title="List Management"
      description="A clean, well-segmented email list is the foundation of every successful email program. We handle segmentation, hygiene, growth strategy, and lifecycle management so your emails reach the right people and your sender reputation stays strong."
      details={[
        "Audience segmentation — divide your subscriber list into meaningful groups based on demographics, purchase history, engagement level, and behavior so you can send targeted messages instead of one-size-fits-all blasts.",
        "List hygiene and cleanup — identify and remove invalid email addresses, hard bounces, spam traps, and long-term inactive subscribers that hurt your deliverability and inflate your costs.",
        "Subscriber growth strategy — develop opt-in forms, landing pages, lead magnets, and signup incentives that attract qualified subscribers who actually want to hear from you.",
        "Preference and consent management — set up subscription preference centers and ensure your data collection and opt-in processes comply with email marketing regulations including GDPR and CAN-SPAM.",
        "Lifecycle tagging — implement tagging and tracking systems that automatically categorize subscribers by lifecycle stage, from new lead to active customer to at-risk, enabling more relevant communication.",
        "List migration and consolidation — merge subscriber lists from multiple tools or sources into a single, deduplicated, properly tagged database without losing historical data or engagement records.",
      ]}
      benefits={[
        "Higher open and click rates through targeted segmentation",
        "Lower email costs by removing contacts who are not engaging",
        "Stronger sender reputation and better inbox placement",
        "Compliance with privacy regulations and subscriber consent requirements",
        "Steady growth of qualified subscribers who match your target audience",
        "A single, organized subscriber database that your entire team can rely on",
      ]}
      faq={[
        {
          q: "Why is list hygiene important?",
          a: "Sending to invalid or inactive addresses damages your sender reputation, which causes more of your emails to land in spam. Regular list cleaning improves deliverability, lowers bounce rates, and reduces the cost of your email platform by removing contacts who are not engaging.",
        },
        {
          q: "How often should I clean my email list?",
          a: "We recommend a thorough list cleaning at least once per quarter. In between, automated hygiene rules should handle hard bounces and obvious invalid addresses in real time. The frequency may increase if you send at high volume.",
        },
        {
          q: "What is the best way to grow an email list?",
          a: "Offer something genuinely valuable in exchange for an email address, such as a useful guide, discount, or exclusive content. Pair that with well-placed opt-in forms on your website. Purchased lists are never recommended because they damage deliverability and violate most platform policies.",
        },
        {
          q: "Can you migrate my list from another email platform?",
          a: "Yes. We handle list migrations between platforms regularly. We export your subscriber data, clean and deduplicate it, map fields to the new platform, and verify that tags, segments, and engagement history transfer correctly.",
        },
      ]}
    />
  );
}
