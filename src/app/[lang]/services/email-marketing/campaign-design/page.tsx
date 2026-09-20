import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Email Campaign Design Services",
  description:
    "Professional email campaign design including custom templates, brand-consistent layouts, responsive design, and conversion-focused creative. Markit Media designs emails that look great and drive action.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/email-marketing/campaign-design",
  },
};

export default function CampaignDesignPage() {
  return (
    <SubServicePage
      parentTitle="Email Marketing"
      parentHref="/services/email-marketing"
      title="Email Campaign Design"
      description="Get professionally designed email campaigns that reflect your brand and drive action. We create custom templates and one-off campaign designs that look great on every device, load quickly, and guide readers toward a clear call to action."
      details={[
        "Custom template design — create reusable email templates built around your brand identity, including colors, typography, logo placement, and layout structure that your team can use for ongoing campaigns.",
        "Campaign-specific creative — design one-off email layouts for product launches, promotions, announcements, and seasonal campaigns with visuals and copy structure tailored to each campaign's goal.",
        "Responsive and accessible design — build emails that render correctly across all major email clients, screen sizes, and devices, with proper alt text, readable font sizes, and accessible color contrast.",
        "Conversion-focused layout — structure each email with a clear visual hierarchy, scannable content blocks, and prominent calls to action positioned where readers are most likely to engage.",
        "Brand consistency audits — review your existing email designs against your brand guidelines and provide recommendations to improve visual consistency across all your email communications.",
        "Design system for email — establish a set of reusable components, spacing rules, and style guidelines that keep every email on-brand regardless of who on your team builds it.",
      ]}
      benefits={[
        "Professional, on-brand emails that build trust with every send",
        "Higher engagement through clear layout and strong visual hierarchy",
        "Consistent rendering across Gmail, Outlook, Apple Mail, and mobile clients",
        "Reusable templates that save your team time on future campaigns",
        "Accessible designs that reach your full audience including those using screen readers",
        "A cohesive email design system that scales with your marketing program",
      ]}
      faq={[
        {
          q: "What email platforms do you design for?",
          a: "We design for all major email marketing platforms including Mailchimp, Klaviyo, HubSpot, ActiveCampaign, and others. Templates are built to be compatible with your platform's editor so your team can easily make content updates.",
        },
        {
          q: "Will the emails look good on mobile?",
          a: "Yes. Every email we design is fully responsive and tested across major email clients and devices. We test rendering in Gmail, Outlook, Apple Mail, Yahoo, and on both iOS and Android to ensure a consistent experience.",
        },
        {
          q: "Can I edit the templates myself after they are built?",
          a: "Absolutely. We build templates within your email platform's editor so your team can update text, images, and links without needing design or coding skills. We also provide a brief guide on how to use each template.",
        },
        {
          q: "How many revisions are included in a design project?",
          a: "Our standard process includes two rounds of revisions after the initial design. This is usually enough to finalize the design, but we are flexible if additional adjustments are needed to get it right.",
        },
      ]}
    />
  );
}
