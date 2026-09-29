import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Event PR | Markit Media",
  description: "PR planning and communications for launches, exhibitions, conferences, openings, corporate events, hospitality experiences, and branded activations before, during, and after the event.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/public-relations/event-pr" },
};

export default function Page() {
  return (
    <SubServicePage
      parentTitle="Public Relations"
      parentHref="/services/public-relations"
      title="Event PR"
      description="PR planning and communications for launches, exhibitions, conferences, openings, corporate events, hospitality experiences, and branded activations before, during, and after the event."
      details={["Event narrative and communication planning around why the event matters, who should care, what is being announced, and what outcomes PR should support.","Pre-event media outreach, invitations, press information, spokesperson preparation, partner coordination, and announcement planning where relevant.","Press kits, fact sheets, event descriptions, speaker information, schedules, imagery, media contacts, and other assets journalists or stakeholders may need.","On-event communication support for media arrivals, interviews, priority guests, announcements, live updates, photography and video coordination, and social amplification.","Post-event follow-up with highlights, imagery, spokesperson comments, outcomes, recap material, media responses, and stories that can continue after the event ends.","Measurement across earned coverage, media attendance, referral activity, stakeholder response, social amplification, content performance, and follow-up opportunities."]}
      benefits={["A clear PR role before the event starts","Better prepared press and stakeholder assets","Coordinated media and spokesperson handling","Content and communication planned around event moments","Post-event momentum instead of communication stopping on the day","Reporting tied to actual event objectives"]}
      faq={[{"q":"When should event PR start?","a":"For meaningful launches, conferences, exhibitions, or openings, planning should begin well before the event so the story, assets, invitations, media list, and spokesperson availability are ready before outreach begins."},{"q":"Can you invite journalists and media?","a":"Yes. We can research relevant contacts, prepare invitations and pitches, coordinate responses, and manage media information. Attendance remains the decision of each invited publication or journalist."},{"q":"Do you support live social content too?","a":"Yes. Event PR can work alongside photography, video, social media, live updates, and post-event content so owned and earned communication support each other."},{"q":"Can you create a press kit for the event?","a":"Yes. Press kits can include event facts, company background, speaker information, schedules, approved quotes, images, contacts, and relevant supporting material."}]}
      relatedServices={[{"title":"Event Photography","href":"/services/photography/event-photography","desc":"Capture the event for PR, social, and future promotion."},{"title":"Social Media Marketing","href":"/services/social-media","desc":"Coordinate owned-channel event coverage."}]}
    />
  );
}
