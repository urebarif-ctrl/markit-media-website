import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildLocationMetadata, CityLocationLanding, locationProfiles } from "@/components/location-landing";

const US_CITIES = ["new-york","los-angeles","chicago","houston","miami","san-francisco","dallas","atlanta","boston","seattle","denver","phoenix","austin","san-diego"] as const;

export function generateStaticParams(){ return US_CITIES.map((city)=>({city})); }

export async function generateMetadata({params}:{params:Promise<{city:string}>}):Promise<Metadata>{
  const {city}=await params;
  const profile=locationProfiles[city];
  if(!profile || profile.countrySlug!=="united-states") return {};
  return buildLocationMetadata(city);
}

export default async function USCityPage({params}:{params:Promise<{city:string}>}){
  const {city}=await params;
  const profile=locationProfiles[city];
  if(!profile || profile.countrySlug!=="united-states" || !US_CITIES.includes(city as any)) notFound();
  return <CityLocationLanding cityKey={city}/>;
}
