import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Keyword Research Services",
  description:
    "Data-driven keyword research including search intent analysis, long-tail keyword discovery, competitor keyword gaps, and strategic keyword mapping. Markit Media builds keyword strategies that drive qualified traffic.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/seo/keyword-research",
  },
  openGraph: {
    title: "Keyword Research Services",
    description: "Data-driven keyword research including search intent analysis, long-tail keyword discovery, competitor keyword gaps, and strategic keyword mapping. Mark...",
  },
};

export default function KeywordResearchPage() {
  return (
    <SubServicePage
      parentTitle="SEO"
      parentHref="/services/seo"
      title="Keyword Research"
      description="Target the right keywords to attract the right audience. We analyze search intent, competition, and business value to build a keyword strategy that prioritizes the terms most likely to drive qualified traffic and conversions."
      details={[
        "Search intent analysis — classify every target keyword by intent type (informational, navigational, commercial, transactional) to ensure your content format and depth match what search engines expect to rank.",
        "Long-tail keyword discovery — identify lower-competition, high-conversion keyword variations that capture specific search queries and drive qualified visitors who are closer to making a decision.",
        "Competitor keyword gap analysis — compare your keyword visibility against top competitors to find valuable terms they rank for that you are missing, revealing immediate growth opportunities.",
        "Keyword mapping — assign target keywords to specific pages on your site, ensuring every important page has a clear primary keyword and supporting terms without overlap or cannibalization.",
        "Search volume and difficulty assessment — evaluate the realistic ranking potential of each keyword by analyzing monthly search volume, competition strength, and your site's current authority in that topic area.",
        "Keyword strategy documentation — deliver a structured keyword plan organized by topic, priority, and target page that serves as the foundation for content creation, on-page optimization, and performance tracking.",
      ]}
      benefits={[
        "A data-backed keyword strategy aligned with your business goals and audience",
        "Identification of high-value, low-competition keywords for faster ranking wins",
        "Clear keyword-to-page mapping that eliminates internal competition",
        "Deeper understanding of how your audience searches for your products or services",
        "Competitive intelligence that reveals gaps and opportunities in your market",
        "A reusable keyword framework that guides content planning for months ahead",
      ]}
      faq={[
        {
          q: "What is keyword research and why is it important?",
          a: "Keyword research is the process of identifying the search terms your target audience uses to find products, services, or information related to your business. It is the foundation of every SEO and content strategy because it ensures you create content that matches actual search demand.",
        },
        {
          q: "How do you choose which keywords to target?",
          a: "We evaluate keywords based on search volume, competition difficulty, search intent, and business relevance. The goal is to find terms where you can realistically rank and that will drive traffic with commercial or conversion value, not just volume.",
        },
        {
          q: "What is the difference between short-tail and long-tail keywords?",
          a: "Short-tail keywords are broad, high-volume terms (e.g., 'digital marketing') with intense competition. Long-tail keywords are more specific phrases (e.g., 'digital marketing agency for ecommerce') with lower volume but higher conversion rates because they reflect clearer intent.",
        },
        {
          q: "How often should keyword research be updated?",
          a: "We recommend refreshing your keyword strategy every six to twelve months. Search behavior evolves, new competitors enter the market, and algorithm updates can shift keyword difficulty. Regular updates keep your content targeting current and competitive.",
        },
      ]}
    />
  );
}
