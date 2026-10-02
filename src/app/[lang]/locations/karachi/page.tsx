import { buildLocationMetadata, CityLocationLanding } from "@/components/location-landing";
export const metadata = buildLocationMetadata("karachi");
export default function KarachiPage(){ return <CityLocationLanding cityKey="karachi"/>; }
