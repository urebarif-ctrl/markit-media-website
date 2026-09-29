"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Result={title:string;href:string;description:string;type:string;breadcrumb:string};

export function SiteSearch({locale="en",compact=false,initialQuery=""}:{locale?:string;compact?:boolean;initialQuery?:string}){
 const params=useSearchParams(),router=useRouter();
 const [q,setQ]=useState(initialQuery||params.get("q")||"");
 const [results,setResults]=useState<Result[]>([]);
 const [loading,setLoading]=useState(false);
 useEffect(()=>{
  const term=q.trim();
  if(term.length<2){setResults([]);setLoading(false);return}
  const controller=new AbortController(),timer=setTimeout(async()=>{setLoading(true);try{const r=await fetch("/api/search?q="+encodeURIComponent(term)+"&limit="+(compact?12:80),{signal:controller.signal});const d=await r.json();setResults(d.results||[])}catch(e){if(!(e instanceof DOMException&&e.name==="AbortError"))setResults([])}finally{if(!controller.signal.aborted)setLoading(false)}},140);
  return()=>{clearTimeout(timer);controller.abort()}
 },[q,compact]);
 function submit(e:FormEvent){e.preventDefault();const term=q.trim();if(term)router.push("/"+locale+"/search?q="+encodeURIComponent(term))}
 const input=<form onSubmit={submit} className="relative"><label htmlFor={compact?"nav-site-search":"full-site-search"} className="sr-only">Search Markit Media</label><input id={compact?"nav-site-search":"full-site-search"} value={q} onChange={e=>setQ(e.target.value)} autoFocus={compact} placeholder="Search services, tools, blogs, industries, locations..." className={"w-full border border-gray-300 bg-white text-black outline-none focus:border-black "+(compact?"px-4 py-3 text-sm":"px-5 py-5 pr-28 text-base sm:text-lg")}/>{!compact&&<button className="absolute right-2 top-2 bottom-2 bg-black px-6 text-sm font-extrabold text-white hover:bg-gray-800">Search</button>}</form>;
 if(compact)return <div>{input}<div className="flex items-center justify-between px-1 pt-3"><span className="text-[11px] font-bold uppercase tracking-[.14em] text-gray-400">{q.trim()?"Website results":"Search the whole website"}</span>{loading&&<span className="text-xs text-gray-400">Searching...</span>}</div><div className="mt-2 max-h-[460px] overflow-y-auto">{results.map(x=><Link key={x.href} href={x.href} className="block border-b border-gray-50 p-3 hover:bg-gray-50"><span className="block text-[10px] font-bold uppercase tracking-wide text-[#5A3ED6]">{x.type}</span><span className="block text-sm font-bold">{x.title}</span><span className="block truncate text-xs text-gray-400">{x.breadcrumb}</span><span className="mt-0.5 block line-clamp-2 text-xs text-gray-500">{x.description}</span></Link>)}{q.trim().length>=2&&!loading&&!results.length&&<div className="p-4 text-sm text-gray-500">No exact match. Try a related term or open the full search page.</div>}</div>{q.trim()&&<button onClick={()=>router.push("/"+locale+"/search?q="+encodeURIComponent(q.trim()))} className="mt-3 w-full border border-black px-4 py-3 text-sm font-extrabold hover:bg-black hover:text-white">View all results →</button>}</div>;
 const types=["All","Service","Industry","Location","Tool & Resource","Blog","Work","Page"];
 return <div>{input}<div className="mt-5 text-sm text-gray-500">{loading?"Searching the Markit Media website...":q.trim().length>=2?results.length+" results across the website":"Start typing to search the complete public website."}</div><div className="mt-8 space-y-10">{types.map(type=>{const items=type==="All"?results:results.filter(x=>x.type===type);if(!items.length||type==="All")return null;return <section key={type}><h2 className="mb-3 text-xs font-extrabold uppercase tracking-[.18em] text-gray-400">{type}</h2><div className="grid gap-3 md:grid-cols-2">{items.map(x=><Link key={x.href} href={x.href} className="group border border-gray-200 p-5 hover:border-black"><div className="text-xs font-bold text-[#5A3ED6]">{x.breadcrumb}</div><h3 className="mt-1 text-lg font-extrabold group-hover:underline">{x.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">{x.description}</p></Link>)}</div></section>})}</div></div>
}
