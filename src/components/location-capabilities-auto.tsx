"use client";

import { usePathname } from "next/navigation";
import { LocationCapabilities, type LocationCapabilityMode } from "@/components/location-capabilities";

const names: Record<string, string> = {
  "new-york": "New York",
  "los-angeles": "Los Angeles",
  "san-francisco": "San Francisco",
  "chicago": "Chicago",
  "houston": "Houston",
  "miami": "Miami",
  "dallas": "Dallas",
  "atlanta": "Atlanta",
  "boston": "Boston",
  "seattle": "Seattle",
  "denver": "Denver",
  "phoenix": "Phoenix",
  "karachi": "Karachi",
  "united-states": "the United States",
  "canada": "Canada",
  "australia": "Australia",
  "uae": "the UAE",
  "uk": "the United Kingdom",
  "saudi-arabia": "Saudi Arabia"
};

function cleanPath(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] && parts[0].length === 2) parts.shift();
  return "/" + parts.join("/");
}

function modeFor(path: string): LocationCapabilityMode {
  if (path.includes("/ppc-ads")) return "ppc";
  if (path.includes("/website-development")) return "website";
  if (path.includes("/seo-services")) return "seo";
  if (path.includes("/social-media-marketing")) return "social";
  if (path.includes("/branding")) return "branding";
  return "all";
}

function locationFor(path: string) {
  const parts = path.split("/").filter(Boolean);
  if (parts[0] !== "locations") return null;
  if (parts[1] === "united-states" && parts[2]) return names[parts[2]] || parts[2];
  return names[parts[1]] || null;
}

export function LocationCapabilitiesAuto() {
  const path = cleanPath(usePathname());
  if (path === "/locations") return null;
  const location = locationFor(path);
  if (!location) return null;
  return <LocationCapabilities location={location} mode={modeFor(path)} />;
}
