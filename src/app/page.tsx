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
      <main className="mx-auto max-w-6xl px-4 py-10">
        <HeroSection />

        <CategoryGrid />

        <HowItWorks />

        <ImpactStats />

        <WhyScrapCo />

        <ScheduleLeadForm />

        <section className="mt-12 rounded-3xl bg-sky-50 p-8 ring-1 ring-sky-100">
          <h2 className="font-[var(--font-serif)] text-2xl font-semibold text-slate-900">
            Service Areas
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            We currently support pickups in select areas. Expansion coming soon.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Delhi", "Noida", "Gurugram", "Ghaziabad", "Faridabad"].map((area) => (
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

      <ContactSection />
    </>
  );
}
