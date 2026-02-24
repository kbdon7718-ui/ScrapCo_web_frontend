import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const siteUrl = "https://scrapco.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ScrapCo — Now Live in Selected Areas",
    template: "%s | ScrapCo",
  },
  description:
    "Now live in selected areas. Submit your pickup request and our team will confirm shortly.",
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
    title: "ScrapCo — Now Live in Selected Areas",
    description:
      "Now live in selected areas. Submit your pickup request and our team will confirm shortly.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScrapCo — Now Live in Selected Areas",
    description:
      "Now live in selected areas. Submit your pickup request and our team will confirm shortly.",
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
