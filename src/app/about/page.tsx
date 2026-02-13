import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <header className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Our story</div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            About ScrapCo
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
            ScrapCo is building a simple, transparent way for households and small businesses to sell scrap — with clear pricing, doorstep pickup, and a process that respects your time.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-slate-50 p-4">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src="/illustrations/how-it-works.png"
              alt="Scrap pickup illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </header>

      <div className="mt-20 grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-white/70 p-8 shadow-sm ring-1 ring-slate-200/60 backdrop-blur">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Purpose</div>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">Why we exist</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Selling scrap shouldn’t feel uncertain. Our goal is to make pickups predictable: you book, we arrive, and you get a fair outcome.
          </p>
        </div>

        <div className="rounded-3xl bg-white/70 p-8 shadow-sm ring-1 ring-slate-200/60 backdrop-blur">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Promise</div>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">What we promise</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <li>Transparent pricing signals — no confusing surprises.</li>
            <li>Doorstep pickup designed around your schedule.</li>
            <li>Respectful service for homes and small businesses.</li>
          </ul>
        </div>

        <div className="rounded-3xl bg-white/70 p-8 shadow-sm ring-1 ring-slate-200/60 backdrop-blur">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Impact</div>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">Built for impact</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            When scrap is collected the right way, it reduces landfill pressure and keeps materials in circulation — one pickup at a time.
          </p>
        </div>
      </div>
    </main>
  );
}
