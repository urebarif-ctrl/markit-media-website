import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRO Audit Checklist — Find What's Killing Your Conversions",
  description:
    "Free CRO audit checklist that scores your page speed, UX, forms, and trust elements so you can pinpoint exactly what to fix first.",
  alternates: { canonical: "https://themarkitmedia.com/en/resources/cro-audit" },
  openGraph: {
    title: "CRO Audit Checklist — Fix Your Conversions",
    description:
      "Free checklist that scores page speed, UX, forms, and trust elements so you can pinpoint exactly what to fix first.",
  },
};

export default function CroAuditLayout({ children }: { children: React.ReactNode }) {
  return children;
}
