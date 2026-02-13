export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Our story
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-slate-900 sm:text-4xl">
          About ScrapCo
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          ScrapCo is building a simple, transparent way for households and small
          businesses to sell scrap — with clear pricing, doorstep pickup, and a
          process that respects your time.
        </p>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Why we exist</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Selling scrap shouldn’t feel uncertain. Our goal is to make pickups
            predictable: you book, we arrive, and you get a fair outcome.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            We’re focused on building trust through simple workflows and clear
            communication — from the moment you request a pickup to the moment it
            gets completed.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">What we promise</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li className="flex gap-2">
              <span className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-slate-300" />
              <span>Transparent pricing signals — no confusing surprises.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-slate-300" />
              <span>Doorstep pickup designed around your schedule.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-slate-300" />
              <span>Respectful service for homes and small businesses.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-base font-semibold text-slate-900">How ScrapCo works</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Step 1
            </div>
            <div className="mt-1 font-semibold text-slate-900">Request a pickup</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Tell us your address, time slot, and what you’re selling.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Step 2
            </div>
            <div className="mt-1 font-semibold text-slate-900">We confirm & arrive</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              A pickup is scheduled and fulfilled with clear updates.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Step 3
            </div>
            <div className="mt-1 font-semibold text-slate-900">Pickup completes</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Your request gets completed and tracked end-to-end.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Built for impact</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          When scrap is collected the right way, it reduces landfill pressure and
          keeps materials in circulation. We’re proud to support cleaner, more
          efficient local recycling — one pickup at a time.
        </p>
      </section>
    </main>
  );
}
