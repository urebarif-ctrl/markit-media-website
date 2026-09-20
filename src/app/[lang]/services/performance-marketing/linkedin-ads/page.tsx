import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "LinkedIn Ads",
  description:
    "LinkedIn advertising for B2B companies. Sponsored Content, InMail, lead gen forms, account-based marketing, and precise professional targeting to reach decision-makers.",
  alternates: {
    canonical:
      "https://themarkitmedia.com/en/services/performance-marketing/linkedin-ads",
  },
};

export default function LinkedInAdsPage() {
  return (
    <SubServicePage
      parentTitle="Performance Marketing"
      parentHref="/services/performance-marketing"
      title="LinkedIn Ads"
      description="Reach decision-makers and professionals where they engage with business content. LinkedIn Ads offer unmatched B2B targeting capabilities, letting you reach prospects by job title, company, industry, and seniority. We build campaigns that generate qualified leads and move prospects through complex B2B sales cycles."
      details={[
        "B2B audience targeting using LinkedIn's professional data, including job title, company name, industry, seniority level, skills, and group membership for precise targeting of decision-makers.",
        "Sponsored Content campaigns across single image, carousel, video, and document formats in the LinkedIn feed, driving engagement, website traffic, and lead generation.",
        "Sponsored InMail (Message Ads) campaigns delivering personalized messages directly to prospect inboxes with strong open rates, ideal for event promotion, content offers, and direct outreach.",
        "Lead Gen Form campaigns with pre-filled professional data that reduce friction and increase form completion rates, with direct CRM integration for seamless lead handoff to your sales team.",
        "Account-based marketing (ABM) strategies using LinkedIn's company targeting and matched audiences to focus ad spend on your highest-value target accounts and buying committees.",
      ]}
      benefits={[
        "Unmatched B2B targeting by job title, company, industry, and seniority",
        "Reach decision-makers in a professional context where they evaluate solutions",
        "Lead Gen Forms with pre-filled data deliver higher conversion rates",
        "Account-based marketing capabilities to focus on high-value target accounts",
        "Strong performance for high-consideration B2B products and services",
        "CRM integration for seamless lead routing and sales follow-up",
      ]}
      faq={[
        {
          q: "Is LinkedIn Ads only for B2B companies?",
          a: "LinkedIn is strongest for B2B, but it also works for B2C brands targeting professionals, such as premium consumer products, financial services, education, and recruiting.",
        },
        {
          q: "Why are LinkedIn Ads more expensive than other platforms?",
          a: "LinkedIn's cost per click is higher because you are reaching a professional audience with precise firmographic targeting. The value per lead is typically much higher for B2B, making the cost per qualified opportunity competitive.",
        },
        {
          q: "What are LinkedIn Lead Gen Forms?",
          a: "Lead Gen Forms are native LinkedIn forms that pre-fill with a user's profile data, such as name, email, job title, and company. They remove the need to visit a landing page, which significantly increases form completion rates.",
        },
        {
          q: "Can you target specific companies on LinkedIn?",
          a: "Yes. LinkedIn allows company-level targeting by name, size, industry, and growth rate. We use matched audiences and account lists to run account-based marketing campaigns focused on your target accounts.",
        },
        {
          q: "How do LinkedIn InMail ads work?",
          a: "Sponsored InMail delivers a message directly to a prospect's LinkedIn inbox. Messages are only sent when the user is active, ensuring visibility. They work well for event invitations, content downloads, and personalized offers.",
        },
      ]}
    />
  );
}
