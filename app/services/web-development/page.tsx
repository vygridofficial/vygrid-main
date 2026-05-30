import type { Metadata } from 'next';
import WebDevelopmentClient from '@/components/sections/WebDevelopmentClient';

export const metadata: Metadata = {
  title: "Premium Web Development Services",
  description: "Vygrid Digital Studio builds blazing-fast Next.js websites, custom e-commerce engines, PWAs, and high-converting landing pages. Fast, secure, and optimized.",
};

export default function WebDevelopmentServicesPage() {
  return <WebDevelopmentClient />;
}
