import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import ScheduleLeadForm from "@/components/ScheduleLeadForm";
import CategoryGrid from "@/components/CategoryGrid";
import ImpactStats from "@/components/ImpactStats";
import WhyScrapCo from "@/components/WhyScrapCo";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <>
      <main className="mx-auto max-w-6xl px-4">
        <div className="py-16 sm:py-20 space-y-24 sm:space-y-28">
          <HeroSection />
          <CategoryGrid />
          <HowItWorks />
          <WhyScrapCo />
          <ImpactStats />
          <ScheduleLeadForm />

          <section className="relative overflow-hidden rounded-3xl bg-slate-50 p-8 sm:p-10">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-sky-200/30 blur-3xl" />
              <div className="absolute -right-28 -bottom-28 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
            </div>

            <div className="relative">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Service areas
              </div>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                Currently serving
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                We currently support pickups in select areas. Expansion coming soon.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Narnaul, Haryana", "Singhana, Rajasthan", "Gorakhpur, UP"].map((area) => (
                  <span
                    key={area}
                    className="rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200/60 backdrop-blur"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <ContactSection />
    </>
  );
}
