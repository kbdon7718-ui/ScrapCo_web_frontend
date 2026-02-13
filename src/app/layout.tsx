import type { Metadata } from "next";
import "./globals.css";

import { Fraunces, Inter } from "next/font/google";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "ScrapCo — Sell Your Scrap. Get Paid Instantly.",
  description:
    "ScrapCo helps you sell scrap from home with instant payment and scheduled pickups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} min-h-screen bg-white text-slate-900`}>
        <div className="bg-noise">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
