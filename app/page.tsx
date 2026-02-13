import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
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
            "Delhi",
            "Noida",
            "Gurugram",
            "Ghaziabad",
            "Faridabad",
          ].map((area) => (
            <span
              key={area}
              className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200"
            >
              {area}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
