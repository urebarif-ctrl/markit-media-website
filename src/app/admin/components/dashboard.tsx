"use client";
import Image from "next/image";import {useState,useEffect} from "react";import {LayoutDashboard,Inbox,FileText,Image as ImageIcon,BriefcaseBusiness,Quote,Users,Activity,Search,HeartPulse,Route,Settings,LogOut,Menu,X,ClipboardList,ScrollText,Shield} from "lucide-react";
import {LeadsPanel} from "./leads-panel";import {PostsPanel} from "./posts-panel";import {MediaPanel} from "./media-panel";import {AnalyticsPanel} from "./analytics-panel";import {SearchAnalyticsPanel} from "./search-analytics-panel";import {DiscoveryPanel} from "./discovery-panel";import {SettingsPanel} from "./settings-panel";import {ContentPanel} from "./content-panel";import {ActivityPanel} from "./activity-panel";import {HealthPanel} from "./health-panel";import {GlobalSearch} from "./global-search";import {RedirectsPanel} from "./redirects-panel";import {ProposalsPanel} from "./proposals-panel";import {RolesPanel} from "./roles-panel";
interface Props{user:{name:string;email:string;role:string};onLogout:()=>void}

const GROUP_ORDER = ["Dashboard","CRM","Content","Finance","SEO","Admin"] as const;
type GroupName = typeof GROUP_ORDER[number];

const GROUP_PERM_KEY: Record<GroupName, string> = {
  Dashboard: "dashboard",
  CRM: "crm",
  Content: "content",
  Finance: "finance",
  SEO: "seo",
  Admin: "admin",
};

const nav=[
 {id:"analytics",label:"Overview",icon:LayoutDashboard,group:"Dashboard"},{id:"activity",label:"Activity",icon:Activity,group:"Dashboard"},
 {id:"leads",label:"Leads",icon:Inbox,group:"CRM"},{id:"discovery",label:"Discovery Briefs",icon:ClipboardList,group:"CRM"},
 {id:"posts",label:"Blog",icon:FileText,group:"Content"},{id:"media",label:"Media",icon:ImageIcon,group:"Content"},{id:"case_studies",label:"Case Studies",icon:BriefcaseBusiness,group:"Content"},{id:"portfolio",label:"Portfolio",icon:BriefcaseBusiness,group:"Content"},{id:"testimonials",label:"Testimonials",icon:Quote,group:"Content"},{id:"clients",label:"Clients",icon:Users,group:"Content"},
 {id:"proposals",label:"Proposals & Invoices",icon:ScrollText,group:"Finance"},
 {id:"search_insights",label:"Search Insights",icon:Search,group:"SEO"},{id:"health",label:"Health & Audits",icon:HeartPulse,group:"SEO"},{id:"redirects",label:"Redirects",icon:Route,group:"SEO"},
 {id:"settings",label:"Settings",icon:Settings,group:"Admin"},{id:"roles",label:"Roles",icon:Shield,group:"Admin"}] as const;
type Tab=typeof nav[number]["id"];
const JSON_HEADERS:Record<string,string>={"Content-Type":"application/json"};
type PermLevel = "none" | "read" | "write" | "full";
type RolePerms = Record<string, PermLevel>;

