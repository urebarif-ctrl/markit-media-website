import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Agency Comparison Tool",
  description: "Compare digital marketing agencies side by side across services, pricing, and capabilities.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-agency-comparison" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-agency-comparison",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Digital Agency Comparison Tool",
    description: "Compare digital marketing agencies side by side across services, pricing, and capabilities.",
  },
};

export default function AgencyComparisonLayout({ children }: { children: React.ReactNode }) {
  return children;
}
