import Link from "next/link";
import Image from "next/image";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/request", label: "Book Pickup" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const CAREERS_PHONE = "8053317489";

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="relative inline-flex h-9 w-9 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200/60">
            <Image
              src="/icon.png"
              alt="ScrapCo logo"
              fill
              sizes="36px"
              className="object-contain p-1"
              priority
            />
          </span>
          <span className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
            ScrapCo
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-slate-700 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}

          <a
            href={`tel:${CAREERS_PHONE}`}
            className="text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            Careers
          </a>
        </nav>
      </div>
    </header>
  );
}
