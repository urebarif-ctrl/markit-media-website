import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "AI Consulting Services",
  description:
    "AI consulting services including strategy development, readiness assessment, tool selection, and implementation roadmaps. Markit Media helps businesses adopt AI with a clear plan and realistic expectations.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/ai/consulting",
  },
};

export default function AiConsultingPage() {
  return (
    <SubServicePage
      parentTitle="AI Solutions"
      parentHref="/services/ai"
      title="AI Consulting"
      description="Get a clear, actionable plan for adopting AI in your business. We assess your current operations, identify where AI can make a real impact, and build a step-by-step implementation roadmap that aligns with your goals, budget, and team capabilities."
      details={[
        "AI readiness assessment — evaluate your current data infrastructure, team skills, and business processes to determine where you stand and what needs to be in place before AI can deliver value.",
        "Opportunity identification — analyze your operations, marketing, sales, and support workflows to find specific areas where AI tools can reduce costs, save time, or improve customer experience.",
        "Tool and platform selection — research and recommend the right AI tools for your use cases, comparing features, pricing, integration requirements, and long-term scalability.",
        "Implementation roadmap — deliver a phased plan with clear milestones, timelines, resource requirements, and success criteria so you can adopt AI incrementally without disrupting current operations.",
        "Team training and enablement — provide hands-on guidance to help your team understand and use new AI tools effectively, reducing the learning curve and building internal confidence.",
        "Ongoing advisory support — offer continued consulting as your AI initiatives mature, helping you evaluate results, adjust strategies, and identify new opportunities as the technology evolves.",
      ]}
      benefits={[
        "A realistic understanding of where AI fits in your business today",
        "Prioritized recommendations based on impact and feasibility",
        "Vendor-neutral guidance that focuses on your needs, not a specific platform",
        "A phased roadmap that avoids costly mistakes and wasted investment",
        "Internal team confidence to use and manage AI tools independently",
        "A strategic partner who stays involved as your AI maturity grows",
      ]}
      faq={[
        {
          q: "Is AI consulting only for large businesses?",
          a: "No. Businesses of any size can benefit from AI consulting. Small and mid-sized companies often see the greatest impact because a focused assessment can identify quick wins that save significant time or money without requiring a large technology investment.",
        },
        {
          q: "What does an AI readiness assessment involve?",
          a: "We review your existing data, tools, workflows, and team capabilities. The goal is to understand what you already have in place, what gaps exist, and which AI applications are realistic given your current infrastructure and resources.",
        },
        {
          q: "Do you implement the AI solutions you recommend?",
          a: "Yes. We can handle both the strategy and the implementation. If you prefer to use your own team or a third-party vendor for implementation, we provide detailed specifications and can oversee the process to ensure it follows the roadmap.",
        },
        {
          q: "How long does a typical AI consulting engagement take?",
          a: "An initial assessment and roadmap typically takes two to four weeks. Ongoing advisory relationships continue for as long as you need support, with monthly or quarterly check-ins depending on the pace of your implementation.",
        },
      ]}
    />
  );
}
