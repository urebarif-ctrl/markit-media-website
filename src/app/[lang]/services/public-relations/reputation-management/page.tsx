import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Reputation Management | Markit Media",
  description: "Reputation monitoring, response planning, review strategy, search visibility, communications, and escalation workflows designed to help brands protect and improve how they are perceived.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/public-relations/reputation-management" },
};

export default function Page() {
  return (
    <SubServicePage
      parentTitle="Public Relations"
      parentHref="/services/public-relations"
      title="Reputation Management"
      description="Reputation monitoring, response planning, review strategy, search visibility, communications, and escalation workflows designed to help brands protect and improve how they are perceived."
      details={["Reputation audit across search results, reviews, social channels, major profiles, media coverage, brand mentions, and recurring customer concerns.","Monitoring framework for reviews, mentions, high-priority queries, media activity, social conversations, and issues that require escalation.","Review and response strategy covering tone, response ownership, service recovery, escalation rules, and how the business requests legitimate customer feedback.","Search and content strategy for branded queries so accurate company information, useful owned content, profiles, and authoritative references are easier to find.","Communication planning for negative feedback, misinformation, customer complaints, operational issues, executive visibility, and sensitive public conversations.","Reporting on reputation themes, sentiment signals, review patterns, search visibility, recurring issues, and recommended operational or communication improvements."]}
      benefits={["Earlier visibility into reputation risks","More consistent customer-response standards","Stronger branded search presence","Better coordination between marketing and operations","Clear escalation paths for sensitive issues","Long-term reputation improvement rather than short-term suppression tactics"]}
      faq={[{"q":"Can you remove negative reviews?","a":"We do not promise removal of legitimate negative feedback. Reviews may be reported when they clearly violate a platform's policies, while legitimate complaints are better handled through response, service recovery, and improving the underlying customer experience."},{"q":"Is reputation management only about reviews?","a":"No. It can include search results, media coverage, social conversations, executive visibility, customer complaints, brand mentions, profile accuracy, and the content people find when researching the company."},{"q":"Can you help with branded search results?","a":"Yes. SEO, owned content, profiles, PR, and accurate entity information can be coordinated to improve the quality and relevance of information available for branded searches."},{"q":"How do you handle a sudden reputation issue?","a":"We first establish facts, severity, audiences, decision owners, and what can be said responsibly. From there we coordinate response messaging, channel priorities, monitoring, and escalation with the client's leadership or legal advisers when appropriate."}]}
      relatedServices={[{"title":"Online Reputation Management","href":"/services/digital-marketing/orm","desc":"Connect reputation work with search and digital presence."},{"title":"SEO Services","href":"/services/seo","desc":"Improve branded search visibility and owned authority."}]}
    />
  );
}
