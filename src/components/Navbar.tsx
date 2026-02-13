"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/request", label: "Book Pickup" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl ring-1 ring-slate-200/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-sky-400 text-white shadow-sm">
            <span className="text-sm font-semibold">S</span>
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            ScrapCo
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/request"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-green-500 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-600"
          >
            Schedule Pickup
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-slate-800 shadow-sm ring-1 ring-slate-200 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden"
          >
            <div className="mx-auto max-w-6xl px-4 pb-4">
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm backdrop-blur-xl">
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                    >
                      {item.label}
                    </Link>
                  ))}

                  <Link
                    href="/request"
                    onClick={() => setOpen(false)}
                    className="mt-1 inline-flex h-11 items-center justify-center rounded-xl bg-green-500 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-600"
                  >
                    Schedule Pickup
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
