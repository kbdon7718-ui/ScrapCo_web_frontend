import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scrap Pickup in Narnaul, Singhana & Gorakhpur",
  description:
    "Book doorstep scrap pickup with ScrapCo. Transparent process, verified pickup partners, and quick scheduling in Narnaul, Singhana, and Gorakhpur.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Scrap Pickup in Narnaul, Singhana & Gorakhpur | ScrapCo",
    description:
      "Book doorstep scrap pickup with ScrapCo. Transparent process, verified pickup partners, and quick scheduling in Narnaul, Singhana, and Gorakhpur.",
    url: "https://scrapco.app/",
  },
  twitter: {
    title: "Scrap Pickup in Narnaul, Singhana & Gorakhpur | ScrapCo",
    description:
      "Book doorstep scrap pickup with ScrapCo. Transparent process, verified pickup partners, and quick scheduling in Narnaul, Singhana, and Gorakhpur.",
  },
};

export default function HomePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I book a scrap pickup?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Open the Book Pickup page, fill your details, and submit. Our team confirms the slot and a verified pickup partner visits your location.",
        },
      },
      {
        "@type": "Question",
        name: "Which areas do you serve today?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Currently we serve Narnaul (Haryana), Singhana (Rajasthan), and Gorakhpur (UP).",
        },
      },
      {
        "@type": "Question",
        name: "What scrap materials do you accept?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We handle common household and shop scrap like paper, plastic, and metal. Availability can vary by area.",
        },
      },
      {
        "@type": "Question",
        name: "How do I contact ScrapCo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use the Contact Us page to send us a message and we’ll reach out shortly.",
        },
      },
    ],
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HeroSection />

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-green-600">Why ScrapCo</div>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">
            Trusted pickup partners
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Verified vendors, transparent rates, and fast scheduling.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-green-600">Instant payment</div>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">
            Get paid on pickup
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Digital payments supported. No hidden fees.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-green-600">Convenience</div>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">
            Book in under a minute
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Raise a pickup request from any device—no app needed.
          </p>
        </div>
      </section>

      <HowItWorks />

      <section className="mt-12 rounded-3xl bg-sky-50 p-8 ring-1 ring-sky-100">
        <h2 className="text-xl font-semibold text-slate-900">Service Areas</h2>
        <p className="mt-2 text-sm text-slate-600">
          We currently support pickups in select areas. Expand coverage coming soon.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { label: "Narnaul, Haryana", href: "/locations/narnaul" },
            { label: "Singhana, Rajasthan", href: "/locations/singhana" },
            { label: "Gorakhpur, UP", href: "/locations/gorakhpur" },
          ].map((area) => (
            <Link
              key={area.href}
              href={area.href}
              className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
            >
              {area.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
