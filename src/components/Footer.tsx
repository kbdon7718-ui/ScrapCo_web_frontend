import Link from "next/link";

const APP_DOWNLOAD_URL =
  "https://expo.dev/accounts/azad_gupta/projects/scrapcocustomer/builds/09bcb281-6e49-45d6-b758-143926e23ecd";

const CAREERS_PHONE = "8053317489";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="text-xl font-semibold text-slate-900">
            ScrapCo
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Sell Your Scrap. Get Paid Instantly.
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold text-slate-900">Quick Links</div>
          <div className="mt-2 flex flex-col gap-2 text-sm">
            <Link className="text-slate-600 hover:text-slate-900" href="/request">
              Book Pickup
            </Link>
            <a
              className="text-slate-600 hover:text-slate-900"
              href={APP_DOWNLOAD_URL}
              target="_blank"
              rel="noreferrer"
            >
              Download App
            </a>
            <a className="text-slate-600 hover:text-slate-900" href={`tel:${CAREERS_PHONE}`}>
              Careers
            </a>
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
          <p className="mt-3 text-xs text-slate-500">
            © {new Date().getFullYear()} ScrapCo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
