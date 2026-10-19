"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CAREER_ROLES, CAREER_STATUSES } from "@/lib/careers";

type Application = {
  id: string;
  cvId: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  role: string;
  link?: string;
  note?: string;
  cvFilename: string;
  cvSize: number;
  status: string;
  internalNotes?: string;
  createdAt: string;
};

const STATUS_STYLE: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  reviewed: "bg-gray-200 text-gray-800",
  shortlisted: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-800",
};

function formatSize(bytes: number) {
  return bytes >= 1024 * 1024 ? (bytes / 1024 / 1024).toFixed(1) + " MB" : Math.max(1, Math.round(bytes / 1024)) + " KB";
}

export function CareersPanel({ headers }: { headers: Record<string, string> }) {
  const [items, setItems] = useState<Application[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Application | null>(null);
  const [notes, setNotes] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<Application | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    if (statusFilter) params.set("status", statusFilter);
    if (roleFilter) params.set("role", roleFilter);
    if (search) params.set("search", search);
    try {
      const response = await fetch("/api/admin/careers?" + params.toString(), { headers, cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Could not load applications.");
        setItems([]);
        return;
      }
      setItems(data.applications || []);
      setTotal(data.total || 0);
      setCounts(data.counts || {});
      setTotalPages(data.totalPages || 1);
    } catch {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  }, [headers, page, roleFilter, search, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(load, search ? 250 : 0);
    return () => clearTimeout(timer);
  }, [load, search]);

  async function update(id: string, updates: { status?: string; internalNotes?: string }) {
    const response = await fetch("/api/admin/careers", { method: "PATCH", headers, body: JSON.stringify({ id, ...updates }) });
    if (!response.ok) {
      setError("Could not save that change.");
      return;
    }
    setItems((list) => list.map((item) => (item.id === id ? { ...item, ...updates } : item)));
    setSelected((current) => (current && current.id === id ? { ...current, ...updates } : current));
    if (updates.status) load();
  }

  async function remove(application: Application) {
    setBusy(true);
    try {
      const response = await fetch("/api/admin/careers?id=" + encodeURIComponent(application.id), { method: "DELETE", headers });
      if (!response.ok) {
        setError("Could not delete that application.");
        return;
      }
      setConfirmDelete(null);
      setSelected(null);
      load();
    } finally {
      setBusy(false);
    }
  }

  const summary = useMemo(() => {
    const all = Object.values(counts).reduce((sum, value) => sum + value, 0);
    return [
      { label: "All applications", value: all },
      ...CAREER_STATUSES.map((status) => ({ label: status[0].toUpperCase() + status.slice(1), value: counts[status] || 0 })),
    ];
  }, [counts]);

  function open(application: Application) {
    setSelected(application);
    setNotes(application.internalNotes || "");
  }

  const cvHref = (application: Application) => "/api/admin/careers/cv?id=" + encodeURIComponent(application.cvId);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <p className="text-sm font-bold text-black">Careers: applications and CV bank</p>
        <p className="mt-1 text-sm text-gray-500">
          Applications from the Careers page. No emails are sent for them. CVs are stored privately in the database and can only be opened by admins. Applications stay until you delete them.
        </p>
      </div>

      {error ? <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div> : null}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {summary.map((item, index) => (
          <div key={item.label} className={"rounded-xl border border-gray-200 p-4 " + (index === 0 ? "bg-black text-white" : "bg-white")}>
            <div className="text-2xl font-extrabold">{item.value}</div>
            <div className="mt-1 text-sm opacity-60">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-black">CV bank</h2>
          <p className="text-sm text-gray-500">{total} matching application{total === 1 ? "" : "s"}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <input type="search" aria-label="Search applications" placeholder="Search name, email, phone, file..." value={search}
            onChange={(event) => { setSearch(event.target.value); setPage(1); }} className="min-w-56 rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          <select aria-label="Filter by status" value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(1); }} className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
            <option value="">All statuses</option>
            {CAREER_STATUSES.map((status) => <option key={status} value={status}>{status[0].toUpperCase() + status.slice(1)}</option>)}
          </select>
          <select aria-label="Filter by area" value={roleFilter} onChange={(event) => { setRoleFilter(event.target.value); setPage(1); }} className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
            <option value="">All areas</option>
            {CAREER_ROLES.map((role) => <option key={role} value={role}>{role}</option>)}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr><th className="px-4 py-3">Applicant</th><th className="px-4 py-3">Area</th><th className="px-4 py-3">Applied</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">CV</th><th className="px-4 py-3" /></tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={6} className="px-4 py-10 text-center text-gray-500">Loading…</td></tr> : null}
            {!loading && !items.length ? <tr><td colSpan={6} className="px-4 py-10 text-center text-gray-500">No applications yet.</td></tr> : null}
            {items.map((application) => (
              <tr key={application.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <button onClick={() => open(application)} className="text-left font-bold text-black hover:underline">{application.name}</button>
                  <div className="text-gray-500">{application.email}</div>
                </td>
                <td className="px-4 py-3">{application.role}</td>
                <td className="px-4 py-3 whitespace-nowrap">{new Date(application.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <select aria-label={"Status for " + application.name} value={application.status} onChange={(event) => update(application.id, { status: event.target.value })}
                    className={"rounded-full px-3 py-1 text-xs font-bold " + (STATUS_STYLE[application.status] || "bg-gray-100")}>
                    {CAREER_STATUSES.map((status) => <option key={status} value={status}>{status[0].toUpperCase() + status.slice(1)}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <a href={cvHref(application)} className="font-bold underline" download>Download</a>
                  <span className="ml-2 text-gray-500">{formatSize(application.cvSize)}</span>
                </td>
                <td className="px-4 py-3 text-right"><button onClick={() => open(application)} className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-bold hover:bg-gray-50">Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 ? (
        <div className="flex items-center justify-between text-sm">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="rounded-lg border border-gray-300 px-4 py-2 font-bold disabled:opacity-30">Previous</button>
          <span className="text-gray-500">Page {page} of {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="rounded-lg border border-gray-300 px-4 py-2 font-bold disabled:opacity-30">Next</button>
        </div>
      ) : null}

      {selected ? (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label={"Application from " + selected.name}>
          <button className="absolute inset-0 bg-black/40" aria-label="Close details" onClick={() => setSelected(null)} />
          <div className="relative h-full w-full max-w-lg overflow-y-auto bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-black">{selected.name}</h3>
                <p className="text-sm text-gray-500">{selected.role} · applied {new Date(selected.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelected(null)} className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-bold">Close</button>
            </div>

            <dl className="mt-6 space-y-3 text-sm">
              <div><dt className="font-bold text-gray-500">Email</dt><dd><a className="underline" href={"mailto:" + selected.email}>{selected.email}</a></dd></div>
              <div><dt className="font-bold text-gray-500">Phone / WhatsApp</dt><dd>{selected.phone || "—"}</dd></div>
              <div><dt className="font-bold text-gray-500">Location</dt><dd>{selected.location || "—"}</dd></div>
              <div><dt className="font-bold text-gray-500">Link</dt><dd>{selected.link ? <a className="underline break-all" href={selected.link} target="_blank" rel="noopener noreferrer nofollow">{selected.link}</a> : "—"}</dd></div>
              <div><dt className="font-bold text-gray-500">Note from applicant</dt><dd className="whitespace-pre-wrap">{selected.note || "—"}</dd></div>
              <div><dt className="font-bold text-gray-500">CV</dt><dd><a className="font-bold underline" href={cvHref(selected)} download>{selected.cvFilename}</a> <span className="text-gray-500">({formatSize(selected.cvSize)})</span></dd></div>
            </dl>

            <div className="mt-6">
              <label htmlFor="career-status" className="text-sm font-bold text-gray-500">Status</label>
              <select id="career-status" value={selected.status} onChange={(event) => update(selected.id, { status: event.target.value })} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
                {CAREER_STATUSES.map((status) => <option key={status} value={status}>{status[0].toUpperCase() + status.slice(1)}</option>)}
              </select>
            </div>

            <div className="mt-4">
              <label htmlFor="career-notes" className="text-sm font-bold text-gray-500">Internal notes</label>
              <textarea id="career-notes" rows={5} maxLength={4000} value={notes} onChange={(event) => setNotes(event.target.value)} className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              <button onClick={() => update(selected.id, { internalNotes: notes })} className="mt-2 rounded-lg bg-black px-4 py-2 text-sm font-bold text-white">Save notes</button>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <button onClick={() => setConfirmDelete(selected)} className="rounded-lg border border-red-300 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-50">Delete application and CV</button>
            </div>
          </div>
        </div>
      ) : null}

      {confirmDelete ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="alertdialog" aria-modal="true" aria-label="Confirm delete">
          <button className="absolute inset-0 bg-black/50" aria-label="Cancel" onClick={() => setConfirmDelete(null)} />
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-extrabold text-black">Delete this application?</h3>
            <p className="mt-2 text-sm text-gray-600">This permanently deletes {confirmDelete.name}&apos;s application and their stored CV. It cannot be undone.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setConfirmDelete(null)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-bold">Cancel</button>
              <button disabled={busy} onClick={() => remove(confirmDelete)} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50">{busy ? "Deleting…" : "Delete permanently"}</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
