import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Content SEO Services",
  description:
    "Keyword-optimized content creation, on-page optimization, content audits, and topic cluster strategies. Markit Media aligns your content with search intent to drive organic traffic.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/seo/content-seo",
  },
};

export default function ContentSeoPage() {
  return (
    <SubServicePage
      parentTitle="SEO"
      parentHref="/services/seo"
      title="Content SEO"
      description="Create content that ranks, engages, and converts. We combine keyword research with search intent analysis to produce and optimize content that earns organic traffic and answers the questions your audience is asking."
      details={[
        "Keyword-optimized content creation — research high-value keywords and produce articles, landing pages, and guides that are structured to rank for target search queries while providing genuine value to readers.",
        "On-page optimization — optimize title tags, meta descriptions, header hierarchy, internal links, image alt text, and content structure to maximize each page's ranking potential.",
        "Content audits — evaluate your existing content library to identify underperforming pages, thin content, keyword cannibalization, and opportunities to consolidate or refresh outdated material.",
        "Topic cluster strategy — organize content into pillar pages and supporting cluster articles connected by internal links to establish topical authority and improve rankings across entire subject areas.",
        "Search intent alignment — analyze whether each target keyword requires informational, navigational, commercial, or transactional content and match the format and depth to what search engines reward.",
      ]}
      benefits={[
        "Content that targets the right keywords and matches actual search intent",
        "Improved rankings for existing pages through strategic optimization and refreshes",
        "Topical authority that strengthens your entire domain's search performance",
        "Reduced keyword cannibalization so pages do not compete against each other",
        "A documented content roadmap that aligns SEO goals with business objectives",
        "Higher engagement metrics as content better answers user questions",
      ]}
      faq={[
        {
          q: "What is content SEO?",
          a: "Content SEO is the practice of creating and optimizing website content to rank in search engines. It involves keyword research, on-page optimization, content structure, and aligning what you publish with the search intent behind target queries.",
        },
        {
          q: "How often should existing content be updated?",
          a: "We recommend reviewing and refreshing key content at least every six to twelve months. Pages that have dropped in rankings or contain outdated information should be prioritized. Regular updates signal freshness to search engines and keep your content accurate.",
        },
        {
          q: "What is a topic cluster and how does it help SEO?",
          a: "A topic cluster is a content architecture where a comprehensive pillar page links to several related supporting articles. This internal linking structure helps search engines understand your depth of coverage on a subject and can improve rankings for the entire cluster.",
        },
        {
          q: "Do you write the content or optimize what we already have?",
          a: "Both. We audit and optimize your existing content and produce new keyword-targeted pieces to fill content gaps. The approach depends on the current state of your content library and the opportunities identified during our keyword research.",
        },
      ]}
    />
  );
}
