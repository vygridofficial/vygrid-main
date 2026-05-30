import type { Metadata } from 'next';
import { Suspense } from 'react';
import PortfolioClient from '@/components/sections/PortfolioClient';

export const metadata: Metadata = {
  title: "Case Studies Portfolio",
  description: "Browse Vygrid Digital Studio's selected case studies tracking web application developments, high-energy e-commerce portals, and custom corporate guidelines.",
};

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
      <PortfolioClient />
    </Suspense>
  );
}
