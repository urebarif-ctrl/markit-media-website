import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Campaign Tracker | Free Tool | Markit Media",
  description: "Track and manage all your marketing campaigns in one place. Monitor status, budgets, performance, and deadlines across channels.",
  openGraph: {
    title: "Marketing Campaign Tracker | Free Tool | Markit Media",
    description: "Track and manage all your marketing campaigns in one place.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
