import { Droplets, Leaf, Recycle, Zap } from "lucide-react";
import Image from "next/image";

const stats = [
  { label: "Waste diverted", value: "1.2T+", icon: Recycle },
  { label: "Water saved", value: "18K L", icon: Droplets },
  { label: "Trees saved", value: "80+", icon: Leaf },
  { label: "Energy saved", value: "2.1M Wh", icon: Zap },
];

export default function ImpactStats() {
  return (
    <section>
      <div className="relative overflow-hidden rounded-3xl bg-sky-600 px-6 py-12 text-white shadow-sm ring-1 ring-sky-500/40 md:px-10">
        <div className="pointer-events-none absolute -right-6 -top-4 hidden h-44 w-60 opacity-30 md:block">
          <Image
            src="/illustrations/impact.png"
            alt="Impact illustration"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white/80">Impact</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Aaj ka scrap, kal ka behtar shehar.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85">
              Every pickup keeps valuable materials out of landfills and routes them
              back into the recycling chain.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="mt-3 text-2xl font-semibold">{s.value}</div>
              <div className="mt-1 text-sm text-white/80">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
