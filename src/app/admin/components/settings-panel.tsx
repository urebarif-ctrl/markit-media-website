"use client";
import { useEffect, useState, type FormEvent } from "react";
import { Bell, Eye, EyeOff, Pencil, ShieldCheck, Trash2, UserPlus, Users, X, Check } from "lucide-react";

type TeamUser = { id: string; name: string; email: string; role: string; createdAt?: string };
type RoleOption = { slug: string; name: string; is_system: boolean };

export function SettingsPanel({ headers, email, onSaved }: { headers: Record<string, string>; email: string; onSaved: () => void }) {
  /* ── Your Account ── */
  const [newEmail, setNewEmail] = useState(email);
  const [emailCurrentPw, setEmailCurrentPw] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

  /* ── Users ── */
  const [users, setUsers] = useState<TeamUser[]>([]);
  const [userError, setUserError] = useState("");
  const [invite, setInvite] = useState({ name: "", email: "", password: "", role: "manager" });
  const [showInvitePw, setShowInvitePw] = useState(false);
  const [availableRoles, setAvailableRoles] = useState<RoleOption[]>([]);

  /* ── Inline editing ── */
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFields, setEditFields] = useState({ name: "", email: "", role: "" });
  const [editError, setEditError] = useState("");

  /* ── Delete confirmation ── */
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState("");

  /* ── Notifications ── */
  const [webhook, setWebhook] = useState({ slackWebhookUrl: "", emailDigest: false, digestEmail: "", digestFrequency: "daily" as "daily" | "weekly", enabled: false });
  const [webhookMsg, setWebhookMsg] = useState("");
  const [digestTesting, setDigestTesting] = useState(false);
  const [digestResult, setDigestResult] = useState("");
  const [webhookLoading, setWebhookLoading] = useState(false);

  /* ── Loaders ── */
  async function loadWebhook() {
    try { const r = await fetch("/api/admin/webhooks", { headers, cache: "no-store" }); if (r.ok) { const d = await r.json(); setWebhook(d); } } catch { /* ignore */ }
  }
  async function loadUsers() {
    const r = await fetch("/api/admin/users", { headers, cache: "no-store" });
    const d = await r.json();
    if (r.ok) setUsers(d.users || []);
  }
  async function loadRoles() {
    try {
      const r = await fetch("/api/admin/roles", { headers, cache: "no-store" });
      if (r.ok) { const d = await r.json(); setAvailableRoles((d.roles || []).map((r: any) => ({ slug: r.slug, name: r.name, is_system: r.is_system }))); }
    } catch { /* ignore */ }
  }
  useEffect(() => { loadUsers(); loadWebhook(); loadRoles(); }, []);

  /* ── Account: change email ── */
  async function submitEmail(e: FormEvent) {
    e.preventDefault();
    setEmailLoading(true); setEmailMsg("");
    const r = await fetch("/api/admin/settings", { method: "PATCH", headers, body: JSON.stringify({ email: newEmail, currentPassword: emailCurrentPw }) });
    const d = await r.json(); setEmailLoading(false);
    if (!r.ok) { setEmailMsg(d.error || "Could not update email"); return; }
    setEmailMsg("Email updated. Please sign in again.");
    setEmailCurrentPw("");
    setTimeout(onSaved, 1200);
  }

  /* ── Account: change password ── */
  async function submitPassword(e: FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) { setPwMsg("Passwords do not match."); return; }
    setPwLoading(true); setPwMsg("");
    const r = await fetch("/api/admin/settings", { method: "PATCH", headers, body: JSON.stringify({ currentPassword, newPassword }) });
    const d = await r.json(); setPwLoading(false);
    if (!r.ok) { setPwMsg(d.error || "Could not update password"); return; }
    setPwMsg("Password updated. Please sign in again.");
    setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    setTimeout(onSaved, 1200);
  }

  /* ── Webhook ── */
  async function saveWebhook(e: FormEvent) {
    e.preventDefault(); setWebhookLoading(true); setWebhookMsg("");
    const r = await fetch("/api/admin/webhooks", { method: "POST", headers, body: JSON.stringify(webhook) });
    const d = await r.json(); setWebhookLoading(false);
    setWebhookMsg(r.ok ? "Notification settings saved." : d.error || "Could not save notification settings");
  }

  /* ── Add user ── */
  async function addUser(e: FormEvent) {
    e.preventDefault(); setUserError("");
    const r = await fetch("/api/admin/users", { method: "POST", headers, body: JSON.stringify(invite) });
    const d = await r.json();
    if (!r.ok) { setUserError(d.error || "Could not add user"); return; }
    setInvite({ name: "", email: "", password: "", role: "manager" });
    await loadUsers();
  }

  /* ── Edit user (inline) ── */
  function startEdit(u: TeamUser) {
    setEditingId(u.id);
    setEditFields({ name: u.name, email: u.email, role: u.role });
    setEditError("");
  }
  function cancelEdit() { setEditingId(null); setEditError(""); }
  async function saveEdit() {
    if (!editingId) return;
    setEditError("");
    const body: Record<string, string> = { id: editingId };
    const orig = users.find(u => u.id === editingId);
    if (!orig) return;
    if (editFields.name !== orig.name) body.name = editFields.name;
    if (editFields.email !== orig.email) body.email = editFields.email;
    if (editFields.role !== orig.role) body.role = editFields.role;
    if (Object.keys(body).length <= 1) { cancelEdit(); return; }
    const r = await fetch("/api/admin/users", { method: "PATCH", headers, body: JSON.stringify(body) });
    const d = await r.json();
    if (!r.ok) { setEditError(d.error || "Could not update user"); return; }
    setEditingId(null);
    await loadUsers();
  }

  /* ── Delete user ── */
  async function confirmDelete() {
    if (!deletingId) return;
    setDeleteError("");
    const r = await fetch("/api/admin/users", { method: "DELETE", headers, body: JSON.stringify({ id: deletingId }) });
    const d = await r.json();
    if (!r.ok) { setDeleteError(d.error || "Could not delete user"); return; }
    setDeletingId(null);
    await loadUsers();
  }

  /* ── Password strength indicator ── */
  function pwStrength(pw: string): { label: string; color: string } {
    if (pw.length === 0) return { label: "", color: "" };
    if (pw.length < 12) return { label: "Weak", color: "text-red-600" };
    if (pw.length < 16) return { label: "OK", color: "text-yellow-600" };
    return { label: "Strong", color: "text-green-600" };
  }

  /* ── Role badge color ── */
  function roleBadge(role: string) {
    if (role === "master_admin") return "bg-black text-white";
    if (role === "admin") return "bg-zinc-800 text-white";
    return "bg-zinc-100 text-zinc-700 border border-zinc-200";
  }

  const currentUserId = users.find(u => u.email === email)?.id;

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[.2em] text-zinc-400">Security & access</p>
        <h2 className="mt-1 text-3xl font-black tracking-tight">Dashboard settings</h2>
        <p className="mt-2 text-sm text-gray-500">Manage your own credentials and the people who can access this private workspace.</p>
      </div>

      {/* ══════════════════════ YOUR ACCOUNT ══════════════════════ */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* ── Change Email ── */}
        <form onSubmit={submitEmail} className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-black text-white grid place-items-center"><ShieldCheck size={18} /></div>
            <div><h3 className="font-extrabold">Change email</h3><p className="text-xs text-gray-400">Update the email address on your account</p></div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold">Current email</label>
            <input type="email" value={email} disabled className="w-full rounded-lg border border-gray-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-500 cursor-not-allowed" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold">New email</label>
            <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm" required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold">Current password <span className="font-normal text-gray-400">(to confirm)</span></label>
            <input type="password" value={emailCurrentPw} onChange={e => setEmailCurrentPw(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm" required />
          </div>
          {emailMsg && <p className={`text-sm font-semibold ${emailMsg.includes("updated") ? "text-green-700" : "text-red-700"}`}>{emailMsg}</p>}
          <button disabled={emailLoading} className="rounded-lg bg-black px-5 py-3 text-sm font-bold text-white disabled:opacity-50">{emailLoading ? "Saving..." : "Update email"}</button>
        </form>

        {/* ── Change Password ── */}
        <form onSubmit={submitPassword} className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-black text-white grid place-items-center"><ShieldCheck size={18} /></div>
            <div><h3 className="font-extrabold">Change password</h3><p className="text-xs text-gray-400">Use a strong password with 12+ characters</p></div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold">Current password</label>
            <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm" required />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold">New password</label>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} minLength={12} className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm" required />
            {newPassword && <p className={`mt-1 text-xs font-semibold ${pwStrength(newPassword).color}`}>{pwStrength(newPassword).label}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold">Confirm new password</label>
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} minLength={12} className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm" required />
            {confirmPassword && confirmPassword !== newPassword && <p className="mt-1 text-xs font-semibold text-red-600">Passwords do not match</p>}
          </div>
          {pwMsg && <p className={`text-sm font-semibold ${pwMsg.includes("updated") ? "text-green-700" : "text-red-700"}`}>{pwMsg}</p>}
          <button disabled={pwLoading} className="rounded-lg bg-black px-5 py-3 text-sm font-bold text-white disabled:opacity-50">{pwLoading ? "Saving..." : "Update password"}</button>
        </form>
      </div>

      {/* ══════════════════════ DASHBOARD USERS ══════════════════════ */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-zinc-100 grid place-items-center"><Users size={18} /></div>
          <div><h3 className="font-extrabold">Dashboard users</h3><p className="text-xs text-gray-400">{users.length} authorized account{users.length === 1 ? "" : "s"}</p></div>
        </div>

        {/* Delete confirmation dialog */}
        {deletingId && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-bold text-red-800">Delete user?</p>
            <p className="text-sm text-red-700 mt-1">This action cannot be undone. The user &quot;{users.find(u => u.id === deletingId)?.name}&quot; will lose all dashboard access.</p>
            {deleteError && <p className="text-sm font-semibold text-red-700 mt-2">{deleteError}</p>}
            <div className="mt-3 flex gap-2">
              <button onClick={confirmDelete} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700">Delete</button>
              <button onClick={() => { setDeletingId(null); setDeleteError(""); }} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-bold hover:bg-zinc-50">Cancel</button>
            </div>
          </div>
        )}

        {/* User table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 text-left text-xs font-bold uppercase tracking-wide text-zinc-400">
                <th className="pb-3 pr-4">Name</th>
                <th className="pb-3 pr-4">Email</th>
                <th className="pb-3 pr-4">Role</th>
                <th className="pb-3 pr-4">Added</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => {
                const isEditing = editingId === u.id;
                const isYou = u.id === currentUserId;
                return (
                  <tr key={u.id} className="border-b border-zinc-50 last:border-0">
                    {isEditing ? (
                      <>
                        <td className="py-3 pr-4">
                          <input value={editFields.name} onChange={e => setEditFields({ ...editFields, name: e.target.value })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                        </td>
                        <td className="py-3 pr-4">
                          <input type="email" value={editFields.email} onChange={e => setEditFields({ ...editFields, email: e.target.value })} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                        </td>
                        <td className="py-3 pr-4">
                          {isYou ? (
                            <span className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${roleBadge(u.role)}`}>{u.role.replace(/_/g, " ")}</span>
                          ) : (
                            <select value={editFields.role} onChange={e => setEditFields({ ...editFields, role: e.target.value })} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
                              {availableRoles.length > 0
                                ? availableRoles.map(r => <option key={r.slug} value={r.slug}>{r.name}</option>)
                                : <><option value="manager">Manager</option><option value="admin">Admin</option></>
                              }
                            </select>
                          )}
                        </td>
                        <td className="py-3 pr-4 text-xs text-zinc-400">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "--"}</td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={saveEdit} title="Save" className="rounded-lg p-2 text-green-600 hover:bg-green-50"><Check size={15} /></button>
                            <button onClick={cancelEdit} title="Cancel" className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-100"><X size={15} /></button>
                          </div>
                          {editError && <p className="text-xs text-red-600 mt-1">{editError}</p>}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 pr-4 font-bold">
                          {u.name}
                          {isYou && <span className="ml-2 rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-zinc-500">You</span>}
                        </td>
                        <td className="py-3 pr-4 text-zinc-500">{u.email}</td>
                        <td className="py-3 pr-4">
                          <span className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${roleBadge(u.role)}`}>{u.role.replace(/_/g, " ")}</span>
                        </td>
                        <td className="py-3 pr-4 text-xs text-zinc-400">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "--"}</td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => startEdit(u)} title="Edit user" className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"><Pencil size={15} /></button>
                            {!isYou && <button onClick={() => { setDeletingId(u.id); setDeleteError(""); }} title="Delete user" className="rounded-lg p-2 text-zinc-400 hover:bg-red-50 hover:text-red-600"><Trash2 size={15} /></button>}
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* ══════════════════════ ADD USER ══════════════════════ */}
      <form onSubmit={addUser} className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-black text-white grid place-items-center"><UserPlus size={18} /></div>
          <div><h3 className="font-extrabold">Add another dashboard user</h3><p className="text-xs text-gray-400">The new user signs in with their own password and receives their own verification code by email.</p></div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <input value={invite.name} onChange={e => setInvite({ ...invite, name: e.target.value })} required placeholder="Full name" className="rounded-xl border px-4 py-3 text-sm" />
          <input type="email" value={invite.email} onChange={e => setInvite({ ...invite, email: e.target.value })} required placeholder="Email address" className="rounded-xl border px-4 py-3 text-sm" />
          <div className="relative">
            <input type={showInvitePw ? "text" : "password"} value={invite.password} onChange={e => setInvite({ ...invite, password: e.target.value })} required minLength={12} placeholder="Temporary password" className="w-full rounded-xl border px-4 py-3 pr-10 text-sm" />
            <button type="button" onClick={() => setShowInvitePw(!showInvitePw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
              {showInvitePw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <select value={invite.role} onChange={e => setInvite({ ...invite, role: e.target.value })} className="rounded-xl border bg-white px-4 py-3 text-sm">
            {availableRoles.filter(r => r.slug !== "master_admin").map(r => <option key={r.slug} value={r.slug}>{r.name}</option>)}
            {availableRoles.length === 0 && <><option value="manager">Manager</option><option value="admin">Admin</option></>}
          </select>
        </div>
        {invite.password && <p className={`mt-2 text-xs font-semibold ${pwStrength(invite.password).color}`}>{pwStrength(invite.password).label}</p>}
        {userError && <p className="mt-3 text-sm font-semibold text-red-700">{userError}</p>}
        <button className="mt-4 rounded-xl bg-black px-5 py-3 text-sm font-bold text-white">Add dashboard user</button>
      </form>

      {/* ══════════════════════ NOTIFICATIONS (untouched) ══════════════════════ */}
      <form onSubmit={saveWebhook} className="rounded-2xl border border-gray-200 bg-white p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-black text-white grid place-items-center"><Bell size={18} /></div>
          <div><h3 className="font-extrabold">Notifications</h3><p className="text-xs text-gray-400">Get alerted when new leads come in via Slack or email digest.</p></div>
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={webhook.enabled} onChange={e => setWebhook({ ...webhook, enabled: e.target.checked })} className="h-4 w-4 rounded border-gray-300" />
          <span className="text-sm font-bold">Enable notifications</span>
        </label>
        <div><label className="mb-2 block text-sm font-bold">Slack webhook URL</label><input type="url" value={webhook.slackWebhookUrl} onChange={e => setWebhook({ ...webhook, slackWebhookUrl: e.target.value })} placeholder="https://hooks.slack.com/services/..." className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm" /></div>

        {/* Email Digest */}
        <div style={{ borderTop: "1px solid #eee", paddingTop: 20, marginTop: 8 }}>
          <h4 className="text-sm font-bold mb-3">Email Digest</h4>
          <label className="flex items-center gap-3 cursor-pointer mb-3">
            <input type="checkbox" checked={webhook.emailDigest} onChange={e => setWebhook({ ...webhook, emailDigest: e.target.checked })} className="h-4 w-4 rounded border-gray-300" />
            <span className="text-sm">Enable email digest</span>
          </label>
          {webhook.emailDigest && <>
            <div className="mb-3"><label className="mb-2 block text-sm font-bold">Recipient email</label><input type="email" value={webhook.digestEmail} onChange={e => setWebhook({ ...webhook, digestEmail: e.target.value })} placeholder="you@example.com" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm" /></div>
            <div className="mb-3"><label className="mb-2 block text-sm font-bold">Frequency</label><select value={webhook.digestFrequency || "daily"} onChange={e => setWebhook({ ...webhook, digestFrequency: e.target.value as "daily" | "weekly" })} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm"><option value="daily">Daily (8 AM UTC)</option><option value="weekly">Weekly (Monday 8 AM UTC)</option></select></div>
            <button type="button" disabled={digestTesting || !webhook.digestEmail} onClick={async () => { setDigestTesting(true); setDigestResult(""); try { const r = await fetch("/api/admin/digest", { method: "POST", headers }); const d = await r.json(); setDigestResult(r.ok ? (d.sent ? `Digest sent! ${d.stats?.leads ?? 0} leads, ${d.stats?.subscribers ?? 0} subscribers, ${d.stats?.followUps ?? 0} follow-ups.` : d.reason || "Skipped") : (d.error || "Failed to send digest")); } catch { setDigestResult("Network error"); } finally { setDigestTesting(false); } }} className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-bold hover:bg-zinc-50 disabled:opacity-50">{digestTesting ? "Sending..." : "Send Test Digest"}</button>
            {digestResult && <p className="mt-2 text-sm text-gray-600">{digestResult}</p>}
          </>}
        </div>

        {webhookMsg && <p className="text-sm font-semibold">{webhookMsg}</p>}
        <button disabled={webhookLoading} className="rounded-lg bg-black px-5 py-3 text-sm font-bold text-white disabled:opacity-50">{webhookLoading ? "Saving..." : "Save notification settings"}</button>
      </form>
    </div>
  );
}
