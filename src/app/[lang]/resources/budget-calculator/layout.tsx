import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Budget Calculator — Plan Your Ad Spend",
  description: "Use our free marketing budget calculator to get recommended budget allocations across SEO, PPC, social media, content, email, and video based on your business type and goals.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/budget-calculator" },
};

export default function BudgetCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
