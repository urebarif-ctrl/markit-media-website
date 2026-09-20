import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Marketplace Management Services",
  description:
    "Manage and grow your presence across Amazon, Walmart, eBay, and other online marketplaces. Markit Media handles listings, pricing, inventory, and multi-channel strategy.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/ecommerce-marketing/marketplace-management",
  },
};

export default function MarketplaceManagementPage() {
  return (
    <SubServicePage
      parentTitle="E-commerce Marketing"
      parentHref="/services/ecommerce-marketing"
      title="Marketplace Management"
      description="Selling on multiple marketplaces creates opportunity but also complexity. We handle listing optimization, pricing strategy, inventory synchronization, and account health across Amazon, Walmart, eBay, and other platforms so you can grow revenue without the operational overhead."
      details={[
        "Listing creation and optimization — write compelling product titles, bullet points, and descriptions that follow each marketplace's style guidelines and incorporate relevant search terms for maximum organic visibility.",
        "Pricing strategy and repricing — implement competitive pricing rules, monitor competitor pricing, and adjust dynamically to win the Buy Box on Amazon or equivalent placements on other marketplaces without eroding margins.",
        "Inventory synchronization — connect your inventory across all sales channels to prevent overselling, manage stock allocation, and ensure accurate availability data on every marketplace.",
        "Account health monitoring — track seller metrics, respond to policy notifications, manage A-to-Z claims and cases, and maintain the performance standards required to keep your accounts in good standing.",
        "Multi-marketplace expansion — evaluate which new marketplaces fit your product catalog, handle onboarding and setup, and adapt your listings and strategy for each platform's audience and algorithm.",
        "Enhanced content and A+ pages — create rich media content, comparison charts, brand stories, and enhanced product descriptions that increase conversion rates on supported marketplaces.",
      ]}
      benefits={[
        "Optimized listings that rank higher in marketplace search results",
        "Competitive pricing strategies that protect margin while winning placements",
        "Synchronized inventory that eliminates overselling across channels",
        "Healthy seller accounts with strong performance metrics and fewer suspensions",
        "Revenue diversification through expansion to additional marketplaces",
        "Enhanced product content that builds trust and improves conversion rates",
      ]}
      faq={[
        {
          q: "Which marketplaces do you manage?",
          a: "We manage seller accounts on Amazon, Walmart Marketplace, eBay, and other platforms relevant to your industry. During onboarding, we assess which channels align with your product catalog, target audience, and growth goals, then build a strategy around those platforms.",
        },
        {
          q: "How do you handle pricing across multiple marketplaces?",
          a: "We use repricing tools and custom rules to keep your prices competitive on each channel while protecting your margins. The strategy accounts for marketplace fees, shipping costs, competitor activity, and minimum advertised price policies.",
        },
        {
          q: "What happens if a marketplace account gets a policy warning?",
          a: "We monitor account health daily and respond to policy notifications immediately. If an issue arises — a listing violation, performance metric dip, or buyer complaint — we investigate the root cause, submit the appropriate appeal or plan of action, and implement preventive measures.",
        },
        {
          q: "Can you help us expand to a new marketplace?",
          a: "Yes. We handle the full setup: account registration, catalog onboarding, listing creation, fulfillment configuration, and initial advertising. We also adapt your existing content and pricing strategy to fit the new platform's requirements and audience behavior.",
        },
      ]}
    />
  );
}
