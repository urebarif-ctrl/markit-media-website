import type { ReactNode } from "react";
import { IndustryProjectStrip } from "@/components/industry-project-strip";

export default function IndustriesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <IndustryProjectStrip />
    </>
  );
}
