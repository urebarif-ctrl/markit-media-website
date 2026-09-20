import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Local SEO Services",
  description:
    "Dominate the local map pack with Google Business Profile optimization, local citations, review management, and NAP consistency. Markit Media helps businesses rank in their target areas.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/seo/local-seo",
  },
  openGraph: {
    title: "Local SEO Services",
    description: "Dominate the local map pack with Google Business Profile optimization, local citations, review management, and NAP consistency. Markit Media helps busin...",
  },
};

export default function LocalSeoPage() {
  return (
    <SubServicePage
      parentTitle="SEO"
      parentHref="/services/seo"
      title="Local SEO"
      description="Reach customers in your service area when they search for businesses like yours. We optimize your local presence across Google Maps, directories, and location-based search results to drive foot traffic and local leads."
      details={[
        "Google Business Profile optimization — claim, verify, and fully optimize your profile with accurate categories, service descriptions, photos, and regular posts to improve map pack visibility.",
        "Local citation building — list your business on high-authority directories, industry-specific platforms, and data aggregators with consistent Name, Address, and Phone number (NAP) information.",
        "Map pack optimization — target the local three-pack with proximity signals, relevance optimization, and review velocity to appear above organic results for local searches.",
        "Review management strategy — develop a system to generate authentic customer reviews, respond to feedback professionally, and build the social proof that influences local rankings.",
        "NAP consistency audits — identify and correct inconsistent business information across the web to strengthen local search signals and prevent confusion for potential customers.",
        "Local content creation — publish location-specific landing pages, blog posts, and service area pages that target geo-modified keywords and demonstrate local expertise.",
      ]}
      benefits={[
        "Higher visibility in Google Maps and the local three-pack for geo-targeted searches",
        "Increased foot traffic and phone calls from nearby customers ready to buy",
        "Consistent business information across every directory and platform",
        "Stronger online reputation through proactive review generation and response",
        "Location-specific content that ranks for high-intent local keywords",
        "Competitive advantage over local businesses with unoptimized online presence",
      ]}
      faq={[
        {
          q: "What is local SEO and who needs it?",
          a: "Local SEO is the process of optimizing your online presence to attract customers from location-specific searches. Any business that serves a geographic area — brick-and-mortar stores, service-area businesses, multi-location companies — benefits from local SEO.",
        },
        {
          q: "How important is Google Business Profile for local rankings?",
          a: "Google Business Profile is the single most influential factor in local map pack rankings. A fully optimized profile with accurate information, regular updates, and positive reviews significantly increases your chances of appearing in the local three-pack.",
        },
        {
          q: "What is NAP consistency and why does it matter?",
          a: "NAP stands for Name, Address, and Phone number. Search engines cross-reference your business information across the web. Inconsistent NAP data confuses search engines and can reduce your local ranking visibility.",
        },
        {
          q: "How do online reviews affect local SEO?",
          a: "Reviews are a confirmed local ranking factor. Businesses with a higher volume of recent, positive reviews tend to rank better in local results. Review content also provides keyword signals that help search engines understand your business.",
        },
      ]}
    />
  );
}
