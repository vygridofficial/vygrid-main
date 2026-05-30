import type { Metadata } from 'next';
import AboutClient from '@/components/sections/AboutClient';

export const metadata: Metadata = {
  title: "About Our Studio",
  description: "Learn about Vygrid Digital Studio, our convictions of precision engineering and visual integrity, our horizontal timeline, and our founding team.",
};

export default function AboutPage() {
  return <AboutClient />;
}
