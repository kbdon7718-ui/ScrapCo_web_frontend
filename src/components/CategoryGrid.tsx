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
    <section>
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Categories
          </div>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            What we pick up
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Common scrap categories we handle regularly.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {items.map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-2xl bg-white/70 p-5 shadow-sm ring-1 ring-slate-200/60 backdrop-blur transition-shadow duration-300 ease-out hover:shadow-lg"
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
