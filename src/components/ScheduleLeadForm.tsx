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
    <section className="relative overflow-hidden rounded-3xl bg-slate-50 p-8 sm:p-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 -top-28 h-72 w-72 rounded-full bg-sky-200/25 blur-3xl" />
        <div className="absolute -right-28 -bottom-28 h-72 w-72 rounded-full bg-emerald-200/25 blur-3xl" />
      </div>

      <div className="relative rounded-3xl bg-white/70 p-8 shadow-sm ring-1 ring-slate-200/60 backdrop-blur sm:p-10">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Schedule</div>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
          Book a pickup in under a minute
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Share your phone, preferred date, and material details.
        </p>

        <form onSubmit={onSubmit} className="mt-10 grid gap-4 md:grid-cols-3">
          <Field label="Phone" icon={<Phone className="h-4 w-4" />}>
            <input
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              className="h-11 w-full rounded-xl bg-white px-3 text-sm shadow-sm ring-1 ring-slate-200/70 outline-none transition focus:ring-2 focus:ring-green-500/30"
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
              className="h-11 w-full rounded-xl bg-white px-3 text-sm shadow-sm ring-1 ring-slate-200/70 outline-none transition focus:ring-2 focus:ring-green-500/30"
            />
          </Field>

          <div className="md:col-span-3">
            <Field label="Material Details" icon={<StickyNote className="h-4 w-4" />}>
              <textarea
                value={form.details}
                onChange={(e) =>
                  setForm((p) => ({ ...p, details: e.target.value }))
                }
                className="min-h-[110px] w-full rounded-xl bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200/70 outline-none transition focus:ring-2 focus:ring-green-500/30"
                placeholder="Example: 8kg newspaper + 2kg plastic bottles"
              />
            </Field>
          </div>

          <div className="md:col-span-3">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-green-500 px-6 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:bg-green-600"
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
