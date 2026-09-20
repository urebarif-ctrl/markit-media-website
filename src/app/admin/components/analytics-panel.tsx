"use client";

import { useState, useEffect } from "react";

interface AnalyticsData {
  summary: {
    totalLeads: number;
    newLeads: number;
    totalPosts: number;
    publishedPosts: number;
    totalMedia: number;
    draftPosts?: number;
    categories?: number;
  };
  leadsByDay: { date: string; count: number }[];
  leadsByService: { service: string; count: number }[];
  leadsByStatus: { status: string; count: number }[];
  recentLeads: { id: number; name: string; email: string; service: string; status: string; created_at: string }[];
  postsByCategory?: { category: string; count: number }[];
  recentPosts?: { id: number; title: string; category: string; status: string; published_at: string | null }[];
}

export function AnalyticsPanel({ headers }: { headers: Record<string, string> }) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/analytics?days=${days}`, { headers })
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [days]);

  if (loading) return <div className="text-base text-gray-500 py-12 text-center">Loading analytics...</div>;
  if (!data) return <div className="text-base text-red-600 py-12 text-center">Failed to load analytics</div>;

  return (
    <div className="space-y-8">
      {/* Period selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-black">Dashboard</h2>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="border border-gray-300 px-3 py-2 text-sm bg-white"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
          <option value={365}>Last year</option>
        </select>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {[
          { label: "Total Leads", value: data.summary.totalLeads, color: "bg-black text-white" },
          { label: "New Leads", value: data.summary.newLeads, color: "bg-black text-white" },
          { label: "Blog Posts", value: data.summary.totalPosts, color: "bg-gray-100 text-black" },
          { label: "Published", value: data.summary.publishedPosts, color: "bg-gray-100 text-black" },
          { label: "Drafts", value: data.summary.draftPosts ?? 0, color: "bg-gray-100 text-black" },
          { label: "Categories", value: data.summary.categories ?? 0, color: "bg-gray-100 text-black" },
          { label: "Media Files", value: data.summary.totalMedia, color: "bg-gray-100 text-black" },
        ].map((card) => (
          <div key={card.label} className={`p-5 ${card.color}`}>
            <div className="text-2xl font-extrabold">{card.value}</div>
            <div className="text-sm mt-1 opacity-70">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Leads chart (simple bar) */}
      {data.leadsByDay.length > 0 && (
        <div className="bg-white border border-gray-200 p-6">
          <h3 className="text-base font-bold text-black mb-4">Leads Over Time</h3>
          <div className="flex items-end gap-1 h-40">
            {data.leadsByDay.map((day) => {
              const max = Math.max(...data.leadsByDay.map((d) => d.count), 1);
              const height = (day.count / max) * 100;
              return (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-1" title={`${day.date}: ${day.count} leads`}>
                  <div className="w-full bg-black" style={{ height: `${Math.max(height, 2)}%` }} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Leads by service */}
        {data.leadsByService.length > 0 && (
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-base font-bold text-black mb-4">Leads by Service</h3>
            <div className="space-y-3">
              {data.leadsByService.map((s) => (
                <div key={s.service} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{s.service}</span>
                  <span className="text-sm font-bold text-black">{s.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leads by status */}
        <div className="bg-white border border-gray-200 p-6">
          <h3 className="text-base font-bold text-black mb-4">Leads by Status</h3>
          <div className="space-y-3">
            {data.leadsByStatus.map((s) => (
              <div key={s.status} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 capitalize">{s.status}</span>
                <span className="text-sm font-bold text-black">{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.postsByCategory && data.postsByCategory.length > 0 && (
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-base font-bold text-black mb-4">Posts by Category</h3>
            <div className="space-y-2">
              {data.postsByCategory.map((c) => {
                const maxCat = Math.max(...(data.postsByCategory || []).map((x) => x.count), 1);
                return (
                  <div key={c.category} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-32 flex-shrink-0 truncate">{c.category}</span>
                    <div className="flex-1 bg-gray-100 h-4">
                      <div className="bg-black h-4" style={{ width: `${(c.count / maxCat) * 100}%` }} />
                    </div>
                    <span className="text-sm font-bold text-black w-8 text-right">{c.count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {data.recentPosts && data.recentPosts.length > 0 && (
          <div className="bg-white border border-gray-200 p-6">
            <h3 className="text-base font-bold text-black mb-4">Latest Blog Posts</h3>
            <div className="space-y-3">
              {data.recentPosts.map((post) => (
                <div key={post.id} className="flex items-start justify-between gap-2 py-2 border-b border-gray-100">
                  <div>
                    <div className="text-sm font-medium text-gray-700 line-clamp-1">{post.title}</div>
                    <div className="text-sm text-gray-400">{post.category}</div>
                  </div>
                  <span className={`text-sm font-bold px-2 py-0.5 flex-shrink-0 uppercase ${post.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>{post.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recent leads */}
      <div className="bg-white border border-gray-200 p-6">
        <h3 className="text-base font-bold text-black mb-4">Recent Leads</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-2 font-bold text-black">Name</th>
                <th className="text-left py-2 px-2 font-bold text-black">Email</th>
                <th className="text-left py-2 px-2 font-bold text-black hidden sm:table-cell">Service</th>
                <th className="text-left py-2 px-2 font-bold text-black">Status</th>
                <th className="text-left py-2 px-2 font-bold text-black hidden md:table-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.recentLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-100">
                  <td className="py-2 px-2 text-gray-700">{lead.name}</td>
                  <td className="py-2 px-2 text-gray-500">{lead.email}</td>
                  <td className="py-2 px-2 text-gray-500 hidden sm:table-cell">{lead.service || "—"}</td>
                  <td className="py-2 px-2">
                    <span className={`text-xs font-bold px-2 py-1 uppercase ${
                      lead.status === "new" ? "bg-blue-100 text-blue-800" :
                      lead.status === "contacted" ? "bg-yellow-100 text-yellow-800" :
                      lead.status === "converted" ? "bg-green-100 text-green-800" :
                      "bg-gray-100 text-gray-600"
                    }`}>{lead.status}</span>
                  </td>
                  <td className="py-2 px-2 text-gray-500 hidden md:table-cell">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {data.recentLeads.length === 0 && (
                <tr><td colSpan={5} className="py-8 text-center text-gray-400">No leads yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
