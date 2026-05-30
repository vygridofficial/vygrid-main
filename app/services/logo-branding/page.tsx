import type { Metadata } from 'next';
import LogoBrandingClient from '@/components/sections/LogoBrandingClient';

export const metadata: Metadata = {
  title: "Premium Logo & Brand Identity Design Services",
  description: "Vygrid Digital Studio designs mathematically precise logos, synced Figma brand identity kits, social media posting matrices, and luxury packaging designs.",
};

export default function LogoBrandingServicesPage() {
  return <LogoBrandingClient />;
}
