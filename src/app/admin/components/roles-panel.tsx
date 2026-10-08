"use client";
import { useEffect, useState } from "react";
import { Shield, Plus, Pencil, Trash2, X } from "lucide-react";

const MODULE_KEYS = ["dashboard", "crm", "content", "finance", "seo", "admin"] as const;
const MODULE_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  crm: "CRM",
  content: "Content",
  finance: "Finance",
  seo: "SEO",
  admin: "Admin",
};
const PERM_LEVELS = ["none", "read", "write", "full"] as const;
const PERM_COLORS: Record<string, string> = {
  none: "bg-zinc-100 text-zinc-400",
  read: "bg-blue-50 text-blue-700",
  write: "bg-amber-50 text-amber-700",
  full: "bg-emerald-50 text-emerald-700",
};

type Permissions = Record<string, string>;
type Role = { id: string; name: string; slug: string; is_system: boolean; permissions: Permissions };

export function RolesPanel({ headers }: { headers: Record<string, string> }) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Role | null>(null);
  const [creating, setCreating] = useState(false);
  const [formName, setFormName] = useState("");
  const [formPerms, setFormPerms] = useState<Permissions>(() =>
    Object.fromEntries(MODULE_KEYS.map((k) => [k, "none"]))
  );
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  async function loadRoles() {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/roles", { headers, cache: "no-store" });
      const d = await r.json();
      if (r.ok) setRoles(d.roles || []);
      else setError(d.error || "Could not load roles");
    } catch {
      setError("Could not load roles");
    }
    setLoading(false);
  }

  useEffect(() => { loadRoles(); }, []);

  function openCreate() {
    setEditing(null);
    setCreating(true);
    setFormName("");
    setFormPerms(Object.fromEntries(MODULE_KEYS.map((k) => [k, "none"])));
    setFormError("");
  }

  function openEdit(role: Role) {
    setCreating(false);
    setEditing(role);
    setFormName(role.name);
    setFormPerms({ ...role.permissions });
    setFormError("");
  }

  function closeForm() {
    setCreating(false);
    setEditing(null);
    setFormError("");
  }

  async function saveRole() {
    setSaving(true);
    setFormError("");
    try {
      if (creating) {
        const r = await fetch("/api/admin/roles", {
          method: "POST",
          headers,
          body: JSON.stringify({ name: formName, permissions: formPerms }),
        });
        const d = await r.json();
        if (!r.ok) { setFormError(d.error || "Could not create role"); setSaving(false); return; }
      } else if (editing) {
        const r = await fetch("/api/admin/roles", {
          method: "PUT",
          headers,
          body: JSON.stringify({ slug: editing.slug, name: formName, permissions: formPerms }),
        });
        const d = await r.json();
        if (!r.ok) { setFormError(d.error || "Could not update role"); setSaving(false); return; }
      }
      closeForm();
      await loadRoles();
    } catch {
      setFormError("Network error");
    }
    setSaving(false);
  }

  async function deleteRole(role: Role) {
    if (!confirm(`Delete the "${role.name}" role? This cannot be undone.`)) return;
    try {
      const r = await fetch("/api/admin/roles", {
        method: "DELETE",
        headers,
        body: JSON.stringify({ slug: role.slug }),
      });
      const d = await r.json();
      if (!r.ok) { alert(d.error || "Could not delete role"); return; }
      await loadRoles();
    } catch {
      alert("Network error");
    }
  }

  const showForm = creating || editing !== null;

  return (
    <div className="max-w-5xl space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-zinc-400">Access control</p>
          <h2 className="mt-1 text-3xl font-black tracking-tight">Roles & Permissions</h2>
          <p className="mt-2 text-sm text-gray-500">
            Define what each role can see and do across the dashboard.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-bold text-white hover:bg-zinc-800 transition"
        >
          <Plus size={16} /> New Role
        </button>
      </div>

      {loading && <p className="text-sm text-zinc-400">Loading roles...</p>}
      {error && <p className="text-sm font-semibold text-red-700">{error}</p>}

      {/* Role cards */}
      {!loading && (
        <div className="space-y-4">
          {roles.map((role) => (
            <div
              key={role.id}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-zinc-100 grid place-items-center">
                    <Shield size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold">{role.name}</h3>
                      {role.is_system && (
                        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-zinc-500">
                          System
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400">{role.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(role)}
                    className="rounded-lg border border-gray-200 p-2 text-zinc-500 hover:text-black hover:border-black transition"
                    title="Edit permissions"
                  >
                    <Pencil size={14} />
                  </button>
                  {!role.is_system && (
                    <button
                      onClick={() => deleteRole(role)}
                      className="rounded-lg border border-gray-200 p-2 text-zinc-500 hover:text-red-600 hover:border-red-300 transition"
                      title="Delete role"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {MODULE_KEYS.map((mod) => (
                  <div key={mod} className="text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-zinc-400 mb-1">
                      {MODULE_LABELS[mod]}
                    </p>
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${PERM_COLORS[role.permissions[mod]] || PERM_COLORS.none}`}
                    >
                      {role.permissions[mod] || "none"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit modal overlay */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl mx-4">
            <button
              onClick={closeForm}
              className="absolute right-4 top-4 p-1 text-zinc-400 hover:text-black"
            >
              <X size={18} />
            </button>
            <h3 className="text-xl font-black mb-1">
              {creating ? "Create new role" : `Edit "${editing?.name}"`}
            </h3>
            <p className="text-sm text-zinc-400 mb-5">
              Set the access level for each module.
            </p>

            {(!editing?.is_system || creating) && (
              <div className="mb-5">
                <label className="mb-1 block text-sm font-bold">Role name</label>
                <input
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Content Editor"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm"
                  required
                />
              </div>
            )}

            <div className="space-y-3 mb-5">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">
                Permission matrix
              </p>
              {MODULE_KEYS.map((mod) => (
                <div key={mod} className="flex items-center justify-between">
                  <span className="text-sm font-semibold w-24">{MODULE_LABELS[mod]}</span>
                  <div className="flex gap-1">
                    {PERM_LEVELS.map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setFormPerms((p) => ({ ...p, [mod]: level }))}
                        className={`rounded-lg px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide transition ${
                          formPerms[mod] === level
                            ? "bg-black text-white"
                            : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {formError && (
              <p className="mb-3 text-sm font-semibold text-red-700">{formError}</p>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={closeForm}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-zinc-500 hover:text-black transition"
              >
                Cancel
              </button>
              <button
                onClick={saveRole}
                disabled={saving || (!formName.trim() && !editing?.is_system)}
                className="rounded-xl bg-black px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
              >
                {saving ? "Saving..." : creating ? "Create role" : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
