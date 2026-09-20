import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Community Management Services",
  description:
    "Professional community management including audience engagement, comment moderation, response management, and brand voice consistency. Markit Media keeps your online community active and positive.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/social-media/community-management",
  },
  openGraph: {
    title: "Community Management Services",
    description: "Professional community management including audience engagement, comment moderation, response management, and brand voice consistency. Markit Media keep...",
  },
};

export default function CommunityManagementPage() {
  return (
    <SubServicePage
      parentTitle="Social Media"
      parentHref="/services/social-media"
      title="Community Management"
      description="Social media is a two-way conversation. We manage your online community by responding to comments, engaging with your audience, moderating discussions, and maintaining a consistent brand voice that builds trust and loyalty over time."
      details={[
        "Daily engagement and response management — monitor and respond to comments, direct messages, and mentions across all active platforms to ensure your audience feels heard and valued.",
        "Comment moderation and brand protection — review and moderate user-generated comments to maintain a positive, on-brand community environment while handling negative feedback professionally and promptly.",
        "Proactive community engagement — initiate conversations, engage with relevant accounts in your industry, and participate in trending discussions to increase your brand visibility and build authentic relationships.",
        "Brand voice documentation and training — define clear guidelines for tone, language, and response protocols so every interaction is consistent with your brand identity, whether handled by our team or yours.",
        "Crisis response protocols — establish escalation procedures and pre-approved response frameworks for handling negative situations, PR issues, or viral complaints before they spiral.",
        "Community growth initiatives — develop and manage engagement campaigns, user-generated content programs, and loyalty-building activities that turn followers into advocates for your brand.",
      ]}
      benefits={[
        "Faster response times that improve customer satisfaction and platform visibility",
        "A consistently professional brand voice in every public interaction",
        "Proactive engagement that builds genuine relationships with your audience",
        "Moderation that protects your brand reputation without stifling conversation",
        "Documented escalation procedures that prevent small issues from becoming crises",
        "Increased follower loyalty and organic word-of-mouth advocacy",
      ]}
      faq={[
        {
          q: "What platforms do you manage communities on?",
          a: "We manage communities across all major social platforms including Instagram, Facebook, LinkedIn, X (Twitter), TikTok, and YouTube. We can also manage engagement on review platforms and forums depending on where your audience is most active.",
        },
        {
          q: "How quickly do you respond to comments and messages?",
          a: "Response times depend on the service tier, but most clients work with us on same-day response windows. For brands that need faster coverage, we offer extended-hour and priority response packages.",
        },
        {
          q: "How do you handle negative comments or complaints?",
          a: "We follow a documented escalation framework. Minor issues are addressed promptly with professional, empathetic responses. Serious complaints are escalated to your team with a recommended response. We never delete legitimate criticism — we address it transparently.",
        },
        {
          q: "Will the responses sound like our brand?",
          a: "Yes. Before we begin, we develop a detailed brand voice guide with sample responses for common scenarios. We work closely with your team during onboarding to capture your tone, and every response follows those documented guidelines.",
        },
      ]}
    />
  );
}
