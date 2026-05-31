import type { Metadata } from 'next';
import PricingClient from '@/components/sections/PricingClient';
import { getCMSData } from '@/lib/cms';
import { formatDynamicText } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCMSData();
  const companyName = data.generalSettings?.companyName || "Vygrid Digital Studio";
  const seo = data.seoSettings?.pricing || {
    title: "Pricing & Packages | Vygrid Digital Studio",
    description: "Select from our structured starter, studio, and enterprise web and brand packages."
  };
  return {
    title: formatDynamicText(seo.title, companyName),
    description: formatDynamicText(seo.description, companyName),
  };
}

export default async function PricingPage() {
  const data = await getCMSData();
  return (
    <PricingClient
      servicePricing={data.servicePricing || []}
      pageSettings={data.pricingPageSettings}
    />
  );
}

