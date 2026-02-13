"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  MessageCircle,
} from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

function getApiBase() {
  const base =
    process.env.NEXT_PUBLIC_API_BASE ?? process.env.NEXT_PUBLIC_API_URL;
  if (!base) throw new Error("Missing NEXT_PUBLIC_API_BASE");
  return base.replace(/\/$/, "");
}

export default function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<string>("");

  const canSubmit = useMemo(() => {
    return (
      name.trim().length > 0 &&
      phone.trim().length > 0 &&
      message.trim().length > 0
    );
  }, [name, phone, message]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setResult("");

    try {
      const base = getApiBase();
      const res = await fetch(`${base}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          message: message.trim(),
          source: "website",
        }),
      });

      if (!res.ok) {
        let msg = "Failed to send message";
        try {
          const data = (await res.json()) as { error?: string; message?: string };
          msg = data.message ?? data.error ?? msg;
        } catch {
          // ignore
        }
        throw new Error(msg);
      }

      setStatus("success");
      setResult("Thanks! We’ll reach out shortly.");
      setName("");
      setPhone("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setResult(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="contact" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contact</div>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
          Get in touch
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          We’re here to help you sell your scrap easily and transparently.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Left: Contact info */}
          <div className="rounded-3xl bg-white/70 shadow-sm ring-1 ring-slate-200/60 backdrop-blur">
            <div className="p-8 space-y-6">

              <div className="space-y-4">
                <Row
                  icon={<Phone className="h-5 w-5" />}
                  label="Phone"
                  value={
                    <a
                      href="tel:7015277924"
                      className="font-semibold text-slate-900 hover:text-sky-700"
                    >
                      7015277924
                    </a>
                  }
                />

                <Row
                  icon={<Mail className="h-5 w-5" />}
                  label="Email"
                  value={
                    <a
                      href="mailto:kbdon7718@gmail.com"
                      className="font-semibold text-slate-900 hover:text-sky-700"
                    >
                      kbdon7718@gmail.com
                    </a>
                  }
                />

                <Row
                  icon={<Instagram className="h-5 w-5" />}
                  label="Instagram"
                  value={
                    <a
                      href="https://www.instagram.com/_scrapco/"
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-slate-900 hover:text-sky-700"
                    >
                      @_scrapco
                    </a>
                  }
                />

                <Row
                  icon={<Clock className="h-5 w-5" />}
                  label="Working Hours"
                  value={
                    <span className="font-semibold text-slate-900">
                      Mon – Sat | 9:00 AM – 7:00 PM
                    </span>
                  }
                />

                <Row
                  icon={<MapPin className="h-5 w-5" />}
                  label="Service Area"
                  value={
                    <span className="font-semibold text-slate-900">Narnaul • Singhana • Gorakhpur</span>
                  }
                />
              </div>

              <div>
                <a
                  href="https://wa.me/917015277924"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-6 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:bg-green-600"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat on WhatsApp
                </a>
                <div className="mt-2 text-xs text-slate-500">
                  Prefer booking? Use <Link className="text-sky-700 font-semibold hover:text-sky-800" href="/request">Book Pickup</Link>.
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="rounded-3xl bg-white/70 shadow-sm ring-1 ring-slate-200/60 backdrop-blur">
            <form onSubmit={onSubmit} className="p-8 space-y-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Message</div>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">Send a message</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Share your details and we’ll get back soon.
                </p>
              </div>

              <div className="space-y-4">
                <Field label="Full Name">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 w-full rounded-xl bg-white px-3 text-sm shadow-sm ring-1 ring-slate-200/70 outline-none transition focus:ring-2 focus:ring-green-500/30"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </Field>

                <Field label="Phone Number">
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-11 w-full rounded-xl bg-white px-3 text-sm shadow-sm ring-1 ring-slate-200/70 outline-none transition focus:ring-2 focus:ring-green-500/30"
                    placeholder="Your phone"
                    autoComplete="tel"
                  />
                </Field>

                <Field label="Message">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[120px] w-full rounded-xl bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200/70 outline-none transition focus:ring-2 focus:ring-green-500/30"
                    placeholder="How can we help?"
                  />
                </Field>
              </div>

              <button
                type="submit"
                disabled={!canSubmit || status === "loading"}
                className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-green-500 px-6 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? "Sending…" : "Send Message"}
              </button>

              {status !== "idle" && result ? (
                <div
                  className={
                    "rounded-2xl px-4 py-3 text-sm " +
                    (status === "success"
                      ? "bg-green-50 text-green-700 ring-1 ring-green-100"
                      : "bg-red-50 text-red-700 ring-1 ring-red-100")
                  }
                >
                  {result}
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
        {icon}
      </div>
      <div>
        <div className="text-xs font-semibold text-slate-500">{label}</div>
        <div className="mt-1 text-sm">{value}</div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-semibold text-slate-700">{label}</div>
      {children}
    </label>
  );
}
