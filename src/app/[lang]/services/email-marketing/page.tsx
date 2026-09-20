import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Email Marketing",
  description: "Email marketing services: campaign design, email automation, list management, A/B testing, and deliverability optimization. Turn your email list into a revenue channel.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/email-marketing" },
  openGraph: {
    title: "Email Marketing",
    description: "Email marketing services: campaign design, email automation, list management, A/B testing, and deliverability optimization. Turn your email list into a ...",
  },
};

export default function EmailMarketingPage() {
  return (
    <ServicePage
      icon={Mail}
      heroImage="/images/services/email.jpg"
      blogCategory="Email"
      title="Email Marketing"
      description="Turn your email list into a consistent revenue channel. We design campaigns, build automation flows, manage your lists, run A/B tests, and optimize deliverability."
      longDescription="Email remains one of the highest-ROI marketing channels. Our email marketing team designs and sends campaigns that get opened, read, and clicked. We build automated sequences for onboarding, nurturing, and retention, segment your lists for targeted messaging, and continuously test and optimize to improve performance."
      subServices={[
        { title: "Campaign Design", desc: "Custom email templates and campaign creative that reflect your brand and drive action.", href: "/services/email-marketing/campaign-design" },
        { title: "Email Automation", desc: "Welcome sequences, drip campaigns, abandoned cart flows, and triggered emails.", href: "/services/email-marketing/automation" },
        { title: "List Management", desc: "List segmentation, hygiene, growth strategies, and subscriber lifecycle management.", href: "/services/email-marketing/list-management" },
        { title: "A/B Testing", desc: "Subject lines, content, send times, and CTA testing to continuously improve performance.", href: "/services/email-marketing/ab-testing" },
        { title: "Deliverability", desc: "Inbox placement optimization, domain authentication, and sender reputation management.", href: "/services/email-marketing/deliverability" },
      ]}
      benefits={[
        "High-ROI channel that you own, independent of algorithm changes",
        "Automated sequences that nurture leads while you sleep",
        "Segmented campaigns tailored to subscriber behavior and preferences",
        "Professional email design that renders across all clients and devices",
        "Ongoing optimization through testing and performance analysis",
      ]}
      faq={[
        { q: "Which email platforms do you work with?", a: "We work with Mailchimp, Klaviyo, HubSpot, ActiveCampaign, Brevo, and other major email marketing platforms. We can recommend the best fit for your business." },
        { q: "How do you grow an email list?", a: "We use lead magnets, opt-in forms, landing pages, content upgrades, and strategic CTAs to grow your list with engaged subscribers." },
        { q: "What kind of automated emails do you set up?", a: "We build welcome sequences, abandoned cart recovery, post-purchase follow-ups, re-engagement campaigns, lead nurturing drips, and event-triggered emails." },
        { q: "How do you improve email deliverability?", a: "We set up SPF, DKIM, and DMARC authentication, monitor sender reputation, clean inactive subscribers, and follow best practices for inbox placement." },
        { q: "How often should we send emails?", a: "Frequency depends on your audience and content. Most businesses see good results with 1-4 emails per week, but we test and adjust based on engagement data." },
      ]}
      relatedServices={[
        { title: "Content Marketing", href: "/services/content-marketing" },
        { title: "AI Solutions", href: "/services/ai" },
        { title: "Performance Marketing", href: "/services/performance-marketing" },
      ]}
    />
  );
}
