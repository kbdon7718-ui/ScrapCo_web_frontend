"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Phone, StickyNote } from "lucide-react";

type LeadFormState = {
  phone: string;
  pickupDate: string;
  details: string;
};

export default function ScheduleLeadForm() {
  const router = useRouter();
  const [form, setForm] = useState<LeadFormState>({
    phone: "",
    pickupDate: "",
    details: "",
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      phone: form.phone.trim(),
      pickupDate: form.pickupDate,
      details: form.details.trim(),
    };
    try {
      localStorage.setItem("scrapco_lead_prefill", JSON.stringify(payload));
    } catch {
      // ignore
    }
    router.push("/request");
  }

  return (
    <section className="mt-12">
      <div className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur md:p-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-[var(--font-serif)] text-2xl font-semibold text-slate-900">
              Schedule a Pickup
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Share your phone, preferred date, and material details.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-3">
          <Field label="Phone" icon={<Phone className="h-4 w-4" />}>
            <input
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-sky-400"
              placeholder="+91 9xxxx xxxxx"
            />
          </Field>

          <Field label="Pickup Date" icon={<CalendarDays className="h-4 w-4" />}>
            <input
              type="date"
              value={form.pickupDate}
              onChange={(e) =>
                setForm((p) => ({ ...p, pickupDate: e.target.value }))
              }
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-sky-400"
            />
          </Field>

          <div className="md:col-span-3">
            <Field label="Material Details" icon={<StickyNote className="h-4 w-4" />}>
              <textarea
                value={form.details}
                onChange={(e) =>
                  setForm((p) => ({ ...p, details: e.target.value }))
                }
                className="min-h-[110px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-sky-400"
                placeholder="Example: 8kg newspaper + 2kg plastic bottles"
              />
            </Field>
          </div>

          <div className="md:col-span-3">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-sky-500 px-5 text-sm font-semibold text-white shadow-sm hover:bg-sky-600"
            >
              Continue to Booking
            </motion.button>
            <div className="mt-3 text-xs text-slate-500">
              You’ll confirm address and scrap type on the next step.
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-slate-700">
        <span className="text-sky-600">{icon}</span>
        {label}
      </div>
      {children}
    </label>
  );
}
