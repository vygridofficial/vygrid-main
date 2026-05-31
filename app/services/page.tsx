import type { Metadata } from 'next';
import ServicesClient from '@/components/sections/ServicesClient';
import { getCMSData } from '@/lib/cms';
import { formatDynamicText } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCMSData();
  const companyName = data.generalSettings?.companyName || "Vygrid Digital Studio";
  const seo = data.seoSettings?.services || {
    title: "Services & Expertise | Vygrid Digital Studio",
    description: "Explore our web engineering and brand curation services designed for premium conversion and timeless aesthetics."
  };
  return {
    title: formatDynamicText(seo.title, companyName),
    description: formatDynamicText(seo.description, companyName),
  };
}

export default async function ServicesPage() {
  const data = await getCMSData();
  return (
    <ServicesClient
      webServices={data.webServices}
      brandServices={data.brandServices}
    />
  );
}
