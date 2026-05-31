import type { Metadata } from 'next';
import BlogClient from '@/components/sections/BlogClient';
import { getCMSData } from '@/lib/cms';
import { formatDynamicText } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCMSData();
  const companyName = data.generalSettings?.companyName || "Vygrid Digital Studio";
  const seo = data.seoSettings?.blog || {
    title: "The Vygrid Journal | Vygrid Digital Studio",
    description: "Insights on typography, engineering speeds, and digital strategy for modern founder-led brands."
  };
  return {
    title: formatDynamicText(seo.title, companyName),
    description: formatDynamicText(seo.description, companyName),
  };
}

export default async function BlogPage() {
  const data = await getCMSData();
  return (
    <BlogClient blogPosts={data.blogPosts} />
  );
}
