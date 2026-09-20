import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buyer Persona Builder — Define Your Ideal Customer Profile",
  description:
    "Build detailed marketing buyer personas with demographics, goals, challenges, and channel preferences using this free interactive tool. Target smarter, convert more.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/persona-builder" },
  openGraph: {
    title: "Free Buyer Persona Builder",
    description:
      "Build detailed buyer personas with demographics, goals, challenges, and channel preferences. Know exactly who you're marketing to.",
  },
};

export default function PersonaBuilderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
