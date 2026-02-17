import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="text-sm font-semibold text-slate-900">ScrapCo</div>
          <p className="mt-2 text-sm text-slate-600">
            Sell Your Scrap. Get Paid Instantly.
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold text-slate-900">Quick Links</div>
          <div className="mt-2 flex flex-col gap-2 text-sm">
            <Link className="font-semibold text-slate-900 hover:text-slate-900" href="/partner-portal">
              Partner Portal
            </Link>
            <Link className="text-slate-600 hover:text-slate-900" href="/request">
              Book Pickup
            </Link>
            <Link className="text-slate-600 hover:text-slate-900" href="/about">
              About
            </Link>
            <Link className="text-slate-600 hover:text-slate-900" href="/contact">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-slate-900">Contact</div>
          <p className="mt-2 text-sm text-slate-600">kbdon7718@gmail.com</p>
          <p className="mt-1 text-sm text-slate-600">7015277924</p>
          <a
            className="mt-2 inline-flex text-sm font-semibold text-slate-600 hover:text-slate-900"
            href="https://scrap-co-admin-frontend-2yao.vercel.app/"
          >
            Admin Panel
          </a>
        </div>
      </div>
    </footer>
  );
}
