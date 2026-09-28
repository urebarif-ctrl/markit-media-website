"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Brief = {
  id: string;
  brandName: string;
  link?: string;
  stage: string;
  launchDate?: string;
  launchTbd?: boolean;
  categories?: string[];
  description?: string;
  positioning?: string;
  audiences?: string[];
  markets?: string[];
  city?: string;
  assets?: string[];
  needs?: string[];
  platforms?: string[];
  paidAds?: string;
  adBudget?: string;
  goals?: string[];
  notes?: string;
  referenceBrand?: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  communication?: string;
  status: string;
  internalNotes?: string;
  createdAt: string;
};

const statusOptions = ["new", "reviewing", "qualified", "scheduled", "proposal", "won", "closed"];

function LabelList({ values }: { values?: string[] }) {
  if (!values?.length) return <span className="text-gray-400">—</span>;
  return (
    <div className="flex flex-wrap gap-2">
      {values.map((value) => (
        <span key={value} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
          {value}
        </span>
      ))}
    </div>
  );
}

export function DiscoveryPanel({ headers }: { headers: Record<string, string> }) {
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [total, setTotal] = useState(0);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [databaseError, setDatabaseError] = useState("");
  const [selected, setSelected] = useState<Brief | null>(null);

  const fetchBriefs = useCallback(async () => {
    setLoading(true);
    setDatabaseError("");
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    if (statusFilter) params.set("status", statusFilter);
    if (search) params.set("search", search);

    try {
      const response = await fetch("/api/admin/discovery?" + params.toString(), { headers });
      const data = await response.json();
      if (!response.ok) {
        setDatabaseError(data.error || "Database unavailable");
        setBriefs([]);
        return;
      }
      setBriefs(data.briefs || []);
      setTotal(data.total || 0);
      setCounts(data.counts || {});
      setTotalPages(data.totalPages || 1);
    } catch {
      setDatabaseError("Could not connect to the discovery database.");
    } finally {
      setLoading(false);
    }
  }, [headers, page, search, statusFilter]);

  useEffect(() => {
    fetchBriefs();
  }, [fetchBriefs]);

  async function updateBrief(id: string, updates: { status?: string; internalNotes?: string }) {
    const response = await fetch("/api/admin/discovery", {
      method: "PATCH",
      headers,
      body: JSON.stringify({ id, ...updates }),
    });
    if (!response.ok) return;

    setBriefs((items) => items.map((item) => item.id === id ? { ...item, ...updates } : item));
    if (selected?.id === id) {
      setSelected((current) => current ? { ...current, ...updates } : current);
    }
  }

  const summary = useMemo(() => [
    { label: "All Briefs", value: Object.values(counts).reduce((sum, value) => sum + value, 0) || total },
    { label: "New", value: counts.new || 0 },
    { label: "Qualified", value: counts.qualified || 0 },
    { label: "Won", value: counts.won || 0 },
  ], [counts, total]);

  function exportCSV() {
    if (!briefs.length) return;
    const rows = [["Brand", "Contact", "Email", "Company", "Stage", "Markets", "Needs", "Goals", "Status", "Submitted"]];

    briefs.forEach((brief) => rows.push([
      brief.brandName,
      brief.name,
      brief.email,
      brief.company,
      brief.stage,
      (brief.markets || []).join(" | "),
      (brief.needs || []).join(" | "),
      (brief.goals || []).join(" | "),
      brief.status,
      new Date(brief.createdAt).toISOString(),
    ]));

    const csv = rows
      .map((row) => row.map((cell) => '"' + String(cell || "").replace(/"/g, '""') + '"').join(","))
      .join("\n");

    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "discovery-briefs-" + new Date().toISOString().slice(0, 10) + ".csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className={"h-2.5 w-2.5 rounded-full " + (databaseError ? "bg-red-500" : "bg-emerald-500")} />
            <p className="text-sm font-bold text-black">MongoDB Discovery Database</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            The database is the source of truth. Discovery submissions do not depend on email or Google Sheets.
          </p>
        </div>
        <button
          onClick={exportCSV}
          disabled={!briefs.length}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-bold hover:bg-gray-50 disabled:opacity-30"
        >
          Export CSV
        </button>
      </div>

      {databaseError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          {databaseError}. Check the production MONGODB_URI configuration in Vercel.
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {summary.map((item, index) => (
          <div
            key={item.label}
            className={"rounded-xl border border-gray-200 p-4 " + (index === 0 ? "bg-black text-white" : "bg-white")}
          >
            <div className="text-2xl font-extrabold">{item.value}</div>
            <div className="mt-1 text-sm opacity-60">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-black">Discovery Briefs</h2>
          <p className="text-sm text-gray-500">{total} matching record{total === 1 ? "" : "s"}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            type="search"
            placeholder="Search brand, name, email..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            className="min-w-56 rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
          <select
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
          >
            <option value="">All statuses</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status[0].toUpperCase() + status.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left font-bold">Brand</th>
              <th className="px-4 py-3 text-left font-bold">Contact</th>
              <th className="hidden px-4 py-3 text-left font-bold md:table-cell">Stage</th>
              <th className="hidden px-4 py-3 text-left font-bold lg:table-cell">Markets</th>
              <th className="px-4 py-3 text-left font-bold">Status</th>
              <th className="hidden px-4 py-3 text-left font-bold lg:table-cell">Submitted</th>
              <th className="px-4 py-3 text-left font-bold">View</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-400">Loading database...</td></tr>
            ) : briefs.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-400">No discovery briefs found</td></tr>
            ) : briefs.map((brief) => (
              <tr key={brief.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-bold text-black">{brief.brandName}</p>
                  <p className="text-xs text-gray-400">{brief.company}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-700">{brief.name}</p>
                  <p className="text-xs text-gray-400">{brief.email}</p>
                </td>
                <td className="hidden px-4 py-3 text-gray-600 md:table-cell">{brief.stage}</td>
                <td className="hidden px-4 py-3 text-gray-600 lg:table-cell">{(brief.markets || []).slice(0, 2).join(", ") || "—"}</td>
                <td className="px-4 py-3">
                  <select
                    value={brief.status || "new"}
                    onChange={(event) => updateBrief(brief.id, { status: event.target.value })}
                    className="rounded-md border border-gray-200 bg-white px-2 py-1 text-xs font-bold"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status[0].toUpperCase() + status.slice(1)}</option>
                    ))}
                  </select>
                </td>
                <td className="hidden px-4 py-3 text-gray-500 lg:table-cell">
                  {new Date(brief.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => setSelected(brief)} className="font-bold text-black hover:underline">Open</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 ? (
        <div className="flex items-center justify-center gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm disabled:opacity-30"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm disabled:opacity-30"
          >
            Next
          </button>
        </div>
      ) : null}

      {selected ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4" onClick={() => setSelected(null)}>
          <div
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400">Discovery Brief</p>
                <h3 className="mt-1 text-2xl font-extrabold text-black">{selected.brandName}</h3>
                <p className="mt-1 text-sm text-gray-500">{selected.name} · {selected.company} · {selected.email}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-2xl text-gray-400 hover:text-black">×</button>
            </div>

            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div><p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400">Stage</p><p className="font-semibold">{selected.stage}</p></div>
              <div><p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400">Positioning</p><p className="font-semibold">{selected.positioning || "—"}</p></div>
              <div><p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400">Categories</p><LabelList values={selected.categories} /></div>
              <div><p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400">Audience</p><LabelList values={selected.audiences} /></div>
              <div><p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400">Markets</p><LabelList values={selected.markets} /></div>
              <div><p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400">Existing assets</p><LabelList values={selected.assets} /></div>
              <div><p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400">Support needed</p><LabelList values={selected.needs} /></div>
              <div><p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400">Platforms</p><LabelList values={selected.platforms} /></div>
              <div><p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400">90-day goals</p><LabelList values={selected.goals} /></div>
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400">Paid ads</p>
                <p className="font-semibold">{selected.paidAds || "—"}{selected.adBudget ? " · " + selected.adBudget : ""}</p>
              </div>
            </div>

            {selected.description ? (
              <div className="mt-6 rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Brand description</p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-gray-700">{selected.description}</p>
              </div>
            ) : null}

            {selected.notes ? (
              <div className="mt-4 rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Before we meet</p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-gray-700">{selected.notes}</p>
              </div>
            ) : null}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {selected.link ? (
                <a href={selected.link} target="_blank" rel="noreferrer" className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold hover:border-black">
                  Open website / social ↗
                </a>
              ) : null}
              {selected.phone ? (
                <a
                  href={"https://wa.me/" + selected.phone.replace(/[^0-9]/g, "")}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold hover:border-black"
                >
                  WhatsApp contact ↗
                </a>
              ) : null}
            </div>

            <div className="mt-7">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-400" htmlFor="internalNotes">
                Internal notes
              </label>
              <textarea
                id="internalNotes"
                rows={4}
                defaultValue={selected.internalNotes || ""}
                onBlur={(event) => updateBrief(selected.id, { internalNotes: event.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
                placeholder="Add private notes for the discovery call..."
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
