import type { Metadata } from "next";
import { Playfair_Display, Inter, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollRestoration from "@/components/ui/ScrollRestoration";
import "@/app/globals.css";
import { getCMSData } from "@/lib/cms";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCMSData();
  const companyName = data.generalSettings?.companyName || "Vygrid Digital Studio";
  const faviconUrl = data.generalSettings?.faviconUrl || "/favicon.ico";

  return {
    title: {
      default: `${companyName} | Custom Web Engineering & Brand Curation`,
      template: `%s | ${companyName}`,
    },
    description: `${companyName} builds editorial-grade custom websites and brand identities for established, founder-led businesses. Obsessively minimal, typography-led.`,
    metadataBase: new URL("https://vygrid.studio"),
    keywords: ["Web Engineering", "Logo Curation", "Brand Identity Kit", "Established Brands", "Editorial Design", "Bespoke Web Applications"],
    icons: {
      icon: [
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: faviconUrl }
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
      ],
      shortcut: faviconUrl
    },
    manifest: '/site.webmanifest',
    openGraph: {
      title: `${companyName} | Custom Web Engineering & Brand Curation`,
      description: `${companyName} builds editorial-grade custom websites and brand identities for established, founder-led businesses.`,
      url: "https://vygrid.studio",
      siteName: companyName,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${companyName} | Custom Web Engineering & Brand Curation`,
      description: "Editorial custom web engineering and branding design studio.",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${ibmPlexMono.variable} ${plusJakarta.variable}`}>
      <body className="antialiased bg-[#0A0A0A] text-[#F5F0EB] min-h-screen flex flex-col selection:bg-[#C8B89A]/30 selection:text-[#F5F0EB]">
        {/* Scroll Restoration Staged under Suspense */}
        <Suspense fallback={null}>
          <ScrollRestoration />
        </Suspense>
        {/* Subtle scanline background grain overlay */}
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.015] bg-noise bg-repeat" />
        <Navbar />
        <main className="flex-grow pt-[80px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
