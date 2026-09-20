import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin — Markit Media CMS",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-gray-50 font-sans text-gray-900">
        {children}
      </body>
    </html>
  );
}
