import { buildCountryMetadata, CountryLocationLanding } from "@/components/location-landing";
export const metadata = buildCountryMetadata("united-states");
export default function UnitedStatesPage(){ return <CountryLocationLanding countryKey="united-states" />; }
