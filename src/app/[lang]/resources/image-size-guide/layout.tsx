import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Image Size Guide — Every Platform, Every Dimension",
  description:
    "Free reference guide with up-to-date social media image dimensions for every platform so your visuals always look sharp.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/image-size-guide" },
  openGraph: {
    title: "Social Media Image Size Guide",
    description:
      "Free reference guide with up-to-date image dimensions for every social media platform so your visuals always look sharp.",
  },
};

export default function ImageSizeGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
