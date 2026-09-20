import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Copywriting Services",
  description:
    "Professional copywriting for websites, landing pages, ad campaigns, and brand messaging. Markit Media writes conversion-focused copy that speaks your audience's language and drives action.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/content-marketing/copywriting",
  },
};

export default function CopywritingPage() {
  return (
    <SubServicePage
      parentTitle="Content Marketing"
      parentHref="/services/content-marketing"
      title="Copywriting"
      description="Good copy removes friction between your offer and the reader's next action. We write website pages, landing pages, ad copy, and brand messaging grounded in audience research — clear, specific, and built to convert without relying on hype."
      details={[
        "Website copywriting — write or rewrite homepage, about, service, and product pages with clear value propositions, structured messaging hierarchies, and calls to action that guide visitors toward conversion.",
        "Landing page copy — craft dedicated landing pages for campaigns, product launches, and lead generation with headline formulas, benefit-driven body copy, and persuasion architecture tested for performance.",
        "Ad copywriting — develop headlines, descriptions, and creative variations for search, social, and display campaigns with tight character counts and strong hooks tailored to each platform's format.",
        "Brand messaging and voice — define your core messaging framework: positioning statement, tagline, value propositions, and tone-of-voice guidelines that keep every touchpoint consistent.",
        "Email and sales copy — write email sequences, nurture campaigns, and sales enablement materials that move prospects through the funnel with relevant, timely messaging.",
        "Copy audits and optimization — review existing copy for clarity, persuasion gaps, and conversion barriers, then provide prioritized rewrites with reasoning for each change.",
      ]}
      benefits={[
        "Conversion-focused messaging backed by audience research",
        "Consistent brand voice across every customer touchpoint",
        "Faster campaign launches with ready-to-publish copy",
        "Clearer value propositions that differentiate you from competitors",
        "Reduced bounce rates through engaging, well-structured page copy",
        "Scalable messaging framework your team can build on",
      ]}
      faq={[
        {
          q: "What's the difference between copywriting and content writing?",
          a: "Copywriting is focused on persuasion and driving a specific action — a purchase, a sign-up, a click. Content writing educates or informs to build trust over time. Most marketing strategies need both.",
        },
        {
          q: "How do you learn our brand voice?",
          a: "We start with a discovery session covering your brand values, audience, competitors, and existing materials. From there we develop or refine a voice and tone guide that informs every piece of copy we write.",
        },
        {
          q: "Do you write copy for specific industries?",
          a: "We work across industries including SaaS, ecommerce, professional services, and B2B. For technical or regulated industries, we collaborate closely with your subject-matter experts to ensure accuracy.",
        },
        {
          q: "How many revisions are included?",
          a: "Every project includes two rounds of revisions. We also provide a detailed brief and outline for approval before writing begins, which significantly reduces the need for major changes.",
        },
      ]}
    />
  );
}
