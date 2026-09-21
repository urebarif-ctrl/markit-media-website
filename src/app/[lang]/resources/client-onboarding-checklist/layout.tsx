import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Onboarding Checklist Generator | Free Tool | Markit Media",
  description: "Generate a customised marketing client onboarding checklist based on services, channels, and project scope. Never miss a setup step.",
  openGraph: {
    title: "Client Onboarding Checklist Generator | Free Tool | Markit Media",
    description: "Generate a customised marketing client onboarding checklist based on services and scope.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