export function AdminDashboard({user,onLogout}:Props){
 const [active,setActive]=useState<Tab>("analytics"),[mobile,setMobile]=useState(false);
 const [permissions,setPermissions]=useState<RolePerms|null>(null);
 const headers=JSON_HEADERS;

 useEffect(()=>{
   fetch("/api/admin/roles",{headers,cache:"no-store"})
     .then(r=>r.json())
     .then(d=>{
       const roles=d.roles||[];
       const match=roles.find((r:any)=>r.slug===user.role);
       if(match)setPermissions(match.permissions);
       else setPermissions({dashboard:"full",crm:"full",content:"full",finance:"full",seo:"full",admin:"full"});
     })
     .catch(()=>setPermissions({dashboard:"full",crm:"full",content:"full",finance:"full",seo:"full",admin:"full"}));
 },[user.role]);

 const filteredNav = permissions
   ? nav.filter(x => {
       const permKey = GROUP_PERM_KEY[x.group as GroupName];
       return permKey && permissions[permKey] !== "none";
     })
   : nav.filter(x => true);

 const visibleGroups = GROUP_ORDER.filter(g => filteredNav.some(x => x.group === g));

 const current=nav.find(x=>x.id===active);

 // If current tab is filtered out, switch to first visible
 useEffect(()=>{
   if(permissions && filteredNav.length > 0 && !filteredNav.find(x=>x.id===active)){
     setActive(filteredNav[0].id);
   }
 },[permissions,active]);

 const sidebar=<><div className="px-5 py-6 border-b border-white/10"><div className="rounded-xl bg-white p-3"><Image src="/images/logo-black.png" alt="Markit Media" width={170} height={50} className="h-8 w-auto object-contain"/></div><div className="mt-3 text-[11px] text-zinc-500">Private operations workspace</div></div><nav className="p-3 overflow-y-auto flex-1">{visibleGroups.map(g=><div key={g} className="mb-5"><p className="px-3 mb-2 text-[10px] uppercase tracking-[.18em] font-bold text-zinc-500">{g}</p>{filteredNav.filter(x=>x.group===g).map(x=>{const I=x.icon;return <button key={x.id} onClick={()=>{setActive(x.id);setMobile(false)}} className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${active===x.id?"bg-white text-black":"text-zinc-300 hover:bg-white/10 hover:text-white"}`}><I size={17}/>{x.label}</button>})}</div>)}</nav><div className="p-4 border-t border-white/10"><div className="mb-3 px-2"><div className="text-sm font-bold truncate">{user.name||"Markit Admin"}</div><div className="text-xs text-zinc-500 truncate">{user.email}</div></div><button onClick={onLogout} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white px-2 py-2"><LogOut size={16}/> Sign out</button></div></>;
 return <div className="min-h-screen bg-[#f6f7f9] text-zinc-950"><aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 bg-[#0b0b0c] text-white flex-col z-40">{sidebar}</aside>{mobile&&<div className="fixed inset-0 z-50 lg:hidden"><button className="absolute inset-0 bg-black/50" onClick={()=>setMobile(false)}/><aside className="relative w-72 h-full bg-[#0b0b0c] text-white flex flex-col">{sidebar}<button onClick={()=>setMobile(false)} className="absolute right-3 top-3 p-2"><X/></button></aside></div>}
 <div className="lg:pl-64"><header className="sticky top-0 z-30 h-16 border-b bg-white/95 backdrop-blur flex items-center justify-between px-4 sm:px-6"><div className="flex items-center gap-3"><button onClick={()=>setMobile(true)} className="lg:hidden p-2 rounded-lg border"><Menu size={18}/></button><div><h1 className="font-extrabold leading-tight">{current?.label}</h1><p className="hidden sm:block text-xs text-zinc-400">Manage Markit Media from one place</p></div></div><div className="flex items-center gap-3"><GlobalSearch headers={headers}/><div className="hidden md:grid h-9 w-9 rounded-full bg-black text-white place-items-center text-xs font-black">{(user.name||user.email||"M").slice(0,1).toUpperCase()}</div></div></header>
 <main className="p-4 sm:p-6 lg:p-8 max-w-[1500px] mx-auto">{active==="analytics"&&<AnalyticsPanel headers={headers}/>} {active==="proposals"&&<ProposalsPanel headers={headers}/>} {active==="search_insights"&&<SearchAnalyticsPanel headers={headers}/>} {active==="activity"&&<ActivityPanel headers={headers}/>} {active==="discovery"&&<DiscoveryPanel headers={headers}/>} {active==="leads"&&<LeadsPanel headers={headers}/>} {active==="posts"&&<PostsPanel headers={headers}/>} {active==="media"&&<MediaPanel/>} {active==="case_studies"&&<ContentPanel headers={headers} kind="case_studies"/>} {active==="portfolio"&&<ContentPanel headers={headers} kind="portfolio"/>} {active==="testimonials"&&<ContentPanel headers={headers} kind="testimonials"/>} {active==="clients"&&<ContentPanel headers={headers} kind="clients"/>} {active==="health"&&<HealthPanel headers={headers}/>} {active==="redirects"&&<RedirectsPanel headers={headers}/>} {active==="settings"&&<SettingsPanel headers={headers} email={user.email} onSaved={onLogout}/>} {active==="roles"&&<RolesPanel headers={headers}/>}</main></div></div>}
