import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-client-onboarding-checklist" },
  title: "Client Onboarding Checklist Generator | Free Tool",
  description: "Generate a customised marketing client onboarding checklist based on services, channels, and project scope. Never miss a setup step.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-client-onboarding-checklist",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Client Onboarding Checklist Generator | Free Tool",
    description: "Generate a customised marketing client onboarding checklist based on services and scope.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
