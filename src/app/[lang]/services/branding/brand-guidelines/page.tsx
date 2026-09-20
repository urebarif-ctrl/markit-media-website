import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Brand Guidelines Services",
  description:
    "Comprehensive brand books and usage guidelines that ensure consistency across every team and touchpoint. Markit Media creates clear brand standards your organization can follow.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/branding/brand-guidelines",
  },
  openGraph: {
    title: "Brand Guidelines Services",
    description: "Comprehensive brand books and usage guidelines that ensure consistency across every team and touchpoint. Markit Media creates clear brand standards your...",
  },
};

export default function BrandGuidelinesPage() {
  return (
    <SubServicePage
      parentTitle="Branding & Design"
      parentHref="/services/branding"
      title="Brand Guidelines"
      description="Brand guidelines are the rulebook that keeps your brand consistent as it scales. We create comprehensive, easy-to-follow brand books that document everything from logo usage to tone of voice, giving every team member and external partner the clarity they need to represent your brand correctly."
      details={[
        "Brand book creation — produce a complete brand guidelines document covering logo usage, color specifications, typography rules, imagery standards, and design dos and don'ts in a professionally designed format.",
        "Logo usage rules — define clear spacing requirements, minimum sizes, approved placements, background rules, and examples of incorrect usage to protect your logo's integrity.",
        "Color and typography specifications — document every color value (HEX, RGB, CMYK, Pantone) and type style with exact sizing, weight, and spacing rules for both digital and print.",
        "Voice and tone guidelines — establish written standards for how your brand communicates, including vocabulary preferences, sentence style, and tone adjustments for different audiences and channels.",
        "Template and layout standards — provide grid systems, margin rules, and layout templates for common materials like presentations, social media posts, email headers, and print collateral.",
        "Digital and print application rules — specify how brand elements should be applied across websites, social platforms, advertising, packaging, signage, and any other relevant media.",
        "Version control and distribution — deliver guidelines in accessible formats (PDF, web-based) with a versioning system so updates can be managed and distributed over time.",
      ]}
      benefits={[
        "Consistent brand presentation across every team, vendor, and channel",
        "A professional reference document that saves time on design decisions",
        "Clear rules that prevent common brand misuse and off-brand materials",
        "Faster onboarding for new employees, agencies, and creative partners",
        "Scalable standards that grow with your business and brand evolution",
        "Reduced back-and-forth by giving stakeholders clear, documented answers",
      ]}
      faq={[
        {
          q: "What should brand guidelines include?",
          a: "At a minimum, brand guidelines should cover logo usage, color palette, typography, and basic layout rules. More comprehensive guidelines also include voice and tone, photography style, iconography, template standards, and application examples for digital and print media.",
        },
        {
          q: "Who uses brand guidelines?",
          a: "Everyone who creates materials on behalf of your brand — internal marketing teams, designers, content writers, external agencies, freelancers, and print vendors. Well-structured guidelines ensure consistent results regardless of who is doing the work.",
        },
        {
          q: "How often should brand guidelines be updated?",
          a: "Guidelines should be reviewed annually or whenever a significant brand change occurs, such as a rebrand, new product line, or expansion into new markets. A versioned format makes it easy to update specific sections without recreating the entire document.",
        },
        {
          q: "Can you create digital or web-based brand guidelines?",
          a: "Yes. In addition to PDF brand books, we can create web-based brand portals or interactive documents that are easier to search, share, and update. Digital guidelines are especially useful for larger organizations with distributed teams.",
        },
      ]}
    />
  );
}
