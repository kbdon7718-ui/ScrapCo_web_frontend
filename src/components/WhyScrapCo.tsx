import { BadgeCheck, Banknote, Clock, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Verified pickup partners",
    desc: "We work with trusted vendors and maintain quality checks.",
    icon: ShieldCheck,
  },
  {
    title: "Instant payment",
    desc: "Get paid right after weighing via UPI or cash.",
    icon: Banknote,
  },
  {
    title: "Transparent weighing",
    desc: "Fair rates with clear weighing at your doorstep.",
    icon: BadgeCheck,
  },
  {
    title: "Fast scheduling",
    desc: "Pick a time slot that fits your day.",
    icon: Clock,
  },
];

export default function WhyScrapCo() {
  return (
    <section className="mt-12">
      <h2 className="font-[var(--font-serif)] text-2xl font-semibold text-slate-900">
        Why ScrapCo
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Built for trust, speed, and a cleaner recycling loop.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
              <f.icon className="h-5 w-5" />
            </div>
            <div className="mt-3 text-base font-semibold text-slate-900">
              {f.title}
            </div>
            <div className="mt-1 text-sm text-slate-600">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
