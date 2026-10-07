import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(req: NextRequest) {
  const slug = new URL(req.url).searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  const db = getDb();
  const row = db.prepare("SELECT * FROM proposals WHERE slug = ? AND status != 'draft'").get(slug) as Record<string, unknown> | undefined;
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    proposal: {
      ...row,
      packages: JSON.parse(String(row.packages || "[]")),
      commercial_notes: JSON.parse(String(row.commercial_notes || "[]")),
      case_studies: JSON.parse(String(row.case_studies || "[]")),
    },
  });
}
