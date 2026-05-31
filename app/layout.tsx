import type { Metadata } from "next";
import { Playfair_Display, Inter, IBM_Plex_Mono, Syne } from "next/font/google";
import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollRestoration from "@/components/ui/ScrollRestoration";
import "@/app/globals.css";

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

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vygrid Digital Studio | Custom Web Engineering & Brand Curation",
    template: "%s | Vygrid Digital Studio",
  },
  description: "Vygrid Digital Studio builds editorial-grade custom websites and brand identities for established, founder-led businesses. Obsessively minimal, typography-led.",
  metadataBase: new URL("https://vygrid.studio"),
  keywords: ["Web Engineering", "Logo Curation", "Brand Identity Kit", "Established Brands", "Editorial Design", "Bespoke Web Applications"],
  openGraph: {
    title: "Vygrid Digital Studio | Custom Web Engineering & Brand Curation",
    description: "Vygrid Digital Studio builds editorial-grade custom websites and brand identities for established, founder-led businesses.",
    url: "https://vygrid.studio",
    siteName: "Vygrid Digital Studio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vygrid Digital Studio | Custom Web Engineering & Brand Curation",
    description: "Editorial custom web engineering and branding design studio.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${ibmPlexMono.variable} ${syne.variable}`}>
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
