"use client";

import { motion } from "framer-motion";

export default function HowItWorks() {
  return (
    <section className="mt-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-[var(--font-serif)] text-2xl font-semibold text-slate-900">
            How It Works
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            3 simple steps from request to payout.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Step number="01" title="Schedule" desc="Share your pickup details in under a minute." />
        <Step number="02" title="Pickup" desc="We arrive, sort, and weigh transparently." />
        <Step number="03" title="Payment" desc="Instant payout via UPI/cash after weighing." />
      </div>
    </section>
  );
}

function Step({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur"
    >
      <div className="pointer-events-none absolute -top-6 right-3 font-[var(--font-serif)] text-7xl font-semibold text-slate-900/10">
        {number}
      </div>
      <div className="relative">
        <div className="text-xs font-semibold text-sky-700">Step {number}</div>
        <div className="mt-2 text-base font-semibold text-slate-900">{title}</div>
        <div className="mt-1 text-sm text-slate-600">{desc}</div>
      </div>
    </motion.div>
  );
}
