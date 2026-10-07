import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Corporate Photography",
  description: "Professional corporate photography for teams, leadership, offices, employer branding, PR, websites, LinkedIn, events, and company communications.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/photography/corporate-photography" },
};

export default function Page() {
  return (
    <SubServicePage
      platforms={[{"name":"Adobe","note":"Lightroom"},{"name":"Adobe","note":"Photoshop"},{"name":"Google","note":"Drive"},{"name":"Canva"}]}
      parentTitle="Professional Photography"
      parentHref="/services/photography"
      title="Corporate Photography"
      description="Professional corporate photography for teams, leadership, offices, employer branding, PR, websites, LinkedIn, events, and company communications."
      details={["Corporate photography planning based on where the images will appear, including websites, profiles, proposals, press material, recruitment, social media, and internal communications.","Leadership and executive portraits designed to feel professional, consistent, and aligned with the company rather than like unrelated personal headshots.","Team photography for departments, leadership groups, working sessions, culture content, and employer-brand storytelling.","Office and workplace photography that documents spaces, operations, people at work, equipment, and the environment behind the business.","On-location direction for posing, framing, backgrounds, lighting, wardrobe guidance, shot sequencing, and efficient use of staff time.","Retouching and delivery in useful crops and sizes for websites, LinkedIn, presentations, PR, social media, and print."]}
      benefits={["A consistent visual identity for people across the company","Professional leadership and team imagery","Reusable assets for recruitment, PR, sales, and web","Better trust than generic stock photography","Efficient on-location production around working teams","Channel-ready crops and finished images"]}
      faq={[{"q":"Can you photograph an entire team in one session?","a":"Yes. We can build an efficient schedule for individual portraits, leadership images, team groups, office scenes, and working-content shots during the same production."},{"q":"Do you provide direction for people who are not comfortable on camera?","a":"Yes. We guide positioning, posture, expression, framing, and the pace of the session so subjects do not need professional modeling experience."},{"q":"Can we use the images on LinkedIn and our website?","a":"Yes. Deliverables can be prepared for website team pages, LinkedIn profiles, company social channels, press kits, presentations, and other agreed uses."},{"q":"Do you also cover corporate video?","a":"Yes. Photography can be planned alongside interviews, corporate video, event coverage, testimonials, or social content production."}]}
      relatedServices={[{"title":"Branding & Design","href":"/services/branding","desc":"Align company imagery with a wider visual identity."},{"title":"Video Production","href":"/services/video-production","desc":"Add interviews, corporate films, and social video."}]}
    />
  );
}
