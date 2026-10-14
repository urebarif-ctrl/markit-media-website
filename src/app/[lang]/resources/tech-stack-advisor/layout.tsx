import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Tech Stack Advisor — Get Tool Recommendations That Fit",
  description:
    "Take this free quiz to get marketing tech stack recommendations based on your business needs and technical level. Stop paying for tools you don't need.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-tech-stack-advisor" },
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-tech-stack-advisor",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Free Marketing Tech Stack Advisor",
    description:
      "Get personalized marketing tech stack recommendations based on your business needs and technical level. Stop overpaying for tools.",
  },
};

export default function TechStackAdvisorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
