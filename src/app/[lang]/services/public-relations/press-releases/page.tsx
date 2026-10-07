import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Press Release Writing & Distribution",
  description: "Press release strategy, writing, editing, media assets, and distribution support for announcements that have a clear news angle and need professional presentation.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/public-relations/press-releases" },
};

export default function Page() {
  return (
    <SubServicePage
      parentTitle="Public Relations"
      parentHref="/services/public-relations"
      title="Press Release Writing & Distribution"
      description="Press release strategy, writing, editing, media assets, and distribution support for announcements that have a clear news angle and need professional presentation."
      details={["News-angle assessment before writing so announcements are framed around what matters to readers, media, customers, stakeholders, or the market.","Press release writing with a clear headline, lead, supporting facts, quotes, context, company information, and a structure that makes the announcement easy to understand.","Editing and fact-check coordination with the client to verify names, dates, claims, product information, event details, statistics, and approved spokesperson quotes.","Supporting press assets such as company descriptions, spokesperson information, image links, media contacts, background notes, and campaign landing pages where needed.","Distribution planning based on the objective, including direct media outreach, owned channels, relevant distribution services, stakeholder communication, and website publication.","Post-release follow-up and measurement focused on pickup, referral traffic, enquiries, media responses, branded search, and the next communication opportunity."]}
      benefits={["Professional announcement structure and messaging","Clearer facts and approved spokesperson quotes","Press assets organized before distribution","A distribution plan matched to the announcement","Better connection between PR and owned channels","Measurement beyond simply counting syndicated copies"]}
      faq={[{"q":"When is a press release worth publishing?","a":"A press release is most useful when there is a real announcement such as a launch, expansion, appointment, event, partnership, research finding, milestone, acquisition, or other development that matters to an external audience."},{"q":"Do you distribute press releases?","a":"Yes. Distribution can include direct media outreach, publication on owned channels, relevant release-distribution services, and stakeholder communication depending on the goal."},{"q":"Can you write quotes for executives?","a":"We can draft spokesperson quotes for review and approval, but they should reflect what the named person genuinely believes and is prepared to stand behind publicly."},{"q":"Does a press release guarantee press coverage?","a":"No. Distribution and editorial coverage are different. A release can support outreach and provide a reliable source of facts, but independent publications make their own editorial decisions."}]}
      relatedServices={[{"title":"Media Outreach","href":"/services/public-relations/media-outreach","desc":"Pitch the announcement to relevant journalists."},{"title":"Copywriting","href":"/services/content-marketing/copywriting","desc":"Extend the message across owned channels."}]}
    />
  );
}
