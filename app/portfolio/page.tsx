import type { Metadata } from 'next';
import { Suspense } from 'react';
import PortfolioClient from '@/components/sections/PortfolioClient';
import { getCMSData } from '@/lib/cms';
import { formatDynamicText } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCMSData();
  const companyName = data.generalSettings?.companyName || "Vygrid Digital Studio";
  const seo = data.seoSettings?.portfolio || {
    title: "Case Studies Portfolio | Vygrid Digital Studio",
    description: "Browse Vygrid Digital Studio's selected case studies tracking web application developments, high-energy e-commerce portals, and custom corporate guidelines."
  };
  return {
    title: formatDynamicText(seo.title, companyName),
    description: formatDynamicText(seo.description, companyName),
  };
}

export default async function PortfolioPage() {
  const data = await getCMSData();
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
      <PortfolioClient projects={data.projects} />
    </Suspense>
  );
}
