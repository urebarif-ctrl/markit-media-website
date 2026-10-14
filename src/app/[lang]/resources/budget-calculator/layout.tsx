import type { Metadata } from "next";

export const metadata: Metadata = { openGraph:{url:"https://themarkitmedia.com/en/free-tools/free-budget-calculator",title:"Marketing Budget Calculator — Plan Your Ad Spend",description:"Use our free marketing budget calculator to get recommended budget allocations across SEO, PPC, social media, content, email, and video based on your business type and goals.",siteName:"Markit Media",images:[{url:"/images/branding/og-image.png",width:1200,height:630,alt:"Markit Media — Full-Stack Digital Marketing Agency"}]},
  title: "Marketing Budget Calculator — Plan Your Ad Spend",
  description: "Use our free marketing budget calculator to get recommended budget allocations across SEO, PPC, social media, content, email, and video based on your business type and goals.",
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-budget-calculator" },
};

export default function BudgetCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
