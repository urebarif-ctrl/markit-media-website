import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Media Buying Services",
  description:
    "Strategic media planning, negotiation, and placement across digital and traditional channels. Markit Media secures the best rates and placements to maximize your advertising investment.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/paid-advertising/media-buying",
  },
  openGraph: {
    title: "Media Buying Services",
    description: "Strategic media planning, negotiation, and placement across digital and traditional channels. Markit Media secures the best rates and placements to maxi...",
  },
};

export default function MediaBuyingPage() {
  return (
    <SubServicePage
      parentTitle="Paid Advertising"
      parentHref="/services/paid-advertising"
      title="Media Buying"
      description="Media buying is the process of planning, negotiating, and purchasing ad placements to reach your target audience at the best possible value. We handle the full cycle — research, rate negotiation, placement, and performance analysis — so your ad spend works harder across every channel."
      details={[
        "Media planning and research — analyze your target audience's media consumption habits, evaluate channel options, and build a media plan that allocates budget across the right mix of platforms and placements.",
        "Rate negotiation and procurement — leverage industry relationships and buying volume to negotiate favorable rates, added-value placements, and bonus inventory with publishers and media vendors.",
        "Cross-channel placement — coordinate ad placements across digital (search, social, display, video) and traditional (print, radio, out-of-home) channels for cohesive campaign coverage.",
        "Insertion order and trafficking management — handle the administrative details of media buying including insertion orders, creative specifications, trafficking deadlines, and publisher communication.",
        "Budget management and pacing — monitor daily and weekly spend pacing to ensure budgets are allocated efficiently, prevent overspending, and shift investment toward high-performing placements.",
        "Post-campaign analysis and reconciliation — verify delivery against contracted terms, reconcile billing discrepancies, and compile performance reports that inform future media buying decisions.",
      ]}
      benefits={[
        "Better rates through professional negotiation and volume leverage",
        "Strategic budget allocation across the channels that matter most",
        "Single point of coordination for multi-channel ad placements",
        "Reduced administrative burden on your internal team",
        "Transparent spend tracking with full billing reconciliation",
        "Data-driven planning that improves efficiency over time",
      ]}
      faq={[
        {
          q: "What is media buying?",
          a: "Media buying is the process of purchasing advertising space and time across media channels. It involves researching audience behavior, selecting the right platforms, negotiating rates, and managing placements to ensure your ads reach the right people at the best value.",
        },
        {
          q: "How is media buying different from media planning?",
          a: "Media planning is the strategy — deciding which channels, audiences, and timing will best achieve your goals. Media buying is the execution — negotiating rates and purchasing the placements that the plan calls for. We handle both as an integrated process.",
        },
        {
          q: "Do you buy traditional media as well as digital?",
          a: "Yes. We plan and buy across both digital and traditional channels including print, radio, and out-of-home when they are relevant to your audience and goals. The media mix is determined by where your target audience spends their time.",
        },
        {
          q: "How do you ensure we get the best rates?",
          a: "We leverage established publisher relationships, aggregate buying volume, negotiate added-value bonuses, and use competitive data to benchmark rates. Every placement is evaluated against performance benchmarks to ensure value.",
        },
      ]}
    />
  );
}
