import type { ReactNode } from "react";
import { LocationCapabilitiesAuto } from "@/components/location-capabilities-auto";

export default function LocationsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <LocationCapabilitiesAuto />
    </>
  );
}
