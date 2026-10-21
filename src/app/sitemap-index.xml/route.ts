import { renderSitemapIndex, xmlResponse } from "@/lib/sitemap-xml";
import { hubLastModified } from "@/lib/case-studies";

export const dynamic = "force-static";

const BASE_URL = "https://themarkitmedia.com";
const GROUPS = [
  "pages",
  "services",
  "locations-karachi",
  "locations-united-states",
  "locations-international",
  "industries",
  "free-tools",
  "work",
  "blog",
  "legacy-articles",
];

export async function GET() {
  return xmlResponse(
    renderSitemapIndex(
      GROUPS.map((group) => `${BASE_URL}/sitemaps/${group}.xml`),
      { [`${BASE_URL}/sitemaps/work.xml`]: hubLastModified() },
    ),
  );
}
