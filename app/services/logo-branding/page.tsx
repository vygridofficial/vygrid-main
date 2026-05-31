import type { Metadata } from 'next';
import LogoBrandingClient from '@/components/sections/LogoBrandingClient';
import { getCMSData } from '@/lib/cms';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCMSData();
  const companyName = data.generalSettings?.companyName || "Vygrid Digital Studio";
  return {
    title: `Premium Logo & Brand Identity Design Services | ${companyName}`,
    description: `${companyName} designs mathematically precise logos, synced Figma brand identity kits, social media posting matrices, and luxury packaging designs.`,
  };
}

export default async function LogoBrandingServicesPage() {
  const data = await getCMSData();
  return <LogoBrandingClient companyName={data.generalSettings?.companyName} />;
}
