import React from 'react';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import Services from '@/components/sections/Services';
import PortfolioGrid from '@/components/sections/PortfolioGrid';
import TrustedBy from '@/components/sections/TrustedBy';
import Testimonials from '@/components/sections/Testimonials';
import StartProject from '@/components/sections/StartProject';
import CTA from '@/components/sections/CTA';

export default function Home() {
  // LocalBusiness Structured Schema markup
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Vygrid Digital Studio",
    "image": "https://vygrid.studio/og-image.jpg",
    "@id": "https://vygrid.studio/#localbusiness",
    "url": "https://vygrid.studio",
    "telephone": "+1-000-000-0000",
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Grid Avenue 8",
      "addressLocality": "Digital District",
      "postalCode": "10001",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.7128,
      "longitude": -74.0060
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.linkedin.com/company/vygrid",
      "https://twitter.com/vygrid"
    ]
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* Visual Sections */}
      <Hero />
      <Stats />
      <Services />
      <PortfolioGrid />
      <TrustedBy />
      <Testimonials />
      <StartProject />
      <CTA />
    </>
  );
}
