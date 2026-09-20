import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Marketing Strategy Services",
  description:
    "Comprehensive marketing strategy covering channel selection, budget allocation, KPIs, and execution roadmaps. Markit Media builds data-informed plans that connect marketing activity to business growth.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/digital-marketing/marketing-strategy",
  },
};

export default function MarketingStrategyPage() {
  return (
    <SubServicePage
      parentTitle="Digital Marketing"
      parentHref="/services/digital-marketing"
      title="Marketing Strategy"
      description="A marketing strategy answers the fundamental questions: who are we trying to reach, through which channels, with what message, and how will we measure success? We develop comprehensive, data-informed marketing plans that give your team a clear roadmap from objectives through execution."
      details={[
        "Market and competitive analysis — research your competitive landscape, target market dynamics, audience segments, and industry trends to build a strategy grounded in reality rather than assumptions.",
        "Channel strategy and prioritization — evaluate available marketing channels against your goals, budget, and audience behavior to determine where investment will have the highest return.",
        "Budget allocation and forecasting — develop a marketing budget framework that distributes spend across channels based on expected performance, with scenarios for different investment levels.",
        "KPI framework and measurement plan — define the key performance indicators that connect marketing activities to business outcomes, and establish the tracking infrastructure needed to measure them accurately.",
        "Messaging and positioning strategy — craft core messaging that differentiates your brand, resonates with your target audience, and provides a consistent foundation for all marketing communications.",
        "Execution roadmap and prioritization — translate strategy into a phased action plan with clear timelines, owners, dependencies, and milestones so your team knows exactly what to do and when.",
        "Quarterly review and adjustment process — establish a cadence for reviewing performance data, testing new approaches, and adjusting the strategy based on what the results show.",
      ]}
      benefits={[
        "Clear direction that aligns your entire marketing team",
        "Budget allocation backed by competitive data and channel analysis",
        "Defined KPIs that connect marketing activity to business outcomes",
        "Prioritized execution roadmap that prevents scattered efforts",
        "Consistent messaging framework across all channels and campaigns",
        "Built-in review process that keeps the strategy current",
      ]}
      faq={[
        {
          q: "What does a marketing strategy include?",
          a: "A complete marketing strategy covers market analysis, audience definition, competitive positioning, channel selection, budget allocation, messaging framework, KPIs, and a phased execution roadmap. It serves as the blueprint that guides all marketing decisions and activities.",
        },
        {
          q: "How is a marketing strategy different from a marketing plan?",
          a: "A strategy defines the direction — who to target, how to position, which channels to prioritize. A plan is the tactical execution — specific campaigns, content calendars, ad budgets, and timelines. We deliver both as an integrated package.",
        },
        {
          q: "How often should a marketing strategy be updated?",
          a: "The core strategy should be reviewed quarterly and updated annually. However, tactical adjustments based on performance data should happen continuously. We build in a quarterly review cadence to keep the strategy responsive to results and market changes.",
        },
        {
          q: "Do you also execute the strategy or just create it?",
          a: "We do both. Some clients engage us to build the strategy and hand it off to their internal team. Others have us manage execution as well. We also offer a hybrid model where we lead strategy and oversee execution while your team handles day-to-day implementation.",
        },
      ]}
    />
  );
}
