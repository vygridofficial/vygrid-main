import type { Metadata } from 'next';
import ContactClient from '@/components/sections/ContactClient';
import { getCMSData } from '@/lib/cms';
import { formatDynamicText } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCMSData();
  const companyName = data.generalSettings?.companyName || "Vygrid Digital Studio";
  const seo = data.seoSettings?.contact || {
    title: "Get a Quote | Contact Our Founders",
    description: "Secure a strategic project brief with Vygrid Digital Studio. Input your budget and timeline, and our founders will review your goals in 24 hours."
  };
  return {
    title: formatDynamicText(seo.title, companyName),
    description: formatDynamicText(seo.description, companyName),
  };
}

export default async function ContactPage() {
  const data = await getCMSData();
  return (
    <ContactClient 
      settings={data.contactSettings} 
      companyName={data.generalSettings?.companyName}
    />
  );
}
