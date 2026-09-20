import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "SEO Audit Services",
  description:
    "Comprehensive SEO audits covering technical health, content gaps, competitor benchmarking, and on-page optimization. Markit Media delivers actionable audit reports that drive measurable improvements.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/seo/seo-audits",
  },
};

export default function SeoAuditsPage() {
  return (
    <SubServicePage
      parentTitle="SEO"
      parentHref="/services/seo"
      title="SEO Audits"
      description="Understand exactly what is holding your website back in search. Our comprehensive SEO audits examine every factor that influences rankings and deliver a prioritized roadmap of fixes and opportunities."
      details={[
        "Comprehensive technical audits — crawl your entire site to identify indexation issues, broken links, redirect chains, duplicate content, missing tags, and server-side errors that affect search performance.",
        "On-page and content analysis — evaluate title tags, meta descriptions, header structure, keyword usage, content depth, and internal linking across your most important pages.",
        "Content gap analysis — compare your content library against competitor coverage and search demand to identify topics and keywords where you are missing organic traffic opportunities.",
        "Competitor benchmarking — analyze the SEO strategies of your top competitors including their keyword rankings, backlink profiles, content volume, and technical implementation to define realistic performance targets.",
        "Backlink profile review — assess the quality, diversity, and growth trend of your inbound links, flag toxic or spammy links, and identify opportunities to strengthen your link profile.",
        "Prioritized action plan — deliver a clear, categorized report that ranks every finding by impact and effort so your team knows exactly what to fix first for the fastest ranking improvements.",
      ]}
      benefits={[
        "A clear understanding of every technical and content issue affecting your rankings",
        "Prioritized recommendations organized by impact so high-value fixes come first",
        "Competitor intelligence that reveals what top-ranking sites do differently",
        "Identification of content gaps that represent untapped organic traffic",
        "A baseline measurement to track SEO progress over time",
        "Actionable insights that any development or marketing team can implement",
      ]}
      faq={[
        {
          q: "What does an SEO audit include?",
          a: "Our SEO audits cover technical health (crawlability, indexation, speed, mobile), on-page optimization (titles, headers, content quality), off-page factors (backlink profile), content gaps, and competitor analysis. You receive a detailed report with prioritized recommendations.",
        },
        {
          q: "How often should an SEO audit be performed?",
          a: "We recommend a full audit at least once per year, with quarterly check-ins on key technical and performance metrics. Sites that undergo frequent content updates, redesigns, or migrations should be audited more often to catch issues early.",
        },
        {
          q: "What happens after the audit?",
          a: "You receive a detailed report with every finding categorized by priority. We walk your team through the results and can either implement the fixes directly or provide documentation for your internal team to act on.",
        },
        {
          q: "Can an SEO audit help if my traffic has dropped?",
          a: "Yes. An audit is the first step in diagnosing traffic declines. We investigate whether the drop is caused by technical issues, algorithm updates, lost backlinks, content problems, or penalties, and recommend the appropriate recovery strategy.",
        },
      ]}
    />
  );
}
