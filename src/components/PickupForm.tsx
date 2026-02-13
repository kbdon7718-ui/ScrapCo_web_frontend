"use client";

import { useEffect, useMemo, useState } from "react";

import { createPickupRequest } from "@/lib/api";
import type { PickupRequestPayload, ScrapType } from "@/types";

const scrapTypes: { value: ScrapType; label: string }[] = [
  { value: "paper", label: "Paper" },
  { value: "plastic", label: "Plastic" },
  { value: "metal", label: "Metal" },
  { value: "electronics", label: "Electronics" },
  { value: "mixed", label: "Mixed" },
];

export default function PickupForm() {
  const [form, setForm] = useState<PickupRequestPayload>({
    name: "",
    phone: "",
    address: "",
    scrap_type: "paper",
    estimated_weight: "",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("scrapco_lead_prefill");
      if (!raw) return;
      localStorage.removeItem("scrapco_lead_prefill");
      const data = JSON.parse(raw) as {
        phone?: string;
        pickupDate?: string;
        details?: string;
      };

      setForm((p) => ({
        ...p,
        phone: typeof data.phone === "string" ? data.phone : p.phone,
        notes:
          [
            data.pickupDate ? `Preferred date: ${data.pickupDate}` : "",
            data.details ?? "",
          ]
            .filter(Boolean)
            .join("\n"),
      }));
    } catch {
      // ignore
    }
  }, []);

  const canSubmit = useMemo(() => {
    return (
      form.name.trim().length > 0 &&
      form.phone.trim().length > 0 &&
      form.address.trim().length > 0 &&
      String(form.estimated_weight).trim().length > 0
    );
  }, [form]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      await createPickupRequest(form);
      setStatus("success");
      setMessage("Pickup request submitted successfully.");
      setForm({
        name: "",
        phone: "",
        address: "",
        scrap_type: "paper",
        estimated_weight: "",
        notes: "",
      });
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name">
          <input
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-sky-400"
            placeholder="Your name"
          />
        </Field>

        <Field label="Phone">
          <input
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-sky-400"
            placeholder="Your phone"
          />
        </Field>

        <Field label="Scrap Type">
          <select
            value={form.scrap_type}
            onChange={(e) =>
              setForm((p) => ({ ...p, scrap_type: e.target.value as ScrapType }))
            }
            className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-sky-400"
          >
            {scrapTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Estimated Weight (kg)">
          <input
            value={String(form.estimated_weight)}
            onChange={(e) =>
              setForm((p) => ({ ...p, estimated_weight: e.target.value }))
            }
            className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-sky-400"
            placeholder="e.g. 10"
          />
        </Field>

        <div className="md:col-span-2">
          <Field label="Address">
            <textarea
              value={form.address}
              onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
              className="min-h-[88px] w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400"
              placeholder="House/Flat, Street, Area, City"
            />
          </Field>
        </div>

        <div className="md:col-span-2">
          <Field label="Notes (optional)">
            <textarea
              value={form.notes ?? ""}
              onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
              className="min-h-[88px] w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400"
              placeholder="Any instructions for pickup"
            />
          </Field>
        </div>
      </div>

      <button
        type="submit"
        disabled={!canSubmit || status === "loading"}
        className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl bg-green-600 px-5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Submitting…" : "Submit Request"}
      </button>

      {status !== "idle" && message ? (
        <div
          className={
            "mt-4 rounded-xl px-4 py-3 text-sm " +
            (status === "success"
              ? "bg-green-50 text-green-700 ring-1 ring-green-100"
              : "bg-red-50 text-red-700 ring-1 ring-red-100")
          }
        >
          {message}
        </div>
      ) : null}
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-semibold text-slate-700">{label}</div>
      {children}
    </label>
  );
}
