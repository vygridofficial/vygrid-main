import type { Metadata } from 'next';
import AboutClient from '@/components/sections/AboutClient';
import { getCMSData } from '@/lib/cms';
import { formatDynamicText } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCMSData();
  const companyName = data.generalSettings?.companyName || "Vygrid Digital Studio";
  const seo = data.seoSettings?.about || {
    title: "About Our Studio | Vygrid Digital Studio",
    description: "Learn about Vygrid Digital Studio, our convictions of precision engineering and visual integrity, our founding team."
  };
  return {
    title: formatDynamicText(seo.title, companyName),
    description: formatDynamicText(seo.description, companyName),
  };
}

export default async function AboutPage() {
  const data = await getCMSData();
  return (
    <AboutClient
      settings={data.aboutPageSettings}
      team={data.team}
      companyName={data.generalSettings?.companyName}
      companyReg={data.generalSettings?.companyReg}
    />
  );
}
