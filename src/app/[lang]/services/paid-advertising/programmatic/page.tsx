import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Programmatic Advertising Services",
  description:
    "Automated media buying across display, video, and connected TV. Markit Media manages programmatic campaigns with real-time bidding, audience targeting, and transparent reporting.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/paid-advertising/programmatic",
  },
};

export default function ProgrammaticPage() {
  return (
    <SubServicePage
      parentTitle="Paid Advertising"
      parentHref="/services/paid-advertising"
      title="Programmatic Advertising"
      description="Programmatic advertising uses automated technology to buy ad placements in real time, reaching specific audiences across thousands of websites, apps, and streaming platforms. We manage the strategy, execution, and optimization so you get precise targeting at scale without the manual overhead."
      details={[
        "Demand-side platform management — set up and manage campaigns across DSPs, configuring targeting parameters, bid strategies, frequency caps, and budget allocation for optimal delivery.",
        "Audience targeting and segmentation — build audience segments using first-party data, contextual signals, behavioral data, and lookalike modeling to reach the right people at the right moment.",
        "Display and video campaign execution — launch banner, rich media, and video ads across premium publisher inventory with creative rotation, A/B testing, and viewability optimization.",
        "Connected TV (CTV) advertising — extend your reach to streaming audiences on platforms like Roku, Fire TV, and smart TVs with non-skippable, high-attention placements.",
        "Brand safety and fraud prevention — implement pre-bid filtering, domain allowlists, and verification tools to ensure ads appear in safe environments and reach real users.",
        "Transparent reporting and optimization — provide full visibility into impression data, CPM trends, audience performance, and conversion attribution with ongoing bid and targeting adjustments.",
      ]}
      benefits={[
        "Precise audience targeting across thousands of publishers and platforms",
        "Real-time bidding that optimizes spend toward the best-performing placements",
        "Access to premium display, video, and CTV inventory at scale",
        "Brand safety controls that protect your reputation",
        "Reduced manual effort through automated buying and optimization",
        "Transparent reporting with full visibility into where your ads appear",
      ]}
      faq={[
        {
          q: "What is programmatic advertising?",
          a: "Programmatic advertising is the automated buying and selling of digital ad space using software and algorithms. Instead of negotiating placements manually, bids are placed in real time based on audience data, allowing for more efficient and targeted campaigns.",
        },
        {
          q: "How is programmatic different from direct ad buys?",
          a: "Direct buys involve negotiating fixed placements with specific publishers. Programmatic uses automated auctions to bid on impressions across many publishers simultaneously, enabling better targeting and more efficient spending at scale.",
        },
        {
          q: "What budget is needed for programmatic campaigns?",
          a: "Programmatic can work at various budget levels, but campaigns typically need sufficient scale to allow the algorithms to optimize effectively. We recommend minimum monthly budgets based on your goals and target audience size during the planning phase.",
        },
        {
          q: "How do you ensure ads appear in brand-safe environments?",
          a: "We use a combination of pre-bid brand safety filters, domain allowlists and blocklists, third-party verification tools, and contextual targeting to control where ads appear and prevent placement alongside inappropriate content.",
        },
      ]}
    />
  );
}
