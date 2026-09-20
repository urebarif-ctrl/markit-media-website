import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "SEO Content Services",
  description:
    "Keyword-targeted content and topic cluster strategies that improve organic rankings. Markit Media creates SEO content built on search intent, competitive analysis, and structured content architecture.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/content-marketing/seo-content",
  },
};

export default function SeoContentPage() {
  return (
    <SubServicePage
      parentTitle="Content Marketing"
      parentHref="/services/content-marketing"
      title="SEO Content"
      description="SEO content bridges what your audience is searching for and what your business offers. We build keyword-targeted content programs around topic clusters and search intent, creating pages that rank, attract qualified traffic, and support your broader organic growth strategy."
      details={[
        "Keyword research and intent mapping — identify target keywords grouped by search intent (informational, commercial, transactional) and map them to content types and funnel stages for maximum coverage.",
        "Topic cluster architecture — design pillar pages and supporting cluster content that establishes topical authority, strengthens internal linking, and signals depth to search engines.",
        "Content creation for search — write articles, guides, and landing pages optimized for target keywords with proper heading hierarchy, semantic coverage, and natural keyword placement.",
        "Competitor content gap analysis — analyze what your competitors rank for that you don't, and build a prioritized content plan to capture those opportunities based on business value and ranking difficulty.",
        "Content refresh and optimization — audit existing pages for ranking potential, update outdated information, improve on-page SEO elements, and consolidate thin content to recapture lost traffic.",
        "Performance tracking and iteration — monitor rankings, traffic, and conversions for each piece of content, then adjust the strategy based on what's working and where new opportunities emerge.",
      ]}
      benefits={[
        "Content built around proven search demand, not guesswork",
        "Topic cluster structure that builds topical authority over time",
        "Higher rankings through intent-matched, well-optimized content",
        "Captured competitive gaps that your rivals are currently winning",
        "Existing content refreshed to recover or improve organic performance",
        "Clear connection between content investment and organic traffic growth",
      ]}
      faq={[
        {
          q: "What is SEO content and how is it different from regular content?",
          a: "SEO content is created specifically to rank in search engines for target keywords. It's built on keyword research, search intent analysis, and on-page optimization — whereas regular content may not consider search visibility as a primary goal.",
        },
        {
          q: "What are topic clusters and why do they matter?",
          a: "A topic cluster is a group of related content pieces linked to a central pillar page. This structure signals to search engines that your site has comprehensive coverage of a topic, which can improve rankings across the entire cluster.",
        },
        {
          q: "How long does it take for SEO content to start ranking?",
          a: "New content typically takes three to six months to reach its ranking potential, depending on domain authority, keyword difficulty, and competition. Content refreshes on existing pages can show results faster, sometimes within weeks.",
        },
        {
          q: "Do you only write blog posts for SEO?",
          a: "No. SEO content includes service pages, resource hubs, pillar pages, comparison articles, glossaries, and FAQ sections. The format depends on the search intent behind the target keyword.",
        },
      ]}
    />
  );
}
