import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Media Outreach | Markit Media",
  description: "Targeted media outreach and journalist pitching built around credible stories, relevant publications, timely angles, and useful relationships rather than mass-emailing generic press lists.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/public-relations/media-outreach" },
};

export default function Page() {
  return (
    <SubServicePage
      parentTitle="Public Relations"
      parentHref="/services/public-relations"
      title="Media Outreach"
      description="Targeted media outreach and journalist pitching built around credible stories, relevant publications, timely angles, and useful relationships rather than mass-emailing generic press lists."
      details={["Story and angle development to identify what is genuinely newsworthy, useful, timely, data-led, expert-driven, or relevant to the publications you want to reach.","Media-list research based on beat, publication, geography, audience, recent coverage, and whether the journalist or editor actually writes about the topic.","Pitch writing tailored to the story and recipient instead of sending the same generic release to hundreds of unrelated contacts.","Founder, executive, product, campaign, event, research, and expert-commentary outreach where the brand has a credible reason to contribute.","Follow-up management, response coordination, interview preparation, asset sharing, and communication between the client and interested media contacts.","Coverage tracking and reporting that documents outreach, responses, placements where achieved, live links, and useful next opportunities without promising guaranteed editorial coverage."]}
      benefits={["More relevant media targeting","Clearer story positioning before outreach begins","Better use of founder and expert knowledge","Organized response and interview coordination","Reusable relationships and media intelligence","Transparent reporting without fake coverage guarantees"]}
      faq={[{"q":"Can you guarantee media coverage?","a":"No credible PR team can guarantee independent editorial coverage. We can improve the quality of the story, targeting, pitch, assets, and follow-up, but editors and journalists decide what they publish."},{"q":"Do you build media lists?","a":"Yes. Outreach lists are researched around the industry, story, audience, geography, and journalist beat rather than purchased as a generic database dump."},{"q":"Can you pitch founders or executives as experts?","a":"Yes. We can develop expert-commentary angles, founder profiles, thought-leadership opportunities, interviews, and timely responses where the spokesperson has relevant expertise."},{"q":"Do you handle follow-up with journalists?","a":"Yes. Follow-up, response coordination, asset delivery, and interview scheduling can all be managed within the agreed campaign."}]}
      relatedServices={[{"title":"Content Marketing","href":"/services/content-marketing","desc":"Build supporting thought leadership and owned content."},{"title":"Personal Branding","href":"/industries/personal-branding","desc":"Strengthen founder and executive visibility."}]}
    />
  );
}
