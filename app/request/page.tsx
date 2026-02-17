import RequestPickupForm from "@/components/RequestPickupForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Pickup",
  description: "Schedule a scrap pickup from your home or business. Quick booking, transparent rates, and verified pickup partners.",
  alternates: { canonical: "/request" },
  openGraph: {
    title: "Book a Scrap Pickup | ScrapCo",
    description: "Schedule a scrap pickup from your home or business. Quick booking, transparent rates, and verified pickup partners.",
    url: "https://scrapco.app/request",
  },
  twitter: {
    title: "Book a Scrap Pickup | ScrapCo",
    description: "Schedule a scrap pickup from your home or business. Quick booking, transparent rates, and verified pickup partners.",
  },
};

export default function RequestPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Doorstep Scrap Pickup",
    provider: {
      "@type": "Organization",
      name: "ScrapCo",
      url: "https://scrapco.app",
    },
    areaServed: "IN",
    serviceType: "Scrap collection and pickup",
    url: "https://scrapco.app/request",
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <h1 className="text-2xl font-semibold text-slate-900">Book a Pickup</h1>
      <p className="mt-2 text-sm text-slate-600">
        Fill in a few details and we’ll contact you to confirm the slot.
      </p>
      <div className="mt-6">
        <RequestPickupForm />
      </div>
    </main>
  );
}
