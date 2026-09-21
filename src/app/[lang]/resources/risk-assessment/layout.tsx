import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Risk Assessment Matrix | Free Tool | Markit Media",
  description:
    "Identify, score, and visualize marketing risks with an interactive 5x5 risk matrix. Assess likelihood, impact, and mitigation strategies for brand, budget, regulatory, and channel risks.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/risk-assessment" },
  openGraph: {
    title: "Marketing Risk Assessment Matrix | Free Tool | Markit Media",
    description:
      "Free interactive risk assessment matrix for marketing teams. Plot risks on a 5x5 heatmap, calculate risk scores, and build mitigation strategies.",
  },
};

export default function RiskAssessmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
