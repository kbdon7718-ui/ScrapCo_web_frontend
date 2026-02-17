import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ScrapCo — Sell Your Scrap. Get Paid Instantly.",
  description:
    "ScrapCo helps you sell scrap from home with instant payment and scheduled pickups.",
  icons: {
    icon: "/icon.png",
  },
  verification: {
    google: "Iud51W3dGKuXnw64VK9fsRBgCHMZ3jvcX9VoHBG2uGI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
