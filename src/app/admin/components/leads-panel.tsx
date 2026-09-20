"use client";

import { useState, useEffect, useCallback } from "react";

interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  submitted_at: string;
  status: string;
  notes: string;
  created_at: string;
}

export function LeadsPanel({ headers }: { headers: Record<string, string> }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Lead | null>(null);

  const fetchLeads = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    if (statusFilter) params.set("status", statusFilter);
    if (search) params.set("search", search);

    fetch(`/api/admin/leads?${params}`, { headers })
      .then((r) => r.json())
      .then((d) => {
        setLeads(d.leads || []);
        setTotal(d.total || 0);
        setTotalPages(d.totalPages || 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page, statusFilter, search]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  async function updateLead(id: number, updates: { status?: string; notes?: string }) {
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers,
      body: JSON.stringify({ id, ...updates }),
    });
    fetchLeads();
    if (selected?.id === id) {
      setSelected((prev) => prev ? { ...prev, ...updates } : null);
    }
  }

  function exportCSV() {
    if (leads.length === 0) return;
    const rows = [["Name", "Email", "Company", "Phone", "Service", "Budget", "Status", "Date", "Message"]];
    for (const l of leads) {
      rows.push([l.name, l.email, l.company || "", l.phone || "", l.service || "", l.budget || "", l.status, new Date(l.created_at).toLocaleDateString(), (l.message || "").replace(/"/g, '""')]);
    }
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const statusCounts = leads.reduce((acc, l) => { acc[l.status] = (acc[l.status] || 0) + 1; return acc; }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Lead Stats */}
      {total > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Leads", value: total, bg: "bg-black text-white" },
            { label: "New", value: statusCounts["new"] || 0, bg: "bg-gray-50" },
            { label: "Contacted", value: statusCounts["contacted"] || 0, bg: "bg-gray-50" },
            { label: "Converted", value: statusCounts["converted"] || 0, bg: "bg-gray-50" },
          ].map((s) => (
            <div key={s.label} className={`p-4 border border-gray-200 ${s.bg}`}>
              <div className="text-2xl font-extrabold">{s.value}</div>
              <div className="text-sm text-current opacity-60">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl font-extrabold text-black">Leads ({total})</h2>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={exportCSV}
            disabled={leads.length === 0}
            className="border border-gray-300 px-3 py-2 text-sm font-bold hover:bg-gray-50 disabled:opacity-30"
          >
            Export CSV
          </button>
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="border border-gray-300 px-3 py-2 text-sm w-48"
          />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="border border-gray-300 px-3 py-2 text-sm bg-white"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-base text-gray-500 py-12 text-center">Loading leads...</div>
      ) : (
        <>
          <div className="bg-white border border-gray-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-bold text-black">Name</th>
                  <th className="text-left py-3 px-4 font-bold text-black">Email</th>
                  <th className="text-left py-3 px-4 font-bold text-black hidden md:table-cell">Company</th>
                  <th className="text-left py-3 px-4 font-bold text-black hidden lg:table-cell">Service</th>
                  <th className="text-left py-3 px-4 font-bold text-black">Status</th>
                  <th className="text-left py-3 px-4 font-bold text-black hidden lg:table-cell">Date</th>
                  <th className="text-left py-3 px-4 font-bold text-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700 font-medium">{lead.name}</td>
                    <td className="py-3 px-4 text-gray-500">{lead.email}</td>
                    <td className="py-3 px-4 text-gray-500 hidden md:table-cell">{lead.company || "—"}</td>
                    <td className="py-3 px-4 text-gray-500 hidden lg:table-cell">{lead.service || "—"}</td>
                    <td className="py-3 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLead(lead.id, { status: e.target.value })}
                        className="text-xs font-bold px-2 py-1 border border-gray-200 bg-white"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-gray-500 hidden lg:table-cell">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setSelected(lead)}
                        className="text-sm font-bold text-black hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr><td colSpan={7} className="py-12 text-center text-gray-400">No leads found</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm border border-gray-200 disabled:opacity-30 hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm border border-gray-200 disabled:opacity-30 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Lead detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-white max-w-lg w-full max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-extrabold text-black">{selected.name}</h3>
              <button onClick={() => setSelected(null)} className="text-2xl text-gray-400 hover:text-black">×</button>
            </div>
            <div className="space-y-4 text-sm">
              <div><span className="font-bold text-black">Email:</span> <a href={`mailto:${selected.email}`} className="text-blue-600 hover:underline">{selected.email}</a></div>
              {selected.phone && <div><span className="font-bold text-black">Phone:</span> {selected.phone}</div>}
              {selected.company && <div><span className="font-bold text-black">Company:</span> {selected.company}</div>}
              {selected.service && <div><span className="font-bold text-black">Service:</span> {selected.service}</div>}
              {selected.budget && <div><span className="font-bold text-black">Budget:</span> {selected.budget}</div>}
              <div>
                <span className="font-bold text-black">Message:</span>
                <p className="mt-1 text-gray-600 whitespace-pre-wrap bg-gray-50 p-3">{selected.message}</p>
              </div>
              <div><span className="font-bold text-black">Submitted:</span> {new Date(selected.submitted_at).toLocaleString()}</div>
              <div>
                <span className="font-bold text-black">Status:</span>
                <select
                  value={selected.status}
                  onChange={(e) => updateLead(selected.id, { status: e.target.value })}
                  className="ml-2 border border-gray-200 px-2 py-1 text-sm bg-white"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="converted">Converted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div>
                <span className="font-bold text-black block mb-1">Notes:</span>
                <textarea
                  defaultValue={selected.notes}
                  onBlur={(e) => updateLead(selected.id, { notes: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-200 px-3 py-2 text-sm resize-y"
                  placeholder="Add notes about this lead..."
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
