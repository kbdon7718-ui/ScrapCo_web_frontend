import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "See where ScrapCo currently offers doorstep scrap pickup: Narnaul (Haryana), Singhana (Rajasthan), and Gorakhpur (UP).",
  alternates: { canonical: "/service-areas" },
  openGraph: {
    title: "Service Areas | ScrapCo",
    description:
      "See where ScrapCo currently offers doorstep scrap pickup: Narnaul (Haryana), Singhana (Rajasthan), and Gorakhpur (UP).",
    url: "https://scrapco.app/service-areas",
  },
  twitter: {
    title: "Service Areas | ScrapCo",
    description:
      "See where ScrapCo currently offers doorstep scrap pickup: Narnaul (Haryana), Singhana (Rajasthan), and Gorakhpur (UP).",
  },
};

export default function ServiceAreasPage() {
  const areas = [
    { name: "Narnaul", state: "Haryana", href: "/locations/narnaul" },
    { name: "Singhana", state: "Rajasthan", href: "/locations/singhana" },
    { name: "Gorakhpur", state: "Uttar Pradesh", href: "/locations/gorakhpur" },
  ];

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Coverage</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Service Areas</h1>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        ScrapCo currently offers doorstep scrap pickup in the following areas. Coverage expands over time.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {areas.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-slate-50"
          >
            <div className="text-lg font-semibold text-slate-900">{a.name}</div>
            <div className="mt-1 text-sm text-slate-600">{a.state}</div>
            <div className="mt-4 inline-flex text-sm font-semibold text-sky-700">View details →</div>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/request"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-green-500 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-600"
        >
          Book Pickup
        </Link>
      </div>
    </main>
  );
}
