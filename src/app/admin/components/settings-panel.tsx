"use client";
import { useEffect, useState, type FormEvent } from "react";
import { Bell, ShieldCheck, UserPlus, Users } from "lucide-react";

type TeamUser={id:string;name:string;email:string;role:string;createdAt?:string};

export function SettingsPanel({ headers, email, onSaved }: { headers: Record<string,string>; email: string; onSaved: () => void }) {
  const [newEmail,setNewEmail]=useState(email);
  const [currentPassword,setCurrentPassword]=useState("");
  const [newPassword,setNewPassword]=useState("");
  const [message,setMessage]=useState("");
  const [loading,setLoading]=useState(false);
  const [users,setUsers]=useState<TeamUser[]>([]);
  const [userError,setUserError]=useState("");
  const [invite,setInvite]=useState({name:"",email:"",password:"",role:"manager"});
  const [webhook,setWebhook]=useState({slackWebhookUrl:"",emailDigest:false,digestEmail:"",enabled:false});
  const [webhookMsg,setWebhookMsg]=useState("");
  const [webhookLoading,setWebhookLoading]=useState(false);

  async function loadWebhook(){
    try{const r=await fetch("/api/admin/webhooks",{headers,cache:"no-store"});if(r.ok){const d=await r.json();setWebhook(d);}}catch{}
  }

  async function saveWebhook(e:FormEvent){
    e.preventDefault();setWebhookLoading(true);setWebhookMsg("");
    const r=await fetch("/api/admin/webhooks",{method:"POST",headers,body:JSON.stringify(webhook)});
    const d=await r.json();setWebhookLoading(false);
    setWebhookMsg(r.ok?"Notification settings saved.":d.error||"Could not save notification settings");
  }

  async function loadUsers(){
    const r=await fetch("/api/admin/users",{headers,cache:"no-store"});
    const d=await r.json();
    if(r.ok)setUsers(d.users||[]);
  }
  useEffect(()=>{loadUsers();loadWebhook();},[]);

  async function submit(e:FormEvent){
    e.preventDefault(); setLoading(true); setMessage("");
    const r=await fetch("/api/admin/settings",{method:"PATCH",headers,body:JSON.stringify({email:newEmail,currentPassword,newPassword})});
    const d=await r.json(); setLoading(false);
    if(!r.ok){setMessage(d.error||"Could not update account");return;}
    setMessage("Account updated. Please sign in again with your new credentials.");
    setTimeout(onSaved,1200);
  }

  async function addUser(e:FormEvent){
    e.preventDefault();setUserError("");
    const r=await fetch("/api/admin/users",{method:"POST",headers,body:JSON.stringify(invite)});
    const d=await r.json();
    if(!r.ok){setUserError(d.error||"Could not add user");return;}
    setInvite({name:"",email:"",password:"",role:"manager"});
    await loadUsers();
  }

  return <div className="max-w-5xl space-y-8">
    <div><p className="text-xs font-bold uppercase tracking-[.2em] text-zinc-400">Security & access</p><h2 className="mt-1 text-3xl font-black tracking-tight">Dashboard settings</h2><p className="mt-2 text-sm text-gray-500">Manage your own credentials and the people who can access this private workspace.</p></div>

    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={submit} className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-3"><div className="h-10 w-10 rounded-xl bg-black text-white grid place-items-center"><ShieldCheck size={18}/></div><div><h3 className="font-extrabold">Your account</h3><p className="text-xs text-gray-400">Email + password + email verification code</p></div></div>
        <div><label className="mb-2 block text-sm font-bold">Admin email</label><input type="email" value={newEmail} onChange={e=>setNewEmail(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3" required /></div>
        <div><label className="mb-2 block text-sm font-bold">Current password</label><input type="password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3" required /></div>
        <div><label className="mb-2 block text-sm font-bold">New password <span className="font-normal text-gray-400">(leave blank to keep it)</span></label><input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} minLength={12} className="w-full rounded-lg border border-gray-300 px-4 py-3" /></div>
        {message&&<p className="text-sm font-semibold">{message}</p>}
        <button disabled={loading} className="rounded-lg bg-black px-5 py-3 text-sm font-bold text-white disabled:opacity-50">{loading?"Saving...":"Save account settings"}</button>
      </form>

      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-3"><div className="h-10 w-10 rounded-xl bg-zinc-100 grid place-items-center"><Users size={18}/></div><div><h3 className="font-extrabold">Dashboard users</h3><p className="text-xs text-gray-400">{users.length} authorized account{users.length===1?"":"s"}</p></div></div>
        <div className="mt-5 space-y-2">{users.map(u=><div key={u.id} className="flex items-center justify-between rounded-xl bg-zinc-50 p-3"><div><div className="text-sm font-bold">{u.name}</div><div className="text-xs text-zinc-500">{u.email}</div></div><span className="rounded-full border bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide">{u.role}</span></div>)}</div>
      </section>
    </div>

    <form onSubmit={addUser} className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-3"><div className="h-10 w-10 rounded-xl bg-black text-white grid place-items-center"><UserPlus size={18}/></div><div><h3 className="font-extrabold">Add another dashboard user</h3><p className="text-xs text-gray-400">The new user signs in with their own password and receives their own verification code by email.</p></div></div>
      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <input value={invite.name} onChange={e=>setInvite({...invite,name:e.target.value})} required placeholder="Full name" className="rounded-xl border px-4 py-3 text-sm"/>
        <input type="email" value={invite.email} onChange={e=>setInvite({...invite,email:e.target.value})} required placeholder="Email address" className="rounded-xl border px-4 py-3 text-sm"/>
        <input type="password" value={invite.password} onChange={e=>setInvite({...invite,password:e.target.value})} required minLength={12} placeholder="Temporary password" className="rounded-xl border px-4 py-3 text-sm"/>
        <select value={invite.role} onChange={e=>setInvite({...invite,role:e.target.value})} className="rounded-xl border bg-white px-4 py-3 text-sm"><option value="manager">Manager</option><option value="admin">Admin</option></select>
      </div>
      {userError&&<p className="mt-3 text-sm font-semibold text-red-700">{userError}</p>}
      <button className="mt-4 rounded-xl bg-black px-5 py-3 text-sm font-bold text-white">Add dashboard user</button>
    </form>

    <form onSubmit={saveWebhook} className="rounded-2xl border border-gray-200 bg-white p-6 space-y-5">
      <div className="flex items-center gap-3"><div className="h-10 w-10 rounded-xl bg-black text-white grid place-items-center"><Bell size={18}/></div><div><h3 className="font-extrabold">Notifications</h3><p className="text-xs text-gray-400">Get alerted when new leads come in via Slack or email digest.</p></div></div>
      <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={webhook.enabled} onChange={e=>setWebhook({...webhook,enabled:e.target.checked})} className="h-4 w-4 rounded border-gray-300"/><span className="text-sm font-bold">Enable notifications</span></label>
      <div><label className="mb-2 block text-sm font-bold">Slack webhook URL</label><input type="url" value={webhook.slackWebhookUrl} onChange={e=>setWebhook({...webhook,slackWebhookUrl:e.target.value})} placeholder="https://hooks.slack.com/services/..." className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm" /></div>
      {webhookMsg&&<p className="text-sm font-semibold">{webhookMsg}</p>}
      <button disabled={webhookLoading} className="rounded-lg bg-black px-5 py-3 text-sm font-bold text-white disabled:opacity-50">{webhookLoading?"Saving...":"Save notification settings"}</button>
    </form>
  </div>;
}
