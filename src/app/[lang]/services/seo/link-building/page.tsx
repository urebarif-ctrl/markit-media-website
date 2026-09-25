import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Link Building Services | Digital PR & Outreach",
  description: "Earn relevant backlinks through digital PR, guest contributor outreach, publisher relationships, broken-link campaigns and link-worthy content.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/seo/link-building" },
  openGraph: {
    title: "Link Building Services | Digital PR & Outreach",
    description: "Earn relevant editorial links through digital PR, contributor outreach, publisher relationships and content-led campaigns.",
  },
};

export default function LinkBuildingPage() {
  return (
    <SubServicePage
      parentTitle="SEO"
      parentHref="/services/seo"
      title="Link Building"
      description="Build authority through relevant editorial outreach. We combine digital PR, guest contributor outreach, publisher relationships, competitor research and link-worthy content to earn credible mentions and referral opportunities."
      details={[
        "Digital PR campaigns — create useful research, expert commentary and stories that give journalists and publishers a genuine reason to reference your brand.",
        "Guest contributor outreach — pitch useful, original articles to relevant publications. Placements depend on each publisher's editorial approval and linking policy.",
        "Publisher outreach — qualify websites by topical relevance, audience, organic visibility, content quality and editorial standards rather than relying on a single authority score.",
        "Broken link building — identify relevant broken references and suggest genuinely useful replacement resources when your content is a fit.",
        "Competitor backlink analysis — study competing link profiles to find relevant publications, resource pages and content opportunities.",
        "Link-worthy content development — create research, guides, tools and visual assets designed to earn citations naturally.",
        "Outreach and relationship management — build durable relationships with editors, bloggers and industry publishers instead of one-off spam campaigns.",
      ]}
      benefits={[
        "A stronger, more relevant backlink profile built around real publications",
        "Editorial visibility around commercially important topics",
        "Referral traffic from websites your target audience already reads",
        "A diversified authority strategy that does not depend on one tactic",
        "Competitive backlink intelligence and new publisher opportunities",
        "Clear reporting on outreach, placements, destination URLs and status",
      ]}
      faq={[
        {
          q: "Can you guarantee rankings or a specific number of dofollow links?",
          a: "No. Rankings and independent editorial decisions cannot be guaranteed. We set campaign targets, qualify opportunities carefully and report transparently on outreach and confirmed placements.",
        },
        {
          q: "What makes a backlink worth pursuing?",
          a: "We look at topical relevance, real audience and organic visibility, editorial quality, placement context, outbound-link behavior and potential referral value. Third-party authority metrics are useful diagnostics, not guarantees.",
        },
        {
          q: "Do you use private blog networks or automated link spam?",
          a: "No. We do not use private blog networks, automated link spam or disguised paid ranking endorsements. Sponsored placements, where used, must be transparent and appropriately qualified by the publisher.",
        },
        {
          q: "Do you offer guest posting?",
          a: "Yes. We offer contributor outreach as part of broader authority campaigns. We develop useful content, pitch relevant publications and respect each publisher's editorial and link policies.",
        },
      ]}
    />
  );
}
