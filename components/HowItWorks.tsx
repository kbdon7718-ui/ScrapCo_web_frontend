export default function HowItWorks() {
  return (
    <section className="mt-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">How It Works</h2>
          <p className="mt-2 text-sm text-slate-600">
            3 simple steps from request to payout.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Step
          number="01"
          title="Book a pickup"
          desc="Share your details and scrap type."
        />
        <Step
          number="02"
          title="We collect & weigh"
          desc="Our partner arrives and weighs the scrap." 
        />
        <Step
          number="03"
          title="Get paid instantly"
          desc="Receive payment right after pickup."
        />
      </div>
    </section>
  );
}

function Step({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-xs font-semibold text-sky-500">{number}</div>
      <div className="mt-2 text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{desc}</div>
    </div>
  );
}
