"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Factory, Store, User, Warehouse, Handshake } from "lucide-react";

import journeyBanner from "../../app/ChatGPT Image Feb 13, 2026, 11_34_38 PM.png";

type JourneyKey = "customer" | "vendor" | "store" | "godown" | "mill";

type JourneyRole = {
  key: JourneyKey;
  stepLabel: string;
  title: string;
  short: string;
  icon: React.ComponentType<{ className?: string }>;
  helps: string[];
  whyJoin: string[];
  benefits: string[];
  extra?: {
    heading: string;
    items: string[];
  };
  cta?: {
    label: string;
    href: string;
  };
};

export default function HowItWorks() {
  const [active, setActive] = useState<JourneyKey>("customer");

  const roles = useMemo<JourneyRole[]>(
    () => [
      {
        key: "customer",
        stepLabel: "Customer",
        title: "For Households, Shops & Factories",
        short: "Requests pickup",
        icon: User,
        helps: [
          "Easy scrap pickup from your home, shop, or factory",
          "Transparent digital weight & price system",
          "Payment on pickup (Cash / UPI)",
        ],
        whyJoin: [
          "No bargaining, fair pricing",
          "Eco-friendly recycling with a clear process",
          "Reliable scheduling with verified pickup partners",
        ],
        benefits: [
          "Doorstep pickup in minutes",
          "Digital tracking & proof of weighing",
          "Faster payouts and consistent service",
        ],
        extra: {
          heading: "We support",
          items: [
            "Household Scrap – newspapers, plastic, metal",
            "Shop Scrap – cartons, packaging, damaged goods",
            "Factory Scrap – bulk metal, industrial waste",
          ],
        },
        cta: { label: "Book Pickup Now", href: "/request" },
      },
      {
        key: "vendor",
        stepLabel: "Vendor",
        title: "Earn & Grow with ScrapCo",
        short: "Accepts & picks",
        icon: Handshake,
        helps: [
          "Daily pickup assignments",
          "Transparent commission system",
          "Digital tracking of earnings",
        ],
        whyJoin: [
          "No middleman—work directly with ScrapCo",
          "Growth opportunity in your area",
          "Clear rules and fair payouts",
        ],
        benefits: [
          "Predictable work pipeline",
          "Earnings visibility and settlement clarity",
          "Support and credibility through a trusted brand",
        ],
        cta: { label: "Become a Vendor", href: "/contact" },
      },
      {
        key: "store",
        stepLabel: "Store",
        title: "Efficient Sorting & Management",
        short: "Sort & tally",
        icon: Store,
        helps: [
          "Organized scrap sorting",
          "Digital stock tracking",
          "Weight verification system",
        ],
        whyJoin: [
          "Reduce losses with consistent measurement",
          "Improve operational efficiency",
          "Create a clean chain of custody",
        ],
        benefits: [
          "Better resale margins",
          "Faster reconciliation",
          "Structured data for decisions",
        ],
      },
      {
        key: "godown",
        stepLabel: "Godown",
        title: "Bulk Storage & Business Control",
        short: "Bulk storage",
        icon: Warehouse,
        helps: [
          "Centralized bulk storage",
          "Daily data tracking",
          "Mill dispatch planning",
        ],
        whyJoin: [
          "Keep inventory clean and auditable",
          "Run dispatches on dependable data",
          "Improve control across locations",
        ],
        benefits: [
          "Clear visibility into stock",
          "Smoother cashflow operations",
          "Better planning for bulk shipments",
        ],
      },
      {
        key: "mill",
        stepLabel: "Recycling Mill",
        title: "Reliable Scrap Supply",
        short: "Material recovery",
        icon: Factory,
        helps: [
          "Clean sorted material",
          "Consistent bulk quantity",
          "Transparent transaction system",
        ],
        whyJoin: [
          "Long-term partnership approach",
          "Predictable sourcing quality",
          "Faster settlement with clear paperwork",
        ],
        benefits: [
          "Reduced contamination and sorting overhead",
          "Higher throughput reliability",
          "Stable supply planning",
        ],
      },
    ],
    []
  );

  const activeRole = roles.find((r) => r.key === active) ?? roles[0];

  return (
    <section>
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            How it works
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            From request to recycling
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Click any step to explore how ScrapCo supports each role.
          </p>
        </div>

        <div className="hidden md:block">
          <div className="relative h-20 w-44 overflow-hidden rounded-2xl bg-white/70 shadow-sm ring-1 ring-slate-200/60 backdrop-blur">
            <Image
              src="/illustrations/how-it-works.png"
              alt="How pickup works illustration"
              fill
              className="object-contain p-2"
            />
          </div>
        </div>
      </div>

      {/* Desktop horizontal journey with arrows */}
      <div className="mt-10 hidden items-stretch gap-3 lg:flex">
        {roles.map((role, idx) => (
          <div key={role.key} className="contents">
            <JourneyCard role={role} active={active} onSelect={setActive} />
            {idx < roles.length - 1 ? <JourneyArrow /> : null}
          </div>
        ))}
      </div>

      {/* Mobile/Tablet grid */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:hidden">
        {roles.map((role) => (
          <JourneyCard key={role.key} role={role} active={active} onSelect={setActive} />
        ))}
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRole.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden rounded-3xl bg-white/70 p-6 shadow-sm ring-1 ring-slate-200/60 backdrop-blur sm:p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                  {activeRole.stepLabel}
                </div>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                  {activeRole.title}
                </h3>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                  {activeRole.helps.join(" • ")}
                </p>
              </div>

              {activeRole.cta ? (
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href={activeRole.cta.href}
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-green-600 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700"
                  >
                    {activeRole.cta.label}
                  </Link>
                </motion.div>
              ) : null}
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <InfoPanel
                title="How ScrapCo helps"
                accent="sky"
                bullets={activeRole.helps}
              />
              <InfoPanel
                title="Why they should join ScrapCo"
                accent="green"
                bullets={activeRole.whyJoin}
              />
              <InfoPanel
                title="What benefits they get"
                accent="sky"
                bullets={activeRole.benefits}
              />
            </div>

            {activeRole.extra ? (
              <div className="mt-6 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200/60">
                <div className="text-sm font-semibold text-slate-900">{activeRole.extra.heading}</div>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  {activeRole.extra.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl bg-slate-50 shadow-sm ring-1 ring-slate-200/60">
        <div className="relative h-40 w-full sm:h-48 md:h-56 lg:h-64">
          <Image
            src={journeyBanner}
            alt="ScrapCo journey illustration"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}

function JourneyArrow() {
  return (
    <div className="flex w-10 items-center justify-center text-slate-300">
      <ArrowRight className="h-5 w-5" />
    </div>
  );
}

function JourneyCard({
  role,
  active,
  onSelect,
}: {
  role: JourneyRole;
  active: JourneyKey;
  onSelect: (key: JourneyKey) => void;
}) {
  const isActive = role.key === active;
  const Icon = role.icon;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.35 }}
      onClick={() => onSelect(role.key)}
      aria-pressed={isActive}
      className={
        "relative flex-1 overflow-hidden rounded-2xl bg-white/70 p-6 text-left shadow-sm backdrop-blur transition-all duration-300 ease-out hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400/40 " +
        (isActive
          ? "ring-2 ring-sky-400/50"
          : "ring-1 ring-slate-200/60")
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 text-slate-700 ring-1 ring-slate-200/60">
          <Icon className="h-5 w-5" />
        </div>
        {isActive ? (
          <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
            Selected
          </span>
        ) : null}
      </div>
      <div className="mt-4 text-sm font-semibold text-slate-900">{role.stepLabel}</div>
      <div className="mt-1 text-sm text-slate-600">{role.short}</div>
    </motion.button>
  );
}

function InfoPanel({
  title,
  accent,
  bullets,
}: {
  title: string;
  accent: "sky" | "green";
  bullets: string[];
}) {
  const dotClass = accent === "green" ? "bg-green-600" : "bg-sky-400";
  const titleClass = accent === "green" ? "text-green-700" : "text-sky-700";
  return (
    <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200/60">
      <div className={"text-sm font-semibold " + titleClass}>{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className={"mt-1.5 h-2 w-2 rounded-full " + dotClass} />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
