import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Crisis Communications | Markit Media",
  description: "Crisis communication planning, message development, monitoring, stakeholder coordination, and response support for sensitive situations where speed and accuracy matter.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/public-relations/crisis-communications" },
};

export default function Page() {
  return (
    <SubServicePage
      parentTitle="Public Relations"
      parentHref="/services/public-relations"
      title="Crisis Communications"
      description="Crisis communication planning, message development, monitoring, stakeholder coordination, and response support for sensitive situations where speed and accuracy matter."
      details={["Crisis-readiness planning that identifies likely scenarios, decision owners, approval paths, stakeholder groups, contact information, and communication responsibilities before a problem occurs.","Rapid fact gathering and issue assessment to separate confirmed information from assumptions and determine what audiences need to know now versus later.","Holding statements, FAQs, internal messages, customer updates, media responses, spokesperson talking points, and channel-specific communication prepared for client approval.","Stakeholder mapping across customers, employees, partners, regulators, media, communities, investors, and other groups affected by the situation.","Media and social monitoring to identify misinformation, recurring questions, sentiment changes, emerging coverage, and situations that need escalation.","Post-incident review to document what happened, evaluate the response, update communication protocols, rebuild trust, and reduce the risk of repeating preventable mistakes."]}
      benefits={["Faster response with clearer decision ownership","More consistent messaging across channels","Reduced risk of contradictory public statements","Better separation of facts from speculation","Prepared spokesperson and stakeholder communication","A documented improvement process after the incident"]}
      faq={[{"q":"Can you act as our legal adviser during a crisis?","a":"No. Crisis communications and legal advice are different functions. We coordinate closely with the client's legal, regulatory, security, or executive advisers when the situation requires their approval or expertise."},{"q":"What should a company say immediately during a crisis?","a":"It depends on what is confirmed. A useful early response often acknowledges the situation, states what the company is doing, avoids unsupported claims, and commits to further updates when verified information is available."},{"q":"Do you monitor social media and press during a crisis?","a":"Yes. Monitoring can track coverage, misinformation, recurring questions, stakeholder concerns, and changes in the conversation so communication decisions are based on current information."},{"q":"Can you prepare a crisis plan before anything happens?","a":"Yes. Readiness work can include scenario planning, contact trees, approval flows, draft holding statements, spokesperson roles, stakeholder maps, monitoring plans, and simulation exercises."}]}
      relatedServices={[{"title":"Reputation Management","href":"/services/public-relations/reputation-management","desc":"Support longer-term reputation recovery and monitoring."},{"title":"Public Relations","href":"/services/public-relations","desc":"Coordinate media and stakeholder communications."}]}
    />
  );
}
