import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-meeting-agenda-builder" },
  title: "Marketing Meeting Agenda Builder | Free Tool",
  description: "Build structured marketing meeting agendas from templates. Weekly standups, monthly reviews, quarterly planning, and client calls.",
  openGraph: {
    url: "https://themarkitmedia.com/en/free-tools/free-meeting-agenda-builder",
    siteName: "Markit Media",
    images: [{ url: "/images/branding/og-image.png", width: 1200, height: 630, alt: "Markit Media — Full-Stack Digital Marketing Agency" }],
    title: "Marketing Meeting Agenda Builder | Free Tool",
    description: "Build structured marketing meeting agendas from professional templates.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
