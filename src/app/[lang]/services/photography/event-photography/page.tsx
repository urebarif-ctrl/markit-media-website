import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Event Photography",
  description: "Professional photography coverage for conferences, exhibitions, launches, corporate events, hospitality, activations, networking, and branded experiences.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/photography/event-photography" },
};

export default function Page() {
  return (
    <SubServicePage
      platforms={[{"name":"Adobe","note":"Lightroom"},{"name":"Adobe","note":"Photoshop"},{"name":"Google","note":"Drive"},{"name":"Canva"}]}
      parentTitle="Professional Photography"
      parentHref="/services/photography"
      title="Event Photography"
      description="Professional photography coverage for conferences, exhibitions, launches, corporate events, hospitality, activations, networking, and branded experiences."
      details={["Pre-event planning around the agenda, venue, speakers, VIPs, branding moments, sponsor requirements, key guests, and the images the business needs after the event.","Coverage of speakers, panels, audiences, networking, product demonstrations, activations, entertainment, dining, awards, and important candid interactions.","Brand-focused photography that captures signage, staging, sponsor visibility, displays, collateral, products, and environmental details alongside people.","Fast-moving on-site coverage designed to document the event naturally while still securing priority shots requested by the client.","Selection, color correction, cleanup, and organized delivery so marketing and PR teams can quickly find the images they need.","Optional same-day or priority selects for social media, press, stakeholder updates, and post-event communication when planned in advance."]}
      benefits={["A usable visual record of the whole event","Content for PR, social, websites, and future promotions","Sponsor and branding moments documented intentionally","Priority images captured instead of relying on random candids","Organized post-production and delivery","Potential rapid selects for time-sensitive communications"]}
      faq={[{"q":"What types of events do you cover?","a":"We can cover corporate events, conferences, exhibitions, launches, networking events, hospitality experiences, activations, awards, and branded gatherings."},{"q":"Can you provide photos quickly for social media?","a":"Yes. If rapid delivery is part of the scope, we can plan a workflow for priority selects during or shortly after the event."},{"q":"Do you capture sponsors and branding?","a":"Yes. We identify sponsor, signage, staging, product, booth, and brand-visibility requirements before the event so they are deliberately included in the shot plan."},{"q":"Can you provide event video too?","a":"Yes. Photography can be combined with event videography, highlight edits, interviews, reels, or post-event social content."}]}
      relatedServices={[{"title":"Video Production","href":"/services/video-production","desc":"Add highlight films, interviews, and event video."},{"title":"Public Relations","href":"/services/public-relations","desc":"Connect event assets with media and communications."}]}
    />
  );
}
