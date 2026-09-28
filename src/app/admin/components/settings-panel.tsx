"use client";
import { useState, type FormEvent } from "react";

export function SettingsPanel({ headers, email, onSaved }: { headers: Record<string,string>; email: string; onSaved: () => void }) {
  const [newEmail,setNewEmail]=useState(email);
  const [currentPassword,setCurrentPassword]=useState("");
  const [newPassword,setNewPassword]=useState("");
  const [message,setMessage]=useState("");
  const [loading,setLoading]=useState(false);

  async function submit(e:FormEvent){
    e.preventDefault(); setLoading(true); setMessage("");
    const r=await fetch("/api/admin/settings",{method:"PATCH",headers,body:JSON.stringify({email:newEmail,currentPassword,newPassword})});
    const d=await r.json(); setLoading(false);
    if(!r.ok){setMessage(d.error||"Could not update account");return;}
    setMessage("Account updated. Please sign in again with your new credentials.");
    setTimeout(onSaved,1200);
  }
  return <div className="max-w-xl space-y-6">
    <div><h2 className="text-xl font-extrabold text-black">Admin Settings</h2><p className="mt-1 text-sm text-gray-500">Change the email or password used to access Markit CMS.</p></div>
    <form onSubmit={submit} className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6">
      <div><label className="mb-2 block text-sm font-bold">Admin email</label><input type="email" value={newEmail} onChange={e=>setNewEmail(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3" required /></div>
      <div><label className="mb-2 block text-sm font-bold">Current password</label><input type="password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3" required /></div>
      <div><label className="mb-2 block text-sm font-bold">New password <span className="font-normal text-gray-400">(leave blank to keep it)</span></label><input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} minLength={10} className="w-full rounded-lg border border-gray-300 px-4 py-3" /></div>
      {message&&<p className="text-sm font-semibold">{message}</p>}
      <button disabled={loading} className="rounded-lg bg-black px-5 py-3 text-sm font-bold text-white disabled:opacity-50">{loading?"Saving...":"Save account settings"}</button>
    </form>
  </div>;
}
