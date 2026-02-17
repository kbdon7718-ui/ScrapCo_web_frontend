import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

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
            <Link className="font-semibold text-slate-900 hover:text-slate-900" href="/partner-portal">
              Partner Portal
            </Link>
            <Link className="text-slate-600 hover:text-slate-900" href="/blog">
              Blog
            </Link>
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

          <div className="mt-3 flex items-center gap-3">
            <SocialIcon
              label="Instagram"
              href="https://www.instagram.com/_scrapco/"
              icon={<Instagram className="h-4 w-4" />}
            />
            <SocialIcon label="Twitter" icon={<Twitter className="h-4 w-4" />} />
            <SocialIcon
              label="Facebook"
              href="https://www.facebook.com/profile.php?id=61588204657663"
              icon={<Facebook className="h-4 w-4" />}
            />
            <SocialIcon
              label="YouTube"
              href="https://www.youtube.com/channel/UChhnTXkJlzzQS8-00DMz4Iw"
              icon={<Youtube className="h-4 w-4" />}
            />
            <SocialIcon label="LinkedIn" icon={<Linkedin className="h-4 w-4" />} />
          </div>

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

function SocialIcon({
  label,
  icon,
  href,
}: {
  label: string;
  icon: React.ReactNode;
  href?: string;
}) {
  const className =
    "inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200/70 transition-colors hover:bg-slate-50 hover:text-slate-900";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        title={label}
        className={className}
      >
        {icon}
      </a>
    );
  }

  return (
    <span
      aria-label={label}
      title={`${label} (link coming soon)`}
      className={className + " cursor-not-allowed opacity-60"}
    >
      {icon}
    </span>
  );
}
