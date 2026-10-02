import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildLocationMetadata, locationProfiles, ServiceLocationLanding, type LocalServiceKey } from "@/components/location-landing";

const US_CITIES = ["new-york","los-angeles","chicago","houston","miami","san-francisco","dallas","atlanta","boston","seattle","denver","phoenix","austin","san-diego"] as const;
const SERVICES = ["marketing-agency","ppc-ads","seo-services","website-development"] as const;

export function generateStaticParams(){
  return US_CITIES.flatMap((city)=>SERVICES.map((service)=>({city,service})));
}

export async function generateMetadata({params}:{params:Promise<{city:string;service:string}>}):Promise<Metadata>{
  const {city,service}=await params;
  const profile=locationProfiles[city];
  if(!profile || profile.countrySlug!=="united-states" || !SERVICES.includes(service as any)) return {};
  return buildLocationMetadata(city,service as LocalServiceKey);
}

export default async function USCityServicePage({params}:{params:Promise<{city:string;service:string}>}){
  const {city,service}=await params;
  const profile=locationProfiles[city];
  if(!profile || profile.countrySlug!=="united-states" || !US_CITIES.includes(city as any) || !SERVICES.includes(service as any)) notFound();
  return <ServiceLocationLanding cityKey={city} serviceKey={service as LocalServiceKey}/>;
}
