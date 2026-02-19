import type { Metadata } from "next";
import Link from "next/link";

const cityConfig: Record<string, { name: string; state?: string }> = {
  narnaul: { name: "Narnaul", state: "Haryana" },
  singhana: { name: "Singhana", state: "Rajasthan" },
  gorakhpur: { name: "Gorakhpur", state: "Uttar Pradesh" },
};

export function generateStaticParams() {
  return Object.keys(cityConfig).map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const cfg = cityConfig[city.toLowerCase()];
  const label = cfg ? `${cfg.name}${cfg.state ? ", " + cfg.state : ""}` : city;

  return {
    title: `Scrap Pickup in ${label}`,
    description: `Book doorstep scrap pickup in ${label}. Quick scheduling, verified pickup partners, and a transparent process.`,
    alternates: { canonical: `/locations/${encodeURIComponent(city)}` },
    openGraph: {
      title: `Scrap Pickup in ${label} | ScrapCo`,
      description: `Book doorstep scrap pickup in ${label}. Quick scheduling, verified pickup partners, and a transparent process.`,
      url: `https://scrapco.app/locations/${encodeURIComponent(city)}`,
    },
    twitter: {
      title: `Scrap Pickup in ${label} | ScrapCo`,
      description: `Book doorstep scrap pickup in ${label}. Quick scheduling, verified pickup partners, and a transparent process.`,
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cfg = cityConfig[city.toLowerCase()];
  const label = cfg ? `${cfg.name}${cfg.state ? ", " + cfg.state : ""}` : city;

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ScrapCo",
    url: `https://scrapco.app/locations/${encodeURIComponent(city)}`,
    areaServed: label,
    description: `Doorstep scrap pickup service in ${label}.`,
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Service Area</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        Scrap Pickup in {label}
      </h1>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        Book a doorstep scrap pickup in {label}. Share your details, we confirm the slot, and a verified pickup partner
        visits your location.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          className="inline-flex h-11 items-center justify-center rounded-xl bg-green-500 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-600"
          href="/request"
        >
          Book Pickup
        </Link>
        <Link
          className="inline-flex h-11 items-center justify-center rounded-xl bg-white/70 px-5 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200/60 transition-colors hover:bg-white"
          href="/contact"
        >
          Contact
        </Link>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-slate-900">Materials we handle</h2>
        <p className="mt-2 text-sm text-slate-600">Paper, plastic, and metal scrap (availability can vary by area).</p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900">FAQs</h2>
        <div className="mt-4 space-y-4 text-sm text-slate-700">
          <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <div className="font-semibold text-slate-900">Do you provide scrap pickup near me?</div>
            <div className="mt-1 text-slate-600">
              If you’re within {label} service coverage, you can book via the pickup form.
            </div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <div className="font-semibold text-slate-900">How fast is pickup confirmation?</div>
            <div className="mt-1 text-slate-600">We typically confirm after receiving your booking details.</div>
          </div>
        </div>
      </section>
    </main>
  );
}
