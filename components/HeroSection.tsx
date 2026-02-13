import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="rounded-3xl bg-gradient-to-br from-sky-50 to-white p-8 ring-1 ring-slate-200 md:p-12">
      <div className="max-w-2xl">
        <div className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
          Doorstep scrap pickup
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Sell Your Scrap. Get Paid Instantly.
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600 md:text-base">
          Book a pickup in minutes from any device. We collect, weigh, and pay—
          simple and transparent.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/request"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-sky-400 px-5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500"
          >
            Book Pickup
          </Link>
          <Link
            href="/about"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
          >
            Learn more
          </Link>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl bg-white/70 p-4 shadow-sm ring-1 ring-slate-200/70 backdrop-blur">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src="/illustrations/hero-pickup.png"
            alt="Pickup booking illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-3">
        {[
          { title: "Sky-blue rates", desc: "Transparent, fair pricing" },
          { title: "Green impact", desc: "Cleaner, better cities" },
          { title: "Fast scheduling", desc: "Pick a slot that fits" },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
          >
            <div className="text-sm font-semibold text-slate-900">
              {item.title}
            </div>
            <div className="mt-1 text-sm text-slate-600">{item.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
