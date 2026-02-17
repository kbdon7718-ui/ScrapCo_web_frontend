import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about ScrapCo and our mission to make scrap selling simple with transparent pricing, doorstep pickup, and instant payment.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About ScrapCo",
    description: "Learn about ScrapCo and our mission to make scrap selling simple with transparent pricing, doorstep pickup, and instant payment.",
    url: "https://scrapco.app/about",
  },
  twitter: {
    title: "About ScrapCo",
    description: "Learn about ScrapCo and our mission to make scrap selling simple with transparent pricing, doorstep pickup, and instant payment.",
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-slate-900">About ScrapCo</h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        ScrapCo is building a simple way for households and small businesses to
        sell scrap with transparent pricing, doorstep pickup, and instant payment.
      </p>

      <div className="mt-6">
        <div className="relative overflow-hidden rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src="/illustrations/how-it-works.png"
              alt="Scrap pickup illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
