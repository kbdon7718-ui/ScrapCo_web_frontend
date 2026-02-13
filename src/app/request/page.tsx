import RequestPickupForm from "@/components/RequestPickupForm";

export default function RequestPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Request</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        Book a pickup
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
        Fill in a few details and we’ll dispatch the request to verified pickup partners.
      </p>

      <div className="mt-10">
        <RequestPickupForm />
      </div>
    </main>
  );
}
