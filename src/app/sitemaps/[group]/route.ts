import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/app/sitemap";
import { renderUrlSet, xmlResponse } from "@/lib/sitemap-xml";

export const dynamic = "force-static";
export const dynamicParams = false;

const BASE_URL = "https://themarkitmedia.com";
const GROUPS = [
  "pages",
  "services",
  "locations-karachi",
  "locations-united-states",
  "locations-international",
  "industries",
  "free-tools",
  "resources",
  "work",
  "blog",
  "legacy-articles",
] as const;

type Group = (typeof GROUPS)[number];

export function generateStaticParams() {
  return GROUPS.map((group) => ({ group: `${group}.xml` }));
}

function localizedPath(url: string) {
  const prefix = `${BASE_URL}/en`;
  return url.startsWith(prefix) ? url.slice(prefix.length) || "/" : null;
}

function belongsTo(group: Group, entry: MetadataRoute.Sitemap[number]) {
  const path = localizedPath(entry.url);

  if (group === "legacy-articles") return path === null;
  if (path === null) return false;

  if (group === "services") return path === "/services" || path.startsWith("/services/");
  if (group === "locations-karachi") {
    return path === "/locations/karachi" || path.startsWith("/locations/karachi/");
  }
  if (group === "locations-united-states") {
    return path === "/locations/united-states" || path.startsWith("/locations/united-states/");
  }
  if (group === "locations-international") {
    return (
      (path === "/locations" || path.startsWith("/locations/")) &&
      path !== "/locations/karachi" &&
      !path.startsWith("/locations/karachi/") &&
      path !== "/locations/united-states" &&
      !path.startsWith("/locations/united-states/")
    );
  }
  if (group === "industries") return path === "/industries" || path.startsWith("/industries/");
  if (group === "free-tools") return path === "/free-tools" || path.startsWith("/free-tools/");
  if (group === "resources") return path === "/resources" || path.startsWith("/resources/");
  if (group === "work") {
    return path === "/work" || path.startsWith("/work/") || path === "/case-studies" || path.startsWith("/case-studies/");
  }
  if (group === "blog") return path === "/blog" || path.startsWith("/blog/");

  const categorized =
    path === "/services" || path.startsWith("/services/") ||
    path === "/locations" || path.startsWith("/locations/") ||
    path === "/industries" || path.startsWith("/industries/") ||
    path === "/free-tools" || path.startsWith("/free-tools/") ||
    path === "/resources" || path.startsWith("/resources/") ||
    path === "/work" || path.startsWith("/work/") ||
    path === "/case-studies" || path.startsWith("/case-studies/") ||
    path === "/blog" || path.startsWith("/blog/");

  return group === "pages" && !categorized;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ group: string }> },
) {
  const { group: rawGroup } = await context.params;
  const group = rawGroup.replace(/\.xml$/, "") as Group;

  if (!GROUPS.includes(group)) {
    return new Response("Not found", { status: 404 });
  }

  const entries = getSitemapEntries().filter((entry) => belongsTo(group, entry));
  return xmlResponse(renderUrlSet(entries));
}
