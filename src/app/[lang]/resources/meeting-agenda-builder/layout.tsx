import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Meeting Agenda Builder | Free Tool | Markit Media",
  description: "Build structured marketing meeting agendas from templates. Weekly standups, monthly reviews, quarterly planning, and client calls.",
  openGraph: {
    title: "Marketing Meeting Agenda Builder | Free Tool | Markit Media",
    description: "Build structured marketing meeting agendas from professional templates.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
