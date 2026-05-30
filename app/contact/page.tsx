import type { Metadata } from 'next';
import ContactClient from '@/components/sections/ContactClient';

export const metadata: Metadata = {
  title: "Get a Quote | Contact Our Founders",
  description: "Secure a strategic project brief with Vygrid Digital Studio. Input your budget and timeline, and our founders will review your goals in 24 hours.",
};

export default function ContactPage() {
  return <ContactClient />;
}
