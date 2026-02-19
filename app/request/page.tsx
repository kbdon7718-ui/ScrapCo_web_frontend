import RequestPickupForm from "@/components/RequestPickupForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Pickup",
  description:
    "Schedule a scrap pickup from your home or business. Serving Narnaul, Singhana, and Gorakhpur with verified pickup partners.",
  alternates: { canonical: "/request" },
  openGraph: {
    title: "Book a Scrap Pickup | ScrapCo",
    description:
      "Schedule a scrap pickup from your home or business. Serving Narnaul, Singhana, and Gorakhpur with verified pickup partners.",
    url: "https://scrapco.app/request",
  },
  twitter: {
    title: "Book a Scrap Pickup | ScrapCo",
    description:
      "Schedule a scrap pickup from your home or business. Serving Narnaul, Singhana, and Gorakhpur with verified pickup partners.",
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

    <div className="mt-8 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
      <div className="text-sm font-semibold text-slate-900">What happens next?</div>
      <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700">
        <li>You submit your pickup details.</li>
        <li>We confirm the slot.</li>
        <li>A verified pickup partner visits your location.</li>
      </ol>
      <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Currently serving</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {["Narnaul, Haryana", "Singhana, Rajasthan", "Gorakhpur, UP"].map((a) => (
          <span key={a} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
            {a}
          </span>
        ))}
      </div>
    </div>
    </main>
  );
}
