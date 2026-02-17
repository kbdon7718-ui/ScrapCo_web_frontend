import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const siteUrl = "https://scrapco.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ScrapCo — Sell Your Scrap. Get Paid Instantly.",
    template: "%s | ScrapCo",
  },
  description: "ScrapCo helps you sell scrap from home with instant payment and scheduled pickups.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.png",
  },
  verification: {
    google: "Iud51W3dGKuXnw64VK9fsRBgCHMZ3jvcX9VoHBG2uGI",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "ScrapCo",
    title: "ScrapCo — Sell Your Scrap. Get Paid Instantly.",
    description: "ScrapCo helps you sell scrap from home with instant payment and scheduled pickups.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScrapCo — Sell Your Scrap. Get Paid Instantly.",
    description: "ScrapCo helps you sell scrap from home with instant payment and scheduled pickups.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ScrapCo",
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
  };

  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
