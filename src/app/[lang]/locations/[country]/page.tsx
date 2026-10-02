import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildCountryMetadata, CountryLocationLanding } from "@/components/location-landing";

const COUNTRIES = ["pakistan","canada","uae","uk","australia","saudi-arabia"] as const;

export function generateStaticParams(){ return COUNTRIES.map((country)=>({country})); }

export async function generateMetadata({params}:{params:Promise<{country:string}>}):Promise<Metadata>{
  const {country}=await params;
  if(!COUNTRIES.includes(country as any)) return {};
  return buildCountryMetadata(country);
}

export default async function CountryPage({params}:{params:Promise<{country:string}>}){
  const {country}=await params;
  if(!COUNTRIES.includes(country as any)) notFound();
  return <CountryLocationLanding countryKey={country}/>;
}
