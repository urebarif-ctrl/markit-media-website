import type { Metadata } from "next";
import { SubServicePage } from "@/components/sub-service-page";

export const metadata: Metadata = {
  title: "Product Photography",
  description: "Commercial product photography for e-commerce, catalogs, social media, marketplaces, websites, and advertising, planned around how the images will actually be used.",
  alternates: { canonical: "https://themarkitmedia.com/en/services/photography/product-photography" },
};

export default function Page() {
  return (
    <SubServicePage
      platforms={[{"name":"Adobe","note":"Lightroom"},{"name":"Adobe","note":"Photoshop"},{"name":"Canva"},{"name":"Shopify"},{"name":"Amazon"}]}
      parentTitle="Professional Photography"
      parentHref="/services/photography"
      title="Product Photography"
      description="Commercial product photography for e-commerce, catalogs, social media, marketplaces, websites, and advertising, planned around how the images will actually be used."
      details={["Creative direction and shot planning based on the product range, brand identity, campaign goal, sales channel, and required aspect ratios.","Clean product-on-background photography for e-commerce stores, catalogs, marketplaces, menus, sales decks, and product listings.","Styled and contextual product photography that shows scale, use, ingredients, materials, packaging, or lifestyle context where it helps the buyer understand the product.","Lighting, composition, styling, surface selection, prop direction, and visual consistency across a product range rather than treating each image as an unrelated shot.","Retouching, color correction, cleanup, crop variations, and export preparation for website, social media, paid ads, print, and marketplace requirements.","Ongoing product-content production for brands that launch new SKUs, seasonal collections, promotional campaigns, or regular social and advertising creative."]}
      benefits={["Consistent product presentation across channels","Higher-quality assets for product pages and campaigns","Image formats prepared for the channels that need them","Stronger visual differentiation from generic supplier imagery","Reusable content for web, social, advertising, and sales","A repeatable production system for growing catalogs"]}
      faq={[{"q":"Do you photograph products for e-commerce stores?","a":"Yes. We plan and produce product images for websites, Shopify stores, marketplaces, catalogs, social media, and advertising. The shot list is built around the channels and product variations you need."},{"q":"Can you create both clean product shots and lifestyle images?","a":"Yes. A project can include clean background images, detail shots, packaging, styled scenes, contextual or lifestyle imagery, and campaign-oriented compositions."},{"q":"Do you handle retouching?","a":"Yes. Post-production can include cleanup, color correction, background work, crop variations, consistency adjustments, and final exports for the agreed channels."},{"q":"Can photography be combined with video or social content?","a":"Yes. Product photography is often planned alongside reels, short-form video, social creative, website content, or paid advertising so one production cycle creates a wider asset library."}]}
      relatedServices={[{"title":"E-commerce Marketing","href":"/services/ecommerce-marketing","desc":"Connect product assets with acquisition and retention."},{"title":"Social Media Marketing","href":"/services/social-media","desc":"Use the content across organic and paid social."}]}
    />
  );
}
