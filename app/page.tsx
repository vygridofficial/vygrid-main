import React from 'react';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import Services from '@/components/sections/Services';

import PortfolioGrid from '@/components/sections/PortfolioGrid';
import TrustedBy from '@/components/sections/TrustedBy';
import Testimonials from '@/components/sections/Testimonials';
import StartProject from '@/components/sections/StartProject';
import CTA from '@/components/sections/CTA';
import { getCMSData } from '@/lib/cms';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCMSData();
  const seo = data.seoSettings?.home || {
    title: "Vygrid Digital Studio | Custom Web Engineering & Brand Curation",
    description: "Vygrid Digital Studio builds editorial-grade custom websites and brand identities for established, founder-led businesses. Obsessively minimal, typography-led."
  };
  return {
    title: seo.title,
    description: seo.description,
  };
}

export default async function Home() {
  const data = await getCMSData();

  // Structured Schema data dynamically populated from settings
  const companyName = data.generalSettings?.companyName || "Vygrid Digital Studio";
  const contact = data.contactSettings || {
    phone: "+1-000-000-0000",
    address: "Grid Avenue 8, Digital District, 10001, US",
    lat: 40.7128,
    lng: -74.0060,
    linkedin: "https://www.linkedin.com/company/vygrid",
    twitter: "https://twitter.com/vygrid"
  };

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": companyName,
    "image": "https://vygrid.studio/og-image.jpg",
    "@id": "https://vygrid.studio/#localbusiness",
    "url": "https://vygrid.studio",
    "telephone": contact.phone,
    "priceRange": "$$$$",
    "address": contact.address ? {
      "@type": "PostalAddress",
      "streetAddress": contact.address.split(',')[0] || "",
      "addressLocality": contact.address.split(',')[1]?.trim() || "",
      "postalCode": contact.address.split(',')[2]?.trim() || "",
      "addressCountry": "US"
    } : undefined,
    "geo": (contact.lat && contact.lng) ? {
      "@type": "GeoCoordinates",
      "latitude": contact.lat,
      "longitude": contact.lng
    } : undefined,
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
      ...(contact.otherLinks || []).map((l: any) => l.url)
    ].filter(Boolean)
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* Visual Sections */}
      <Hero
        title={data.homepageSettings?.heroTitle}
        subtitle={data.homepageSettings?.heroSubtitle}
        primaryBtn={data.homepageSettings?.heroPrimaryBtn}
        primaryBtnHref={data.homepageSettings?.heroPrimaryBtnHref}
        secondaryBtn={data.homepageSettings?.heroSecondaryBtn}
        secondaryBtnHref={data.homepageSettings?.heroSecondaryBtnHref}
        companyReg={data.generalSettings?.companyReg}
      />
      <Stats stats={data.stats} />
      <Services webServices={data.webServices} brandServices={data.brandServices} />

      <PortfolioGrid projects={data.projects} />
      <TrustedBy />
      <Testimonials testimonials={data.testimonials?.filter((t: any) => t.approved !== false && t.visible !== false)} />
      <StartProject />
      <CTA
        title={data.homepageSettings?.ctaTitle}
        subtitle={data.homepageSettings?.ctaSubtitle}
        buttonText={data.homepageSettings?.ctaButtonText}
        buttonHref={data.homepageSettings?.ctaButtonHref}
        image={data.homepageSettings?.ctaImage}
      />
    </>
  );
}
