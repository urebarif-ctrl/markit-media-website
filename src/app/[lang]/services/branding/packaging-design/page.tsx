import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Packaging Design Services",
  description:
    "Product packaging and label design that captures attention on shelves and online. Markit Media creates retail-ready packaging with structural design, materials guidance, and print specifications.",
  alternates: {
    canonical: "https://themarkitmedia.com/en/services/branding/packaging-design",
  },
  openGraph: {
    title: "Packaging Design Services",
    description: "Product packaging and label design that captures attention on shelves and online. Markit Media creates retail-ready packaging with structural design, ma...",
  },
};

export default function PackagingDesignPage() {
  return (
    <SubServicePage
      parentTitle="Branding & Design"
      parentHref="/services/branding"
      title="Packaging Design"
      description="Packaging is often the first physical interaction a customer has with your brand. We design product packaging that communicates quality, captures attention on the shelf and in online listings, and aligns with your brand identity from structure to finish."
      details={[
        "Structural packaging design — develop the physical form and dimensions of your packaging, considering product protection, shipping efficiency, shelf presence, and user experience during unboxing.",
        "Label and surface design — create the visual layout for packaging surfaces including branding, product information, regulatory content, and graphic elements that attract attention and communicate value.",
        "Materials and finish consultation — advise on substrate choices, coatings, foils, embossing, and other finishes that enhance the tactile and visual quality of your packaging within your budget.",
        "Product line packaging systems — design a cohesive packaging system across multiple SKUs, with clear visual differentiation between variants while maintaining brand consistency across the line.",
        "Print-ready production files — deliver dieline-accurate files with correct bleeds, color profiles, and specifications that your printer or manufacturer can produce without additional preparation.",
        "Mockups and prototyping — provide photorealistic 3D mockups of your packaging for internal review, investor presentations, and e-commerce listings before committing to a production run.",
      ]}
      benefits={[
        "Packaging that stands out on retail shelves and in online product listings",
        "Cohesive design across product lines for strong brand recognition",
        "Print-ready files that reduce production errors and printer back-and-forth",
        "Materials guidance that balances visual impact with budget and sustainability",
        "Realistic mockups for stakeholder approval before production investment",
        "Packaging that reinforces brand quality from the shelf to the unboxing experience",
      ]}
      faq={[
        {
          q: "What is included in a packaging design project?",
          a: "A typical project includes structural layout, surface graphic design, materials recommendations, print-ready production files, and photorealistic mockups. The exact scope depends on whether you need a single product package or a full product line system.",
        },
        {
          q: "Can you design packaging for e-commerce products?",
          a: "Yes. E-commerce packaging has unique requirements — it needs to photograph well for product listings, survive shipping, and create a positive unboxing experience. We design with these considerations in mind alongside your brand standards.",
        },
        {
          q: "Do you handle printing and production?",
          a: "We focus on the design and deliver print-ready files to your preferred manufacturer or printer. We can also coordinate with production vendors on your behalf to ensure the final output matches the approved design.",
        },
        {
          q: "How do you approach packaging for a product line with multiple variants?",
          a: "We create a packaging system with shared brand elements and a clear visual coding system — using color, pattern, or typography variations — so customers can quickly identify different products while recognizing them as part of the same brand family.",
        },
      ]}
    />
  );
}
