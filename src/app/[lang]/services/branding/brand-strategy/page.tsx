import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Brand Strategy Services",
  description:
    "Build a brand that stands apart. Markit Media develops brand positioning, messaging frameworks, architecture, and competitive differentiation strategies that drive long-term business growth.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/branding/brand-strategy",
  },
};

export default function BrandStrategyPage() {
  return (
    <SubServicePage
      parentTitle="Branding & Design"
      parentHref="/services/branding"
      title="Brand Strategy"
      description="A strong brand starts with a clear strategy. We help you define who you are, what you stand for, and how you communicate value to your audience. From positioning to messaging, we build the strategic foundation that every visual and verbal brand element is built on."
      details={[
        "Brand positioning — define your unique place in the market by identifying what sets you apart, who your ideal customer is, and the specific value only you can deliver.",
        "Messaging framework — develop core messages including your value proposition, brand promise, taglines, and audience-specific talking points that keep communication consistent across every channel.",
        "Brand architecture — structure your brand portfolio so that parent brands, sub-brands, and product lines relate to each other in a way that makes sense to customers and supports growth.",
        "Competitive differentiation — analyze the competitive landscape to identify gaps and opportunities, then articulate clear differentiators that give your brand an edge.",
        "Audience personas — research and define your target audiences with detailed profiles covering their needs, motivations, pain points, and decision-making criteria.",
        "Brand voice and tone — establish guidelines for how your brand sounds in writing and conversation, ensuring personality and professionalism come through consistently.",
        "Strategic brand roadmap — deliver a phased plan for rolling out your brand strategy across touchpoints, from internal alignment to external launch.",
      ]}
      benefits={[
        "Clear market positioning that distinguishes you from competitors",
        "Consistent messaging that resonates with your target audience",
        "A scalable brand architecture that supports future growth",
        "Deeper understanding of your audience and their decision drivers",
        "Internal alignment on brand purpose, values, and direction",
        "A strategic foundation that informs every design and marketing decision",
      ]}
      faq={[
        {
          q: "What is brand strategy and why does it matter?",
          a: "Brand strategy is the long-term plan for how your brand will be perceived in the market. It defines your positioning, messaging, and audience approach. Without it, marketing efforts lack cohesion and your brand risks blending in with competitors.",
        },
        {
          q: "How long does it take to develop a brand strategy?",
          a: "A thorough brand strategy typically takes four to eight weeks, depending on the complexity of your business, the number of stakeholders involved, and whether primary audience research is needed. The process includes discovery, competitive analysis, strategy development, and refinement.",
        },
        {
          q: "What is the difference between brand strategy and branding?",
          a: "Brand strategy is the thinking behind the brand — positioning, messaging, and audience definition. Branding is the execution — logos, colors, typography, and visual identity. Strategy should always come first because it informs every design decision that follows.",
        },
        {
          q: "Do I need a brand strategy if I already have a logo?",
          a: "A logo is only one piece of a brand. Without a strategy behind it, your visual identity may not communicate the right message or connect with the right audience. Brand strategy ensures every element of your brand works together toward a clear business goal.",
        },
      ]}
    />
  );
}
