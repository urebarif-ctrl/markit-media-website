import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildLocationMetadata, ServiceLocationLanding, type LocalServiceKey } from "@/components/location-landing";

const SERVICES = ["marketing-agency","ppc-ads","seo-services","social-media-marketing","website-development","branding"] as const;

export function generateStaticParams(){ return SERVICES.map((service)=>({service})); }

export async function generateMetadata({params}:{params:Promise<{service:string}>}):Promise<Metadata>{
  const {service}=await params;
  if(!SERVICES.includes(service as any)) return {};
  return buildLocationMetadata("karachi",service as LocalServiceKey);
}

export default async function KarachiServicePage({params}:{params:Promise<{service:string}>}){
  const {service}=await params;
  if(!SERVICES.includes(service as any)) notFound();
  return <ServiceLocationLanding cityKey="karachi" serviceKey={service as LocalServiceKey}/>;
}
