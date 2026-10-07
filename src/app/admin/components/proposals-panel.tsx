"use client";
import { useCallback, useEffect, useState } from "react";
import { Plus, Send, FileText, Trash2, ExternalLink, Copy, ChevronDown, ChevronUp, Receipt } from "lucide-react";

interface Package { name: string; price: string; recommended: boolean; items: string[] }
interface CommercialNote { title: string; text: string }
interface CaseStudy { name: string; description: string; href: string }
interface Proposal {
  id: number; slug: string; client_name: string; client_email: string; client_company: string;
  title: string; subtitle: string; intro: string; packages: string; commercial_notes: string;
  case_studies: string; whatsapp: string; currency: string; status: string; valid_until: string | null;
  created_at: string; updated_at: string;
}
interface Invoice {
  id: number; invoice_number: string; proposal_id: number | null; client_name: string;
  client_email: string; client_company: string; client_address: string; items: string;
  subtotal: number; tax_rate: number; tax_amount: number; total: number; currency: string;
  status: string; due_date: string | null; paid_at: string | null; notes: string;
  created_at: string; updated_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-zinc-100 text-zinc-600", sent: "bg-blue-50 text-blue-700", accepted: "bg-green-50 text-green-700",
  declined: "bg-red-50 text-red-600", paid: "bg-green-50 text-green-700", overdue: "bg-amber-50 text-amber-700",
};

