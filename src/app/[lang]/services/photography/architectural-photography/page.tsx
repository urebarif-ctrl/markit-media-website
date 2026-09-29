import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Architectural Photography | Markit Media",
  description: "Interior and exterior photography for real estate, hospitality, restaurants, offices, retail, developments, and commercial spaces.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/photography/architectural-photography" },
};

export default function Page() {
  return (
    <SubServicePage
      parentTitle="Professional Photography"
      parentHref="/services/photography"
      title="Architectural Photography"
      description="Interior and exterior photography for real estate, hospitality, restaurants, offices, retail, developments, and commercial spaces."
      details={["Pre-shoot planning around the property, spaces, natural light, operating hours, key selling points, brand requirements, and the channels where the images will be used.","Exterior photography that communicates scale, frontage, architecture, landscaping, access, environment, and the overall presence of a property.","Interior photography focused on space, layout, materials, lighting, furniture, finishes, details, and the atmosphere experienced by visitors or buyers.","Hospitality and commercial-space imagery for restaurants, hotels, offices, retail, venues, developments, showrooms, and client-facing environments.","Perspective correction, exposure balancing, color work, cleanup, and careful retouching while keeping the finished space believable.","Delivery for websites, listings, social media, booking platforms, presentations, brochures, PR, and advertising."]}
      benefits={["Professional representation of physical spaces","Consistent visuals across listings and marketing","Better presentation of design, finishes, and atmosphere","Useful assets for sales, booking, PR, and social","Careful perspective and exposure control","Multiple crops and formats for digital use"]}
      faq={[{"q":"Do you photograph both interiors and exteriors?","a":"Yes. The shot plan can include exterior establishing images, individual rooms, details, amenities, signage, views, and the wider environment."},{"q":"What businesses use architectural photography?","a":"Common projects include real estate, hospitality, restaurants, offices, retail, developments, venues, showrooms, clinics, and commercial properties."},{"q":"Can you photograph a space while it is operating?","a":"Sometimes. We plan around operating hours and foot traffic. For highly controlled images, an off-hours or prepared window may produce better results."},{"q":"Can the same shoot include lifestyle content?","a":"Yes. Architectural coverage can be combined with people, service interactions, food, products, or lifestyle scenes when the brand needs a fuller content library."}]}
      relatedServices={[{"title":"Website Development","href":"/services/website-development","desc":"Use strong property visuals in a conversion-focused site."},{"title":"Social Media Marketing","href":"/services/social-media","desc":"Turn the shoot into ongoing social content."}]}
    />
  );
}
