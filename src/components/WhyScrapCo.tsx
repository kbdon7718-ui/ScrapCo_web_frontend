import { BadgeCheck, Banknote, Clock, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Verified pickup partners",
    desc: "We work with trusted vendors and maintain quality checks.",
    icon: ShieldCheck,
  },
  {
    title: "Payment on pickup",
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
    <section className="relative overflow-hidden rounded-3xl bg-slate-50 p-8 sm:p-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -bottom-28 h-72 w-72 rounded-full bg-emerald-200/25 blur-3xl" />
        <div className="absolute -right-32 -top-28 h-72 w-72 rounded-full bg-sky-200/25 blur-3xl" />
      </div>

      <div className="relative">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Features</div>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
          Why ScrapCo
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Built for trust, speed, and a cleaner recycling loop.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {features.slice(0, 3).map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-white/70 p-7 shadow-sm ring-1 ring-slate-200/60 backdrop-blur transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                <f.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-base font-semibold text-slate-900">{f.title}</div>
              <div className="mt-2 text-sm leading-7 text-slate-600">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
