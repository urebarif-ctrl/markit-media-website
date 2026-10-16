import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://themarkitmedia.com/en/free-tools/free-roi-forecaster" },
  title: "Marketing ROI Forecaster | Free Tool",
  description:
    "Forecast marketing ROI by channel with traffic, conversion rate, average order value, and cost inputs. Compare scenarios and project annual returns.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
