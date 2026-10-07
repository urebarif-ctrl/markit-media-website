import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteSearch } from "@/components/site-search";

export const metadata:Metadata={
 title:"Search the Website",
 description:"Search Markit Media services, industries, locations, tools, resources, case studies and marketing insights.",
 robots:{index:false,follow:true},
};

export default async function SearchPage({params}:{params:Promise<{lang:string}>}){
 const{lang}=await params;
 return <section className="px-6 pb-24 pt-28 lg:px-12 lg:pt-36"><div className="mx-auto max-w-6xl"><div className="max-w-3xl"><span className="text-xs font-extrabold uppercase tracking-[.2em] text-[#5A3ED6]">Website navigator</span><h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold leading-[.95] tracking-tight">Find anything on Markit Media.</h1><p className="mt-6 text-lg leading-8 text-gray-500">Search services, sub-services, industries, countries, cities, tools, resources, client work and published insights from one place.</p></div><div className="mt-10"><Suspense fallback={<div className="border p-5 text-gray-500">Loading search...</div>}><SiteSearch locale={lang}/></Suspense></div><div className="mt-20 border-t pt-10"><h2 className="text-xl font-extrabold">Not sure what to search?</h2><div className="mt-5 flex flex-wrap gap-3">{["Meta Ads","Google Ads","SEO","Website Development","Exterior Cleaning","ROI Calculator","New York","AI Marketing"].map(x=><a key={x} href={"/"+lang+"/search?q="+encodeURIComponent(x)} className="border border-gray-200 px-4 py-2 text-sm font-bold hover:border-black hover:bg-black hover:text-white">{x}</a>)}</div></div></div></section>
}
