import PickupForm from "@/components/PickupForm";

export default function RequestPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-slate-900">Book a Pickup</h1>
      <p className="mt-2 text-sm text-slate-600">
        Fill in a few details and we’ll contact you to confirm the slot.
      </p>
      <div className="mt-6">
        <PickupForm />
      </div>
    </main>
  );
}
