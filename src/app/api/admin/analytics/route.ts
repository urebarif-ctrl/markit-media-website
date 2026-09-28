import { NextRequest, NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";

function getAuth(request: NextRequest) {
  const cookie = request.cookies.get("admin_token")?.value;
  const header = request.headers.get("authorization")?.replace("Bearer ", "");
  return verifyToken(cookie || header || "");
}

export async function GET(request: NextRequest) {
  const auth = getAuth(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const db = await getMongoDb();
    const { searchParams } = new URL(request.url);
    const days = Math.min(365, Math.max(1, Number(searchParams.get("days")) || 30));
    const since = new Date(Date.now() - days * 86400000);

    const leads = db.collection("form_submissions");
    const briefs = db.collection("discovery_briefs");
    const [leadCount, newLeads, briefCount, newBriefs, recentLeadDocs, recentBriefDocs] = await Promise.all([
      leads.countDocuments({ createdAt: { $gte: since } }),
      leads.countDocuments({ createdAt: { $gte: since }, status: { $in: [null, "new"] } }),
      briefs.countDocuments({ createdAt: { $gte: since } }),
      briefs.countDocuments({ createdAt: { $gte: since }, status: "new" }),
      leads.find({ createdAt: { $gte: since } }).sort({ createdAt: -1 }).limit(10).toArray(),
      briefs.find({ createdAt: { $gte: since } }).sort({ createdAt: -1 }).limit(10).toArray(),
    ]);

    const recentLeads = [...recentLeadDocs.map((x) => ({
      id: x._id.toString(), name: String(x.name || x.fullName || "Website lead"),
      email: String(x.email || ""), service: String(x.service || x.source || "Website form"),
      status: String(x.status || "new"), created_at: x.createdAt || new Date(),
    })), ...recentBriefDocs.map((x) => ({
      id: x._id.toString(), name: String(x.name || x.brandName || "Discovery brief"),
      email: String(x.email || ""), service: "Discovery Brief",
      status: String(x.status || "new"), created_at: x.createdAt || new Date(),
    }))].sort((a,b) => +new Date(b.created_at) - +new Date(a.created_at)).slice(0,10);

    return NextResponse.json({
      summary: {
        totalLeads: leadCount + briefCount,
        newLeads: newLeads + newBriefs,
        totalPosts: 0, publishedPosts: 0, totalMedia: 0, draftPosts: 0, categories: 0,
      },
      leadsByDay: [], leadsByService: [], leadsByStatus: [],
      recentLeads, postsByCategory: [], recentPosts: [], period: `${days} days`,
      database: "MongoDB",
    });
  } catch (error) {
    console.error("Admin analytics failed", error);
    return NextResponse.json({ error: "MongoDB dashboard unavailable" }, { status: 503 });
  }
}
