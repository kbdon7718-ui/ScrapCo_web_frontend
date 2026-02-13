"use client";

import { motion } from "framer-motion";
import {
  Newspaper,
  Recycle,
  Cpu,
  Milk,
  Bolt,
  Package,
} from "lucide-react";

const items = [
  { title: "Paper", desc: "Newspaper, books, cartons", icon: Newspaper },
  { title: "Metal", desc: "Iron, steel, utensils", icon: Package },
  { title: "Plastic", desc: "Bottles, containers", icon: Milk },
  { title: "E‑Waste", desc: "Laptops, cables, gadgets", icon: Cpu },
  { title: "Mixed", desc: "Sorted at pickup", icon: Recycle },
  { title: "Batteries", desc: "Handled safely", icon: Bolt },
];

export default function CategoryGrid() {
  return (
    <section className="mt-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-[var(--font-serif)] text-2xl font-semibold text-slate-900">
            What we pick up
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Common scrap categories we handle regularly.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {items.map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-3xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
              <item.icon className="h-5 w-5" />
            </div>
            <div className="mt-3 text-sm font-semibold text-slate-900">
              {item.title}
            </div>
            <div className="mt-1 text-xs text-slate-600">{item.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
