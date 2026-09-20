import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Whitepapers & Reports",
  description:
    "Professional whitepapers, research reports, and lead magnets that demonstrate expertise and generate qualified leads. Markit Media handles research, writing, and design for gated content assets.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/content-marketing/whitepapers",
  },
};

export default function WhitepapersPage() {
  return (
    <SubServicePage
      parentTitle="Content Marketing"
      parentHref="/services/content-marketing"
      title="Whitepapers & Reports"
      description="Whitepapers and research reports give prospects a reason to share their contact information and give your sales team credibility in complex deals. We research, write, and format long-form content assets designed to generate leads and establish authority in your market."
      details={[
        "Research and data gathering — compile primary and secondary research, interview subject-matter experts, and synthesize industry data into clear, well-sourced narratives that support your key arguments.",
        "Whitepaper writing — produce in-depth documents that explore a problem, present your perspective, and guide readers toward a solution, structured for both sequential reading and quick scanning.",
        "Industry reports and benchmarks — develop original research reports with data visualizations, key findings, and actionable takeaways that position your brand as a go-to resource in your space.",
        "Lead magnet development — create ebooks, guides, checklists, and toolkits designed for gated distribution, with clear value propositions that justify the email exchange.",
        "Design and layout coordination — work with designers to produce polished, branded documents with professional typography, charts, and layouts that reflect the quality of the content.",
        "Landing page and promotion strategy — recommend distribution approaches including dedicated landing pages, email sequences, and paid promotion to maximize downloads and lead capture.",
      ]}
      benefits={[
        "High-value lead magnets that generate qualified contacts",
        "Demonstrated expertise that builds trust with decision-makers",
        "Sales enablement assets that support complex buying cycles",
        "Original research that earns backlinks and media coverage",
        "Professional presentation that reflects brand credibility",
        "Evergreen assets that continue generating leads over time",
      ]}
      faq={[
        {
          q: "What's the difference between a whitepaper and an ebook?",
          a: "Whitepapers tend to be more formal and data-driven, often exploring a specific problem in depth. Ebooks are typically lighter in tone and broader in scope, designed for easier consumption. Both work well as gated lead magnets.",
        },
        {
          q: "How long does it take to produce a whitepaper?",
          a: "A typical whitepaper takes four to eight weeks from kickoff to final delivery. This includes research, expert interviews, drafting, revisions, and design. Timelines vary based on the depth of research and review cycles involved.",
        },
        {
          q: "Do you handle the design as well?",
          a: "Yes. We coordinate with designers to produce a fully formatted, branded document. You receive a publish-ready PDF along with the source files for future updates.",
        },
        {
          q: "How do we use a whitepaper for lead generation?",
          a: "Whitepapers are typically offered as gated content behind a form on a dedicated landing page. We can help you build the landing page, write the promotional email sequences, and plan paid distribution to drive downloads.",
        },
      ]}
    />
  );
}
