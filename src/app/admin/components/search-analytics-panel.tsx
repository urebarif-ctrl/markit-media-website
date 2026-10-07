"use client";
import { useEffect,useState } from "react";
import { BarChart3, Search, FileText, ExternalLink } from "lucide-react";

const fmt=(n:number)=>new Intl.NumberFormat("en-US",{maximumFractionDigits:0}).format(n||0);
const pct=(n:number)=>`${((n||0)*100).toFixed(1)}%`;
const path=(url:string)=>{try{return new URL(url).pathname}catch{return url||"—"}};

export function SearchAnalyticsPanel({headers}:{headers:Record<string,string>}){
 const [days,setDays]=useState(30),[data,setData]=useState<any>(null),[loading,setLoading]=useState(true),[error,setError]=useState("");
 async function load(){setLoading(true);setError("");try{const r=await fetch(`/api/admin/search-analytics?days=${days}`,{headers,cache:"no-store"});const d=await r.json();if(!r.ok)throw new Error(d.error||"Could not load search data");setData(d)}catch(e:any){setError(e.message||"Could not load search data")}finally{setLoading(false)}}
 useEffect(()=>{load()},[days]);
 if(loading)return <div className="py-16 text-center text-sm text-zinc-500">Loading search performance...</div>;
 if(error)return <div className="rounded-2xl border bg-white p-8"><h2 className="text-xl font-black">Search data unavailable</h2><p className="mt-2 text-sm text-zinc-500">{error}</p></div>;
 if(!data?.configured)return <div className="max-w-3xl rounded-3xl border bg-white p-8"><div className="h-12 w-12 rounded-2xl bg-black text-white grid place-items-center"><Search size={20}/></div><h2 className="mt-5 text-2xl font-black">Connect live Google search data</h2><p className="mt-2 text-sm leading-6 text-zinc-500">{data?.message}</p><div className="mt-5 rounded-2xl bg-zinc-50 p-5"><p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Required runtime variables</p><code className="mt-3 block text-xs leading-6">GOOGLE_SERVICE_ACCOUNT_EMAIL<br/>GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY<br/>GOOGLE_SEARCH_CONSOLE_SITE <span className="text-zinc-400">(optional, defaults to domain property)</span><br/>GA4_PROPERTY_ID <span className="text-zinc-400">(optional, adds page views/users)</span></code></div></div>;

 const topPages=data.topPages||[],topBlogs=data.topBlogs||[];
 return <div className="space-y-6">
  <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-zinc-400">Organic visibility</p><h2 className="mt-1 text-3xl font-black tracking-tight">Search Insights</h2><p className="mt-1 text-sm text-zinc-500">Google Search Console{data.sources?.ga4?" + GA4":""} · final data through {data.endDate}</p></div><select value={days} onChange={e=>setDays(Number(e.target.value))} className="rounded-xl border bg-white px-4 py-2.5 text-sm font-bold"><option value={7}>Last 7 days</option><option value={30}>Last 30 days</option><option value={90}>Last 90 days</option></select></div>
  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{[["Organic Clicks",fmt(data.summary.clicks)],["Search Impressions",fmt(data.summary.impressions)],["CTR",pct(data.summary.ctr)],["Avg. Position",Number(data.summary.position||0).toFixed(1)]].map(([a,b])=><div key={a} className="rounded-2xl border bg-white p-5"><div className="text-xs font-bold uppercase tracking-wider text-zinc-400">{a}</div><div className="mt-2 text-3xl font-black">{b}</div></div>)}</div>
  {(data.dailyData?.length>1)&&(()=>{
   const dd=data.dailyData as {date:string,clicks:number,impressions:number,ctr:number,position:number}[];
   const W=480,H=180,PL=40,PR=10,PT=10,PB=40,cw=W-PL-PR,ch=H-PT-PB;
   function poly(vals:number[],min:number,max:number){const range=max-min||1;return vals.map((v,i)=>`${PL+i*(cw/(vals.length-1))},${PT+ch-((v-min)/range)*ch}`).join(" ")}
   function labels(dates:string[]){const step=Math.max(1,Math.floor(dates.length/5));return dates.map((d,i)=>i%step===0||i===dates.length-1?{x:PL+i*(cw/(dates.length-1)),label:d.slice(5)}:null).filter(Boolean) as {x:number,label:string}[]}
   const clicks=dd.map(d=>d.clicks),impr=dd.map(d=>d.impressions);
   const cMin=0,cMax=Math.max(...clicks,1),iMin=0,iMax=Math.max(...impr,1);
   const ctrs=dd.map(d=>d.ctr*100),positions=dd.map(d=>d.position);
   const ctrMin=0,ctrMax=Math.max(...ctrs,0.1);
   const posMin=Math.min(...positions),posMax=Math.max(...positions);
   const posInv=positions.map(p=>posMax+posMin-p);
   const ticks=labels(dd.map(d=>d.date));
   return <div className="grid gap-3 xl:grid-cols-2">
    <div className="rounded-2xl border bg-white p-5">
     <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Clicks & Impressions</h3>
     <div className="mt-1 flex gap-4 text-[11px] text-zinc-400"><span className="flex items-center gap-1"><span className="inline-block h-0.5 w-4 bg-black"/> Clicks</span><span className="flex items-center gap-1"><span className="inline-block h-0.5 w-4 bg-zinc-300"/> Impressions</span></div>
     <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 w-full" preserveAspectRatio="xMidYMid meet">
      {[0,0.25,0.5,0.75,1].map(f=><line key={f} x1={PL} x2={W-PR} y1={PT+ch*(1-f)} y2={PT+ch*(1-f)} stroke="#f4f4f5" strokeWidth={1}/>)}
      <polyline points={poly(impr,iMin,iMax)} fill="none" stroke="#d4d4d8" strokeWidth={2}/>
      <polyline points={poly(clicks,cMin,cMax)} fill="none" stroke="#000" strokeWidth={2}/>
      {ticks.map(t=><text key={t.label} x={t.x} y={H-8} textAnchor="middle" className="fill-zinc-400" style={{fontSize:10}}>{t.label}</text>)}
      <text x={4} y={PT+6} className="fill-zinc-400" style={{fontSize:9}}>{fmt(cMax)}</text>
      <text x={4} y={PT+ch} className="fill-zinc-400" style={{fontSize:9}}>0</text>
     </svg>
    </div>
    <div className="rounded-2xl border bg-white p-5">
     <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">CTR & Position</h3>
     <div className="mt-1 flex gap-4 text-[11px] text-zinc-400"><span className="flex items-center gap-1"><span className="inline-block h-0.5 w-4 bg-black"/> CTR %</span><span className="flex items-center gap-1"><span className="inline-block h-0.5 w-4 bg-zinc-300"/> Position (lower is better)</span></div>
     <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 w-full" preserveAspectRatio="xMidYMid meet">
      {[0,0.25,0.5,0.75,1].map(f=><line key={f} x1={PL} x2={W-PR} y1={PT+ch*(1-f)} y2={PT+ch*(1-f)} stroke="#f4f4f5" strokeWidth={1}/>)}
      <polyline points={poly(posInv,posMin,posMax)} fill="none" stroke="#d4d4d8" strokeWidth={2}/>
      <polyline points={poly(ctrs,ctrMin,ctrMax)} fill="none" stroke="#000" strokeWidth={2}/>
      {ticks.map(t=><text key={t.label} x={t.x} y={H-8} textAnchor="middle" className="fill-zinc-400" style={{fontSize:10}}>{t.label}</text>)}
      <text x={4} y={PT+6} className="fill-zinc-400" style={{fontSize:9}}>{ctrMax.toFixed(1)}%</text>
      <text x={4} y={PT+ch} className="fill-zinc-400" style={{fontSize:9}}>0%</text>
     </svg>
    </div>
   </div>})()}
  {data.errors?.length>0&&<div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">{data.errors.join(" · ")}</div>}
  <div className="grid gap-6 xl:grid-cols-2">
   <section className="rounded-2xl border bg-white p-6"><div className="flex items-center gap-2"><Search size={17}/><h3 className="font-extrabold">Top search queries</h3></div><div className="mt-4 overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left text-xs text-zinc-400"><th className="py-2">Keyword</th><th>Clicks</th><th>Impr.</th><th>CTR</th><th>Pos.</th></tr></thead><tbody>{(data.topQueries||[]).map((x:any)=><tr key={x.query} className="border-t"><td className="max-w-72 py-3 pr-3 font-semibold">{x.query}</td><td>{fmt(x.clicks)}</td><td>{fmt(x.impressions)}</td><td>{pct(x.ctr)}</td><td>{Number(x.position).toFixed(1)}</td></tr>)}</tbody></table></div></section>
   <section className="rounded-2xl border bg-white p-6"><div className="flex items-center gap-2"><BarChart3 size={17}/><h3 className="font-extrabold">Most popular pages</h3></div><div className="mt-4 space-y-2">{topPages.slice(0,15).map((x:any)=><div key={x.page} className="flex items-center justify-between gap-4 rounded-xl bg-zinc-50 p-3"><div className="min-w-0"><div className="truncate text-sm font-bold">{path(x.page)}</div><div className="text-[11px] text-zinc-400">{data.sources?.ga4?`${fmt(x.users)} users · ${fmt(x.sessions)} sessions`:`${fmt(x.impressions)} impressions · position ${Number(x.position).toFixed(1)}`}</div></div><div className="shrink-0 text-right"><div className="font-black">{fmt(data.sources?.ga4?x.views:x.clicks)}</div><div className="text-[10px] uppercase text-zinc-400">{data.sources?.ga4?"views":"clicks"}</div></div></div>)}</div></section>
  </div>
  <section className="rounded-2xl border bg-white p-6"><div className="flex items-center gap-2"><FileText size={17}/><h3 className="font-extrabold">Top blog content</h3></div><p className="mt-1 text-xs text-zinc-400">Blogs receiving the most {data.sources?.ga4?"page views":"organic clicks"} in this period.</p><div className="mt-4 grid gap-2 md:grid-cols-2">{topBlogs.map((x:any)=><a key={x.page} href={x.page.startsWith("http")?x.page:`https://themarkitmedia.com${x.page}`} target="_blank" className="flex items-center justify-between gap-3 rounded-xl border p-4 hover:bg-zinc-50"><div className="min-w-0"><div className="truncate text-sm font-bold">{path(x.page)}</div><div className="text-xs text-zinc-400">{x.source}</div></div><div className="flex items-center gap-2"><b>{fmt(data.sources?.ga4?x.views:x.clicks)}</b><ExternalLink size={13}/></div></a>)}</div>{!topBlogs.length&&<p className="py-8 text-center text-sm text-zinc-400">No blog traffic recorded in this period.</p>}</section>
 </div>
}
