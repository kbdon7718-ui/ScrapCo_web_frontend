"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Newspaper, Cpu, Recycle, ShieldCheck } from "lucide-react";

import { useShineVars } from "@/components/useShineVars";

type ScrapTypeApiRow = {
  id?: string;
  name?: string;
  ratePerKg?: number | null;
};

function getApiBaseUrl() {
  const url = process.env.NEXT_PUBLIC_API_BASE ?? process.env.NEXT_PUBLIC_API_URL;
  return url ? url.replace(/\/$/, "") : "";
}

function formatRupeesPerKg(rate: number) {
  const n = Number(rate);
  const rounded = Number.isFinite(n) ? Math.round(n) : 0;
  return `₹${rounded}`;
}

export default function HeroSection() {
  const shine = useShineVars();

  const [ratesLoading, setRatesLoading] = useState(true);
  const [allRateRows, setAllRateRows] = useState<Array<{ label: string; price: string }>>([]);
  const [showAllRates, setShowAllRates] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadRates() {
      setRatesLoading(true);
      try {
        const baseUrl = getApiBaseUrl();
        if (!baseUrl) {
          if (!cancelled) setAllRateRows([]);
          return;
        }

        const res = await fetch(`${baseUrl}/api/scrap-types`, {
          method: "GET",
          headers: { Accept: "application/json" },
        });

        const data = (await res.json().catch(() => null)) as
          | { success?: boolean; types?: ScrapTypeApiRow[] }
          | null;

        const rows = (data?.types || [])
          .map((t) => ({
            label: String(t?.name ?? "").trim(),
            rate: t?.ratePerKg,
          }))
          .filter((t) => t.label && typeof t.rate === "number" && Number.isFinite(t.rate))
          .map((t) => ({ label: t.label, price: formatRupeesPerKg(Number(t.rate)) }));

        if (!cancelled) setAllRateRows(rows);
      } catch {
        if (!cancelled) setAllRateRows([]);
      } finally {
        if (!cancelled) setRatesLoading(false);
      }
    }

    loadRates();
    return () => {
      cancelled = true;
    };
  }, []);

  const topRateRows = useMemo(() => {
    return [...allRateRows]
      .sort((a, b) => {
        const ar = Number(String(a.price).replace(/[^0-9.]/g, ""));
        const br = Number(String(b.price).replace(/[^0-9.]/g, ""));
        return br - ar;
      })
      .slice(0, 3);
  }, [allRateRows]);

  const visibleRateRows = showAllRates
    ? [...allRateRows].sort((a, b) => a.label.localeCompare(b.label))
    : topRateRows;

  const updatedBadge = useMemo(() => {
    if (ratesLoading) return "Loading";
    if (allRateRows.length) return "Live";
    return "Unavailable";
  }, [allRateRows.length, ratesLoading]);

  return (
    <section className="relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-48 h-[30rem] w-[30rem] rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute -right-48 -top-28 h-[34rem] w-[34rem] rounded-full bg-emerald-200/25 blur-3xl" />
      </div>

      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Scrap pickup platform
          </div>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200/60 backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Verified pickup partners
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Now Live in Selected Areas
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 md:text-base">
            We are currently serving selected locations. Submit your pickup request and our team will confirm shortly.
          </p>

          <div className="mt-3 text-xs font-semibold text-slate-500">
            Manual confirmation within a few hours.
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/request"
                className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-green-500 px-6 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:bg-green-600 sm:w-auto"
              >
                Book Pickup
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/about"
                className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-white/70 px-6 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200/60 transition-all duration-300 ease-out hover:bg-white sm:w-auto"
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

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              { title: "Transparent process", desc: "Clear confirmation", icon: CheckCircle2 },
              { title: "Manual confirmation", desc: "Within a few hours", icon: Clock },
              { title: "Verified pickup partners", desc: "Trusted network", icon: ShieldCheck },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white/70 p-5 shadow-sm ring-1 ring-slate-200/60 backdrop-blur"
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
          <div className="grid gap-4">
            <div className="relative overflow-hidden rounded-3xl bg-white/70 p-4 shadow-sm ring-1 ring-slate-200/60 backdrop-blur">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-md">
                <Image
                  src="/illustrations/hero-pickup.png"
                  alt="Pickup booking illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div
              onMouseMove={shine.onMove}
              onMouseLeave={shine.onLeave}
              className="shine relative overflow-hidden rounded-3xl bg-white/70 p-6 shadow-md ring-1 ring-slate-200/60 backdrop-blur-xl"
            >
              <HeroFlatIllustration />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-sky-700">Live Price List</div>
                  <div className="mt-1 text-xl font-semibold text-slate-900">
                    Today’s live rates
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                  {updatedBadge}
                </span>
              </div>

            <div className="mt-5 grid gap-3">
              {visibleRateRows.length ? (
                visibleRateRows.map((r, idx) => (
                  <PriceRow
                    key={`${r.label}-${idx}`}
                    icon={idx === 0 ? <Recycle className="h-4 w-4" /> : idx === 1 ? <Newspaper className="h-4 w-4" /> : <Cpu className="h-4 w-4" />}
                    label={r.label}
                    price={r.price}
                    unit="/kg"
                  />
                ))
              ) : (
                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                  <div className="text-sm font-semibold text-slate-900">Rates currently unavailable</div>
                  <div className="mt-1 text-xs text-slate-600">Please check back later.</div>
                </div>
              )}
            </div>

            {allRateRows.length > 3 ? (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setShowAllRates((v) => !v)}
                  className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
                >
                  {showAllRates ? "Show less" : "More rates"}
                </button>

                {showAllRates ? (
                  <div className="mt-3 max-h-64 overflow-auto rounded-2xl bg-white/70 p-2 ring-1 ring-slate-200/70">
                    <div className="grid gap-2">
                      {[...allRateRows]
                        .sort((a, b) => a.label.localeCompare(b.label))
                        .map((r, idx) => (
                          <div
                            key={`${r.label}-${idx}`}
                            className="flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200"
                          >
                            <div className="text-sm font-semibold text-slate-900">{r.label}</div>
                            <div className="text-sm font-semibold text-slate-900">{r.price} /kg</div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="mt-6">
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/request"
                    className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-green-500 px-6 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:bg-green-600"
                >
                  Schedule Pickup
                </Link>
              </motion.div>
              <div className="mt-3 text-xs text-slate-500">
                Final price depends on on-site weight & quality.
              </div>
            </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroFlatIllustration() {
  // Decorative vector illustration, uses existing palette (sky/emerald/slate).
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 opacity-60"
      viewBox="0 0 200 200"
      fill="none"
    >
      <path
        d="M38 92c0-38 30-68 68-68s68 30 68 68-30 68-68 68-68-30-68-68Z"
        className="fill-sky-100"
      />
      <path
        d="M62 92c0-25 19-44 44-44s44 19 44 44-19 44-44 44-44-19-44-44Z"
        className="fill-white"
      />
      <path
        d="M118 60c18 7 30 24 30 44 0 20-12 37-30 44"
        className="stroke-emerald-400"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M88 148c-18-7-30-24-30-44 0-20 12-37 30-44"
        className="stroke-sky-400"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
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
