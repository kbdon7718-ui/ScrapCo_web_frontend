"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Newspaper, Cpu, Recycle, ShieldCheck } from "lucide-react";

import { useShineVars } from "@/components/useShineVars";

export default function HeroSection() {
  const shine = useShineVars();

  return (
    <section className="rounded-3xl bg-gradient-to-br from-sky-50 to-white p-8 ring-1 ring-slate-200 md:p-12">
      <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
            <ShieldCheck className="h-4 w-4 text-sky-600" />
            India’s trusted recycling partner
          </div>

          <h1 className="mt-4 font-[var(--font-serif)] text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            Sell Your Scrap. Get Paid Instantly.
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 md:text-base">
            Book a doorstep pickup in minutes. We collect, weigh transparently,
            and pay instantly—no app download required.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/request"
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-sky-500 px-5 text-sm font-semibold text-white shadow-sm hover:bg-sky-600"
              >
                Book Pickup
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/about"
                className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
              >
                Learn more
              </Link>
            </motion.div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <div className="flex -space-x-2">
              {["bg-sky-200", "bg-emerald-200", "bg-slate-200"].map((c, i) => (
                <span
                  key={i}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full ring-2 ring-white ${c}`}
                />
              ))}
            </div>
            <div className="text-sm">
              <div className="font-semibold text-slate-900">4.9/5 rating</div>
              <div className="text-slate-600">from local households</div>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { title: "Transparent rates", desc: "No surprises", icon: CheckCircle2 },
              { title: "Instant payment", desc: "UPI supported", icon: Recycle },
              { title: "Verified vendors", desc: "Trusted network", icon: ShieldCheck },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
              >
                <item.icon className="h-5 w-5 text-green-600" />
                <div className="mt-2 text-sm font-semibold text-slate-900">
                  {item.title}
                </div>
                <div className="mt-1 text-sm text-slate-600">{item.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="lg:pt-2"
        >
          <div
            onMouseMove={shine.onMove}
            onMouseLeave={shine.onLeave}
            className="shine rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-xl backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-sky-700">Live Price List</div>
                <div className="mt-1 font-[var(--font-serif)] text-xl font-semibold text-slate-900">
                  Today’s Rates
                </div>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                Updated recently
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              <PriceRow icon={<Newspaper className="h-4 w-4" />} label="Newspaper" price="₹12" unit="/kg" />
              <PriceRow icon={<Recycle className="h-4 w-4" />} label="Iron" price="₹28" unit="/kg" />
              <PriceRow icon={<Cpu className="h-4 w-4" />} label="E-Waste" price="₹35" unit="/kg" />
            </div>

            <div className="mt-6">
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/request"
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-green-600 px-5 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
                >
                  Schedule Pickup
                </Link>
              </motion.div>
              <div className="mt-3 text-xs text-slate-500">
                Final price depends on on-site weight & quality.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PriceRow({
  icon,
  label,
  price,
  unit,
}: {
  icon: React.ReactNode;
  label: string;
  price: string;
  unit: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
          {icon}
        </span>
        <div>
          <div className="text-sm font-semibold text-slate-900">{label}</div>
          <div className="text-xs text-slate-500">Doorstep pickup</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-semibold text-slate-900">{price}</div>
        <div className="text-xs text-slate-500">{unit}</div>
      </div>
    </div>
  );
}
