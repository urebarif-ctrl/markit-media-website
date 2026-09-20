import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buyer Persona Quiz — Identify Your Ideal Customer",
  description:
    "Use our free buyer persona quiz to identify your ideal customer profiles. Answer targeted questions to get detailed persona cards with demographics, pain points, and buying behavior.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/buyer-persona-quiz" },
  openGraph: {
    title: "Free Buyer Persona Quiz",
    description:
      "Identify your ideal buyer personas through a guided quiz. Get detailed persona cards with demographics, pain points, and behavior.",
  },
};

export default function BuyerPersonaQuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
