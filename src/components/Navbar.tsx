"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/request", label: "Book Pickup" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const APP_DOWNLOAD_URL =
  "https://expo.dev/accounts/azad_gupta/projects/scrapcocustomer/builds/09bcb281-6e49-45d6-b758-143926e23ecd";

const CAREERS_PHONE = "8053317489";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl ring-1 ring-slate-200/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="relative inline-flex h-9 w-9 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200/60">
            <Image
              src="/icon.png"
              alt="ScrapCo logo"
              fill
              sizes="36px"
              className="object-contain p-1"
              priority
            />
          </span>
          <span className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
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

            <a
              href={`tel:${CAREERS_PHONE}`}
              className="text-sm font-semibold text-slate-700 hover:text-slate-900"
            >
              Careers
            </a>
          </nav>

          <a
            href={APP_DOWNLOAD_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-white/70 px-4 text-sm font-semibold text-sky-700 shadow-sm ring-1 ring-slate-200/60 transition-colors hover:bg-white"
          >
            Download App
          </a>

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
                  <a
                    href={`tel:${CAREERS_PHONE}`}
                    className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                    onClick={() => setOpen(false)}
                  >
                    Careers
                  </a>

                  <a
                    href={APP_DOWNLOAD_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl px-3 py-2 text-sm font-semibold text-sky-700 ring-1 ring-slate-200/60 hover:bg-white"
                    onClick={() => setOpen(false)}
                  >
                    Download App
                  </a>

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
