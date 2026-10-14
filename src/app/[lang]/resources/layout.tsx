import { ToolTracker } from "@/components/tool-tracker";

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolTracker />
      {children}
    </>
  );
}