function Badge({ status }: { status: string }) {
  return <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${STATUS_COLORS[status] || "bg-zinc-100 text-zinc-600"}`}>{status}</span>;
}

function formatDate(d: string) { return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); }

// ── Proposal Form ──
function ProposalForm({ proposal, onSave, onCancel }: { proposal?: Proposal; onSave: (data: Record<string, unknown>) => void; onCancel: () => void }) {
  const parse = <T,>(s: string | undefined, fallback: T): T => { try { return s ? JSON.parse(s) : fallback; } catch { return fallback; } };
  const [form, setForm] = useState({
    client_name: proposal?.client_name || "", client_email: proposal?.client_email || "",
    client_company: proposal?.client_company || "", title: proposal?.title || "Social, Content\n& Growth.",
    subtitle: proposal?.subtitle || "", intro: proposal?.intro || "",
    whatsapp: proposal?.whatsapp || "", currency: proposal?.currency || "PKR",
    valid_until: proposal?.valid_until?.slice(0, 10) || "",
  });
  const [packages, setPackages] = useState<Package[]>(parse(proposal?.packages, []));
  const [notes, setNotes] = useState<CommercialNote[]>(parse(proposal?.commercial_notes, []));
  const [studies, setStudies] = useState<CaseStudy[]>(parse(proposal?.case_studies, []));

  function addPackage() { setPackages([...packages, { name: "", price: "", recommended: false, items: [""] }]); }
  function updatePkg(i: number, field: string, val: unknown) { const next = [...packages]; (next[i] as unknown as Record<string, unknown>)[field] = val; setPackages(next); }
  function removePkg(i: number) { setPackages(packages.filter((_, j) => j !== i)); }
  function addPkgItem(i: number) { const next = [...packages]; next[i].items.push(""); setPackages(next); }
  function updatePkgItem(pi: number, ii: number, val: string) { const next = [...packages]; next[pi].items[ii] = val; setPackages(next); }
  function removePkgItem(pi: number, ii: number) { const next = [...packages]; next[pi].items.splice(ii, 1); setPackages(next); }

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <Input label="Client name *" value={form.client_name} onChange={v => setForm({ ...form, client_name: v })} />
        <Input label="Company" value={form.client_company} onChange={v => setForm({ ...form, client_company: v })} />
        <Input label="Email" value={form.client_email} onChange={v => setForm({ ...form, client_email: v })} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="text-xs font-bold text-zinc-500 mb-1 block">Title (use \n for line breaks)</label><textarea className="w-full border rounded-lg px-3 py-2 text-sm" rows={2} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
        <div><label className="text-xs font-bold text-zinc-500 mb-1 block">Subtitle</label><textarea className="w-full border rounded-lg px-3 py-2 text-sm" rows={2} value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} /></div>
      </div>
      <div><label className="text-xs font-bold text-zinc-500 mb-1 block">Intro paragraphs (blank line between paragraphs)</label><textarea className="w-full border rounded-lg px-3 py-2 text-sm" rows={4} value={form.intro} onChange={e => setForm({ ...form, intro: e.target.value })} /></div>
      <div className="grid sm:grid-cols-3 gap-4">
        <Input label="WhatsApp" value={form.whatsapp} onChange={v => setForm({ ...form, whatsapp: v })} placeholder="+923001234567" />
        <Input label="Currency" value={form.currency} onChange={v => setForm({ ...form, currency: v })} />
        <Input label="Valid until" value={form.valid_until} onChange={v => setForm({ ...form, valid_until: v })} type="date" />
      </div>

      {/* Packages */}
      <fieldset className="border rounded-xl p-4">
        <legend className="text-xs font-bold text-zinc-500 px-2">Packages</legend>
        {packages.map((pkg, i) => (
          <div key={i} className="mb-4 p-3 bg-zinc-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <input className="border rounded px-2 py-1 text-sm flex-1" placeholder="Package name" value={pkg.name} onChange={e => updatePkg(i, "name", e.target.value)} />
              <input className="border rounded px-2 py-1 text-sm w-36" placeholder="Price" value={pkg.price} onChange={e => updatePkg(i, "price", e.target.value)} />
              <label className="flex items-center gap-1 text-xs"><input type="checkbox" checked={pkg.recommended} onChange={e => updatePkg(i, "recommended", e.target.checked)} /> Rec</label>
              <button onClick={() => removePkg(i)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
            </div>
            {pkg.items.map((item, j) => (
              <div key={j} className="flex items-center gap-2 mb-1">
                <span className="text-zinc-400 text-xs">—</span>
                <input className="border rounded px-2 py-1 text-sm flex-1" value={item} onChange={e => updatePkgItem(i, j, e.target.value)} placeholder="Line item" />
                <button onClick={() => removePkgItem(i, j)} className="text-zinc-300 hover:text-red-500 text-xs">x</button>
              </div>
            ))}
            <button onClick={() => addPkgItem(i)} className="text-xs text-zinc-500 hover:text-black mt-1">+ Add item</button>
          </div>
        ))}
        <button onClick={addPackage} className="text-sm font-semibold text-zinc-600 hover:text-black flex items-center gap-1"><Plus size={14} /> Add package</button>
      </fieldset>

      {/* Commercial notes */}
      <fieldset className="border rounded-xl p-4">
        <legend className="text-xs font-bold text-zinc-500 px-2">Commercial Notes</legend>
        {notes.map((n, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input className="border rounded px-2 py-1 text-sm w-32" placeholder="Title" value={n.title} onChange={e => { const next = [...notes]; next[i].title = e.target.value; setNotes(next); }} />
            <input className="border rounded px-2 py-1 text-sm flex-1" placeholder="Text" value={n.text} onChange={e => { const next = [...notes]; next[i].text = e.target.value; setNotes(next); }} />
            <button onClick={() => setNotes(notes.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
          </div>
        ))}
        <button onClick={() => setNotes([...notes, { title: "", text: "" }])} className="text-sm font-semibold text-zinc-600 hover:text-black flex items-center gap-1"><Plus size={14} /> Add note</button>
      </fieldset>

      {/* Case studies */}
      <fieldset className="border rounded-xl p-4">
        <legend className="text-xs font-bold text-zinc-500 px-2">Case Studies</legend>
        {studies.map((cs, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input className="border rounded px-2 py-1 text-sm w-28" placeholder="Name" value={cs.name} onChange={e => { const next = [...studies]; next[i].name = e.target.value; setStudies(next); }} />
            <input className="border rounded px-2 py-1 text-sm flex-1" placeholder="Description" value={cs.description} onChange={e => { const next = [...studies]; next[i].description = e.target.value; setStudies(next); }} />
            <input className="border rounded px-2 py-1 text-sm w-32" placeholder="/work/slug" value={cs.href} onChange={e => { const next = [...studies]; next[i].href = e.target.value; setStudies(next); }} />
            <button onClick={() => setStudies(studies.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
          </div>
        ))}
        <button onClick={() => setStudies([...studies, { name: "", description: "", href: "" }])} className="text-sm font-semibold text-zinc-600 hover:text-black flex items-center gap-1"><Plus size={14} /> Add case study</button>
      </fieldset>

      <div className="flex gap-3 pt-2">
        <button onClick={() => onSave({ ...form, packages, commercial_notes: notes, case_studies: studies, ...(proposal ? { id: proposal.id } : {}) })} className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-bold">Save</button>
        <button onClick={onCancel} className="border px-5 py-2.5 rounded-xl text-sm font-semibold text-zinc-500">Cancel</button>
      </div>
    </div>
  );
}

// ── Invoice Form ──
interface InvItem { description: string; qty: number; rate: number; amount: number }
function InvoiceForm({ invoice, proposals, onSave, onCancel }: { invoice?: Invoice; proposals: Proposal[]; onSave: (data: Record<string, unknown>) => void; onCancel: () => void }) {
  const parse = <T,>(s: string | undefined, fallback: T): T => { try { return s ? JSON.parse(s) : fallback; } catch { return fallback; } };
  const [form, setForm] = useState({
    proposal_id: invoice?.proposal_id || "", client_name: invoice?.client_name || "",
    client_email: invoice?.client_email || "", client_company: invoice?.client_company || "",
    client_address: invoice?.client_address || "", tax_rate: invoice?.tax_rate ?? 0,
    currency: invoice?.currency || "PKR", due_date: invoice?.due_date?.slice(0, 10) || "", notes: invoice?.notes || "",
  });
  const [items, setItems] = useState<InvItem[]>(parse(invoice?.items, [{ description: "", qty: 1, rate: 0, amount: 0 }]));

  function updateItem(i: number, field: string, val: unknown) {
    const next = [...items];
    (next[i] as unknown as Record<string, unknown>)[field] = val;
    if (field === "qty" || field === "rate") next[i].amount = next[i].qty * next[i].rate;
    setItems(next);
  }

  function prefillFromProposal(pid: string) {
    const p = proposals.find(x => x.id === Number(pid));
    if (!p) return;
    setForm(f => ({ ...f, proposal_id: pid, client_name: p.client_name, client_email: p.client_email, client_company: p.client_company }));
    const pkgs: Package[] = typeof p.packages === "string" ? JSON.parse(p.packages) : p.packages;
    const rec = pkgs.find(x => x.recommended) || pkgs[0];
    if (rec) {
      const price = parseFloat(rec.price.replace(/[^0-9.]/g, "")) || 0;
      setItems([{ description: `${rec.name} Package — Monthly Retainer`, qty: 1, rate: price, amount: price }]);
    }
  }

  const subtotal = items.reduce((s, i) => s + i.amount, 0);
  const taxAmt = Math.round(subtotal * Number(form.tax_rate)) / 100;

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-zinc-500 mb-1 block">Link to proposal</label>
          <select className="w-full border rounded-lg px-3 py-2 text-sm" value={String(form.proposal_id)} onChange={e => { setForm({ ...form, proposal_id: e.target.value }); prefillFromProposal(e.target.value); }}>
            <option value="">None</option>
            {proposals.map(p => <option key={p.id} value={p.id}>{p.client_company || p.client_name}</option>)}
          </select>
        </div>
        <Input label="Due date" value={form.due_date} onChange={v => setForm({ ...form, due_date: v })} type="date" />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <Input label="Client name *" value={form.client_name} onChange={v => setForm({ ...form, client_name: v })} />
        <Input label="Company" value={form.client_company} onChange={v => setForm({ ...form, client_company: v })} />
        <Input label="Email" value={form.client_email} onChange={v => setForm({ ...form, client_email: v })} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="text-xs font-bold text-zinc-500 mb-1 block">Address</label><textarea className="w-full border rounded-lg px-3 py-2 text-sm" rows={2} value={form.client_address} onChange={e => setForm({ ...form, client_address: e.target.value })} /></div>
        <div><label className="text-xs font-bold text-zinc-500 mb-1 block">Notes</label><textarea className="w-full border rounded-lg px-3 py-2 text-sm" rows={2} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /></div>
      </div>

      <fieldset className="border rounded-xl p-4">
        <legend className="text-xs font-bold text-zinc-500 px-2">Line Items</legend>
        <div className="grid grid-cols-[1fr_60px_100px_100px_30px] gap-2 text-xs font-bold text-zinc-400 mb-2 px-1">
          <span>Description</span><span>Qty</span><span>Rate</span><span>Amount</span><span />
        </div>
        {items.map((item, i) => (
          <div key={i} className="grid grid-cols-[1fr_60px_100px_100px_30px] gap-2 mb-2">
            <input className="border rounded px-2 py-1 text-sm" value={item.description} onChange={e => updateItem(i, "description", e.target.value)} />
            <input className="border rounded px-2 py-1 text-sm text-center" type="number" min={1} value={item.qty} onChange={e => updateItem(i, "qty", Number(e.target.value))} />
            <input className="border rounded px-2 py-1 text-sm text-right" type="number" value={item.rate} onChange={e => updateItem(i, "rate", Number(e.target.value))} />
            <div className="border rounded px-2 py-1 text-sm text-right bg-zinc-50">{item.amount.toLocaleString()}</div>
            <button onClick={() => setItems(items.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
          </div>
        ))}
        <button onClick={() => setItems([...items, { description: "", qty: 1, rate: 0, amount: 0 }])} className="text-sm font-semibold text-zinc-600 hover:text-black flex items-center gap-1 mt-2"><Plus size={14} /> Add line</button>
        <div className="border-t mt-4 pt-3 space-y-1 text-sm text-right">
          <div>Subtotal: <b>{form.currency} {subtotal.toLocaleString()}</b></div>
          <div className="flex items-center justify-end gap-2">Tax: <input className="border rounded px-2 py-1 w-16 text-right text-sm" type="number" value={form.tax_rate} onChange={e => setForm({ ...form, tax_rate: Number(e.target.value) })} />% = {form.currency} {taxAmt.toLocaleString()}</div>
          <div className="text-lg font-extrabold">Total: {form.currency} {(subtotal + taxAmt).toLocaleString()}</div>
        </div>
      </fieldset>

      <div className="flex gap-3">
        <button onClick={() => onSave({ ...form, items, ...(invoice ? { id: invoice.id } : {}) })} className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-bold">Save</button>
        <button onClick={onCancel} className="border px-5 py-2.5 rounded-xl text-sm font-semibold text-zinc-500">Cancel</button>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs font-bold text-zinc-500 mb-1 block">{label}</label>
      <input type={type} className="w-full border rounded-lg px-3 py-2 text-sm" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

// ── Main Panel ──
export function ProposalsPanel({ headers }: { headers: Record<string, string> }) {
  const [tab, setTab] = useState<"proposals" | "invoices">("proposals");
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProposal, setEditingProposal] = useState<Proposal | "new" | null>(null);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | "new" | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [pRes, iRes] = await Promise.all([
      fetch("/api/admin/proposals").then(r => r.json()),
      fetch("/api/admin/invoices").then(r => r.json()),
    ]);
    setProposals(pRes.proposals || []);
    setInvoices(iRes.invoices || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function saveProposal(data: Record<string, unknown>) {
    const method = data.id ? "PUT" : "POST";
    await fetch("/api/admin/proposals", { method, headers, body: JSON.stringify(data) });
    setEditingProposal(null);
    load();
  }

  async function saveInvoice(data: Record<string, unknown>) {
    const method = data.id ? "PUT" : "POST";
    await fetch("/api/admin/invoices", { method, headers, body: JSON.stringify(data) });
    setEditingInvoice(null);
    load();
  }

  async function updateStatus(type: "proposals" | "invoices", id: number, status: string) {
    const url = type === "proposals" ? "/api/admin/proposals" : "/api/admin/invoices";
    await fetch(url, { method: "PUT", headers, body: JSON.stringify({ id, status }) });
    load();
  }

  async function deleteItem(type: "proposals" | "invoices", id: number) {
    if (!confirm("Delete this item?")) return;
    const url = type === "proposals" ? "/api/admin/proposals" : "/api/admin/invoices";
    await fetch(url, { method: "DELETE", headers, body: JSON.stringify({ id }) });
    load();
  }

  function copyLink(slug: string) {
    navigator.clipboard.writeText(`${window.location.origin}/en/proposal/${slug}`);
  }

  if (loading) return <div className="text-sm text-zinc-400 py-12 text-center">Loading...</div>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setTab("proposals")} className={`text-sm font-bold pb-1 ${tab === "proposals" ? "border-b-2 border-black" : "text-zinc-400"}`}>
          <FileText size={14} className="inline mr-1" /> Proposals ({proposals.length})
        </button>
        <button onClick={() => setTab("invoices")} className={`text-sm font-bold pb-1 ${tab === "invoices" ? "border-b-2 border-black" : "text-zinc-400"}`}>
          <Receipt size={14} className="inline mr-1" /> Invoices ({invoices.length})
        </button>
        <div className="flex-1" />
        {tab === "proposals" && <button onClick={() => setEditingProposal("new")} className="bg-black text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5"><Plus size={14} /> New Proposal</button>}
        {tab === "invoices" && <button onClick={() => setEditingInvoice("new")} className="bg-black text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5"><Plus size={14} /> New Invoice</button>}
      </div>

      {editingProposal && (
        <div className="border rounded-2xl bg-white p-6 mb-6 shadow-sm">
          <h3 className="font-extrabold mb-4">{editingProposal === "new" ? "New Proposal" : "Edit Proposal"}</h3>
          <ProposalForm proposal={editingProposal === "new" ? undefined : editingProposal} onSave={saveProposal} onCancel={() => setEditingProposal(null)} />
        </div>
      )}

      {editingInvoice && (
        <div className="border rounded-2xl bg-white p-6 mb-6 shadow-sm">
          <h3 className="font-extrabold mb-4">{editingInvoice === "new" ? "New Invoice" : "Edit Invoice"}</h3>
          <InvoiceForm invoice={editingInvoice === "new" ? undefined : editingInvoice} proposals={proposals} onSave={saveInvoice} onCancel={() => setEditingInvoice(null)} />
        </div>
      )}

      {tab === "proposals" && (
        <div className="space-y-3">
          {proposals.length === 0 && <p className="text-sm text-zinc-400 py-8 text-center">No proposals yet.</p>}
          {proposals.map(p => (
            <div key={p.id} className="border rounded-2xl bg-white overflow-hidden">
              <button onClick={() => setExpanded(expanded === p.id ? null : p.id)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-zinc-50 text-left">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText size={16} className="text-zinc-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-sm truncate">{p.client_company || p.client_name}</p>
                    <p className="text-xs text-zinc-400">{formatDate(p.created_at)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge status={p.status} />
                  {expanded === p.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>
              {expanded === p.id && (
                <div className="px-5 pb-4 border-t bg-zinc-50/50">
                  <div className="flex flex-wrap gap-2 pt-3">
                    <button onClick={() => setEditingProposal(p)} className="text-xs font-semibold border rounded-lg px-3 py-1.5 hover:bg-zinc-100">Edit</button>
                    <button onClick={() => copyLink(p.slug)} className="text-xs font-semibold border rounded-lg px-3 py-1.5 hover:bg-zinc-100 flex items-center gap-1"><Copy size={12} /> Copy link</button>
                    <a href={`/en/proposal/${p.slug}`} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold border rounded-lg px-3 py-1.5 hover:bg-zinc-100 flex items-center gap-1"><ExternalLink size={12} /> Preview</a>
                    {p.status === "draft" && <button onClick={() => updateStatus("proposals", p.id, "sent")} className="text-xs font-semibold bg-blue-600 text-white rounded-lg px-3 py-1.5 flex items-center gap-1"><Send size={12} /> Mark sent</button>}
                    {p.status === "sent" && <>
                      <button onClick={() => updateStatus("proposals", p.id, "accepted")} className="text-xs font-semibold bg-green-600 text-white rounded-lg px-3 py-1.5">Accept</button>
                      <button onClick={() => updateStatus("proposals", p.id, "declined")} className="text-xs font-semibold bg-red-500 text-white rounded-lg px-3 py-1.5">Decline</button>
                    </>}
                    <button onClick={() => deleteItem("proposals", p.id)} className="text-xs font-semibold text-red-500 border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-50 ml-auto"><Trash2 size={12} /></button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "invoices" && (
        <div className="space-y-3">
          {invoices.length === 0 && <p className="text-sm text-zinc-400 py-8 text-center">No invoices yet.</p>}
          {invoices.map(inv => (
            <div key={inv.id} className="border rounded-2xl bg-white overflow-hidden">
              <button onClick={() => setExpanded(expanded === -inv.id ? null : -inv.id)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-zinc-50 text-left">
                <div className="flex items-center gap-3 min-w-0">
                  <Receipt size={16} className="text-zinc-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-sm truncate">{inv.invoice_number} — {inv.client_company || inv.client_name}</p>
                    <p className="text-xs text-zinc-400">{inv.currency} {inv.total.toLocaleString()} · {formatDate(inv.created_at)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge status={inv.status} />
                  {expanded === -inv.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>
              {expanded === -inv.id && (
                <div className="px-5 pb-4 border-t bg-zinc-50/50">
                  <div className="flex flex-wrap gap-2 pt-3">
                    <button onClick={() => setEditingInvoice(inv)} className="text-xs font-semibold border rounded-lg px-3 py-1.5 hover:bg-zinc-100">Edit</button>
                    {inv.status === "draft" && <button onClick={() => updateStatus("invoices", inv.id, "sent")} className="text-xs font-semibold bg-blue-600 text-white rounded-lg px-3 py-1.5 flex items-center gap-1"><Send size={12} /> Mark sent</button>}
                    {inv.status === "sent" && <button onClick={() => updateStatus("invoices", inv.id, "paid")} className="text-xs font-semibold bg-green-600 text-white rounded-lg px-3 py-1.5">Mark paid</button>}
                    <button onClick={() => deleteItem("invoices", inv.id)} className="text-xs font-semibold text-red-500 border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-50 ml-auto"><Trash2 size={12} /></button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
