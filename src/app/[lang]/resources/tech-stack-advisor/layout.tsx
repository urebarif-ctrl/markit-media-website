import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Tech Stack Advisor — Get Tool Recommendations That Fit",
  description:
    "Take this free quiz to get marketing tech stack recommendations based on your business needs and technical level. Stop paying for tools you don't need.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/tech-stack-advisor" },
  openGraph: {
    title: "Free Marketing Tech Stack Advisor",
    description:
      "Get personalized marketing tech stack recommendations based on your business needs and technical level. Stop overpaying for tools.",
  },
};

export default function TechStackAdvisorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
