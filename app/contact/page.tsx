import type { Metadata } from "next";
import ContactUsFormCard from "@/components/ContactUsFormCard";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact ScrapCo for pickup support and partnerships.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact ScrapCo",
    description: "Contact ScrapCo for pickup support and partnerships.",
    url: "https://scrapco.app/contact",
  },
  twitter: {
    title: "Contact ScrapCo",
    description: "Contact ScrapCo for pickup support and partnerships.",
  },
};

export default function ContactPage() {
  return (
    <main className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="flex justify-center">
          <ContactUsFormCard />
        </div>
      </div>
    </main>
  );
}
