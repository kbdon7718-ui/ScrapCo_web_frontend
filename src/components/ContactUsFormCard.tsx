"use client";

import { useMemo, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

function getApiBase() {
  const base =
    process.env.NEXT_PUBLIC_API_BASE ?? process.env.NEXT_PUBLIC_API_URL;
  if (!base) throw new Error("Missing NEXT_PUBLIC_API_BASE");
  return base.replace(/\/$/, "");
}

export default function ContactUsFormCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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

    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    const combinedMessage = trimmedEmail
      ? `Email: ${trimmedEmail}\n\n${trimmedMessage}`
      : trimmedMessage;

    try {
      const base = getApiBase();
      const res = await fetch(`${base}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          message: combinedMessage,
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
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setResult(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <h1 className="text-center text-3xl font-semibold tracking-tight text-slate-900">Contact Us</h1>
      <p className="mt-2 text-center text-sm text-slate-600">Fill up the form below to send us a message.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <Field label="Full Name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder="John Doe"
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
          />
        </Field>

        <Field label="Email Address">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="you@company.com"
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
          />
        </Field>

        <Field label="Phone Number">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            placeholder="+1 (555) 1234-567"
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
          />
        </Field>

        <Field label="Your Message">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message"
            className="min-h-[160px] w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
          />
        </Field>

        <button
          type="submit"
          disabled={!canSubmit || status === "loading"}
          className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Send Message"}
        </button>

        {status !== "idle" && result ? (
          <div
            className={
              "rounded-lg px-4 py-3 text-sm " +
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
      <div className="mb-2 text-sm font-medium text-slate-700">{label}</div>
      {children}
    </label>
  );
}
