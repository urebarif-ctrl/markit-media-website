import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Reporting Dashboard Builder | Free Tool | Markit Media",
  description: "Build professional marketing reports for clients. Select KPIs, add channels, include insights and recommendations. Export ready-to-present reports.",
  openGraph: {
    title: "Client Reporting Dashboard Builder | Free Tool | Markit Media",
    description: "Build professional marketing reports for clients.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
