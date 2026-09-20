import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Email Deliverability Services",
  description:
    "Email deliverability services including inbox placement optimization, authentication setup, sender reputation management, and spam compliance. Markit Media ensures your emails reach the inbox.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/email-marketing/deliverability",
  },
  openGraph: {
    title: "Email Deliverability Services",
    description: "Email deliverability services including inbox placement optimization, authentication setup, sender reputation management, and spam compliance. Markit Me...",
  },
};

export default function DeliverabilityPage() {
  return (
    <SubServicePage
      parentTitle="Email Marketing"
      parentHref="/services/email-marketing"
      title="Email Deliverability"
      description="Your emails cannot drive results if they never reach the inbox. We optimize your email infrastructure, authentication records, and sending practices to maximize inbox placement, protect your sender reputation, and keep your messages out of spam folders."
      details={[
        "Email authentication setup — configure SPF, DKIM, and DMARC records for your sending domains to verify your identity with email providers and prevent spoofing that damages your reputation.",
        "Inbox placement analysis — test where your emails actually land across major providers including Gmail, Outlook, and Yahoo, identifying whether messages hit the inbox, promotions tab, or spam folder.",
        "Sender reputation monitoring — track your domain and IP reputation scores over time, identifying issues like blocklist appearances, complaint spikes, or bounce rate increases before they cause widespread delivery problems.",
        "Sending infrastructure review — evaluate your email platform configuration, dedicated vs shared IP setup, sending volume patterns, and warm-up schedules to ensure your technical foundation supports reliable delivery.",
        "Spam trigger audit — review your email content, subject lines, HTML code, and link practices to identify elements that commonly trigger spam filters, then provide specific changes to reduce the risk.",
        "Deliverability recovery — diagnose and resolve existing deliverability problems including blocklist removal, reputation repair, and re-engagement strategies for lists that have experienced high bounce or complaint rates.",
      ]}
      benefits={[
        "More of your emails reaching the primary inbox instead of spam",
        "Properly configured authentication that protects your domain from spoofing",
        "Early detection of reputation issues before they impact campaign performance",
        "Higher effective reach from every campaign you send",
        "Reduced risk of being blocklisted by major email providers",
        "A strong technical foundation that supports long-term email marketing growth",
      ]}
      faq={[
        {
          q: "What is email deliverability and why does it matter?",
          a: "Email deliverability is the ability to get your emails into subscribers' inboxes rather than spam or junk folders. It matters because even the best email content is worthless if recipients never see it. Poor deliverability directly reduces the return on your entire email marketing investment.",
        },
        {
          q: "What are SPF, DKIM, and DMARC?",
          a: "These are email authentication protocols. SPF verifies which servers are allowed to send email on behalf of your domain. DKIM adds a digital signature to prove the email was not altered in transit. DMARC ties SPF and DKIM together with a policy that tells receiving servers how to handle unauthenticated messages.",
        },
        {
          q: "How do I know if my emails are going to spam?",
          a: "We run inbox placement tests that send your emails to seed accounts across major providers and report exactly where each message lands. We also monitor bounce rates, complaint rates, and engagement metrics that indicate deliverability problems.",
        },
        {
          q: "Can you fix deliverability issues if my domain is already blocklisted?",
          a: "Yes. We identify which blocklists your domain or IP appears on, determine the root cause, submit removal requests, and implement the changes needed to prevent re-listing. Recovery timelines vary depending on the severity of the issue.",
        },
      ]}
    />
  );
}
