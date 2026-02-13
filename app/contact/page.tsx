export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-slate-900">Contact</h1>
      <p className="mt-3 text-sm text-slate-600">
        For pickup support and partnerships, reach us at:
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">Email</div>
          <div className="mt-1 text-sm text-slate-600">kbdon7718@gmail.com</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">Phone</div>
          <div className="mt-1 text-sm text-slate-600">7015277924</div>
        </div>
      </div>
    </main>
  );
}
