import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Link Building Services",
  description:
    "Build high-quality backlinks through digital PR, guest posting, outreach, and broken link building. Markit Media earns authoritative links that improve your domain authority and rankings.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/seo/link-building",
  },
  openGraph: {
    title: "Link Building Services",
    description: "Build high-quality backlinks through digital PR, guest posting, outreach, and broken link building. Markit Media earns authoritative links that improve ...",
  },
};

export default function LinkBuildingPage() {
  return (
    <SubServicePage
      parentTitle="SEO"
      parentHref="/services/seo"
      title="Link Building"
      description="Earn the backlinks that move rankings. We use ethical, white-hat link building strategies — digital PR, targeted outreach, and content-led campaigns — to acquire authoritative links that strengthen your domain and improve organic visibility."
      details={[
        "Digital PR campaigns — create newsworthy content, data studies, and expert commentary that earn editorial backlinks from industry publications and news outlets.",
        "Guest posting and contributor outreach — secure placements on relevant, authoritative websites with valuable content that includes contextual links back to your site.",
        "Broken link building — identify broken outbound links on relevant websites and offer your content as a replacement, turning dead links into new backlink opportunities.",
        "Competitor backlink analysis — reverse-engineer the link profiles of your top-ranking competitors to find proven link sources and identify gaps in your own backlink strategy.",
        "Link-worthy content development — produce original research, comprehensive guides, tools, and visual assets designed to attract natural links from other websites.",
        "Outreach and relationship management — build genuine relationships with publishers, bloggers, and industry contacts who can provide ongoing link opportunities.",
      ]}
      benefits={[
        "Higher domain authority from relevant, high-quality backlinks",
        "Improved rankings for competitive keywords that require strong link signals",
        "Referral traffic from links placed on websites your target audience reads",
        "A diversified backlink profile that withstands algorithm updates",
        "Insights into competitor link strategies that reveal untapped opportunities",
        "Sustainable link acquisition through relationship-based outreach",
      ]}
      faq={[
        {
          q: "Why is link building important for SEO?",
          a: "Backlinks remain one of the strongest ranking factors in Google's algorithm. Links from authoritative, relevant websites act as endorsements that signal trust and authority to search engines, directly influencing where your pages rank in search results.",
        },
        {
          q: "What makes a backlink high quality?",
          a: "A high-quality backlink comes from a relevant, authoritative website, is placed within editorial content, uses natural anchor text, and sends referral traffic. Domain authority, topical relevance, and the linking page's own link profile all contribute to link quality.",
        },
        {
          q: "Do you use any black-hat link building tactics?",
          a: "No. We strictly follow white-hat practices. We do not buy links, use private blog networks, or engage in link schemes. Every link we acquire is earned through genuine outreach, quality content, and real editorial decisions.",
        },
        {
          q: "How many backlinks does my site need?",
          a: "The number of links needed depends on your industry, competition level, and current domain authority. We analyze your top competitors to set realistic link acquisition targets and focus on quality over quantity — a few strong links often outweigh dozens of weak ones.",
        },
      ]}
    />
  );
}
