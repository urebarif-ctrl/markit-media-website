import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing ROI Report Generator | Free Tool | Markit Media",
  description:
    "Generate a professional marketing ROI report. Input channel spend and revenue data to create a comprehensive performance analysis.",
  openGraph: {
    title: "Marketing ROI Report Generator | Free Tool | Markit Media",
    description:
      "Generate professional marketing ROI reports with channel-level analysis.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
