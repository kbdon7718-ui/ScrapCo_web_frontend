import type { Metadata } from "next";
import Link from "next/link";
import {
	Bell,
	CheckCircle2,
	ClipboardList,
	Clock,
	Handshake,
	MapPin,
	Package,
	ReceiptIndianRupee,
	ScanBarcode,
	ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
	title: "Partner With ScrapCo | Partner Portal",
	description:
		"Join ScrapCo as a scrap vendor or godown partner. Get steady orders, transparent tracking, and faster payments.",
	alternates: { canonical: "/partner-portal" },
	openGraph: {
		title: "Partner With ScrapCo | Partner Portal",
		description:
			"Join ScrapCo as a scrap vendor or godown partner. Get steady orders, transparent tracking, and faster payments.",
		url: "https://scrapco.app/partner-portal",
	},
	twitter: {
		title: "Partner With ScrapCo | Partner Portal",
		description:
			"Join ScrapCo as a scrap vendor or godown partner. Get steady orders, transparent tracking, and faster payments.",
	},
};

const VENDOR_APP_URL = process.env.NEXT_PUBLIC_VENDOR_APP_URL || "https://gd-10-0-frontend.vercel.app/";
const GODOWN_APP_URL = process.env.NEXT_PUBLIC_GODOWN_APP_URL || "https://gd-10-0-frontend.vercel.app/";

function Bullet({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
	return (
		<li className="flex gap-3">
			<span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200">
				<Icon className="h-4 w-4 text-slate-700" />
			</span>
			<div className="text-sm text-slate-700">{children}</div>
		</li>
	);
}

export default function PartnerPortalPage() {
	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: [
			{
				"@type": "Question",
				name: "Who can become a vendor?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Any scrap pickup business/operator who can handle local pickups responsibly.",
				},
			},
			{
				"@type": "Question",
				name: "Is there any registration fee?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "No hidden fee. We keep onboarding simple and transparent.",
				},
			},
			{
				"@type": "Question",
				name: "How are orders assigned?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "Assignments are location-based and depend on partner availability and performance.",
				},
			},
			{
				"@type": "Question",
				name: "How do payments work?",
				acceptedAnswer: {
					"@type": "Answer",
					text: "You can track jobs digitally and settlements are processed quickly with clear records.",
				},
			},
		],
	};

	return (
		<main className="mx-auto w-full max-w-6xl px-4 py-10">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<section className="mx-auto max-w-3xl text-center">
				<div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
					<Handshake className="h-4 w-4" />
					<span>Partner Program</span>
				</div>
				<h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
					Grow Your Scrap Business With ScrapCo
				</h1>
				<p className="mt-3 text-pretty text-base text-slate-600 sm:text-lg">Regular orders. Transparent system. Digital control.</p>
			</section>

			<section className="mt-10 grid gap-6 md:grid-cols-2">
				<div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
					<div className="flex items-start justify-between gap-4">
						<div>
							<h2 className="text-lg font-semibold text-slate-900">For Scrap Vendors</h2>
							<p className="mt-1 text-sm text-slate-600">Roz naya kaam, bina grahak dhundhe.</p>
						</div>
						<span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-green-50 ring-1 ring-green-100">
							<ShieldCheck className="h-5 w-5 text-green-700" />
						</span>
					</div>

					<ul className="mt-5 space-y-3">
						<Bullet icon={ClipboardList}>Get regular pickup requests from nearby customers.</Bullet>
						<Bullet icon={Bell}>Real-time job notifications so you never miss an order.</Bullet>
						<Bullet icon={CheckCircle2}>Transparent digital tracking (status, history, and details).</Bullet>
						<Bullet icon={Handshake}>No middlemen — work directly through the platform.</Bullet>
						<Bullet icon={ReceiptIndianRupee}>Faster, clearer payment settlement.</Bullet>
						<Bullet icon={MapPin}>Location-based assignments for efficient routing.</Bullet>
					</ul>

					<div className="mt-6">
						<a
							href={VENDOR_APP_URL}
							target="_blank"
							rel="noreferrer"
							className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-green-500 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-600"
						>
							Apply as Vendor
						</a>
						<p className="mt-2 text-xs text-slate-500">Opens in a new tab.</p>
					</div>
				</div>

				<div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
					<div className="flex items-start justify-between gap-4">
						<div>
							<h2 className="text-lg font-semibold text-slate-900">For Godown Owners</h2>
							<p className="mt-1 text-sm text-slate-600">Ab hisaab kitaab system se chalega, andaaze se nahi.</p>
						</div>
						<span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 ring-1 ring-sky-100">
							<Package className="h-5 w-5 text-sky-700" />
						</span>
					</div>

					<ul className="mt-5 space-y-3">
						<Bullet icon={ScanBarcode}>Digital inventory tracking for inbound/outbound scrap.</Bullet>
						<Bullet icon={Clock}>Scrap inflow monitoring with clear timelines.</Bullet>
						<Bullet icon={Handshake}>Vendor coordination to keep operations smooth.</Bullet>
						<Bullet icon={CheckCircle2}>Transparent weight records and accountability.</Bullet>
						<Bullet icon={ReceiptIndianRupee}>Centralized rate management and settlement visibility.</Bullet>
						<Bullet icon={ShieldCheck}>Growth opportunities with trusted network partners.</Bullet>
					</ul>

					<div className="mt-6">
						<a
							href={GODOWN_APP_URL}
							target="_blank"
							rel="noreferrer"
							className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-white/70 px-4 text-sm font-semibold text-sky-700 shadow-sm ring-1 ring-slate-200/60 transition-colors hover:bg-white"
						>
							Register as Godown Partner
						</a>
						<p className="mt-2 text-xs text-slate-500">Opens in a new tab.</p>
					</div>
				</div>
			</section>

			<section className="mt-12 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
				<h3 className="text-base font-semibold text-slate-900">FAQ</h3>
				<div className="mt-4 grid gap-4 md:grid-cols-2">
					<div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
						<div className="text-sm font-semibold text-slate-900">Who can become a vendor?</div>
						<p className="mt-1 text-sm text-slate-600">Any scrap pickup business/operator who can handle local pickups responsibly.</p>
					</div>
					<div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
						<div className="text-sm font-semibold text-slate-900">Is there any registration fee?</div>
						<p className="mt-1 text-sm text-slate-600">No hidden fee. We keep onboarding simple and transparent.</p>
					</div>
					<div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
						<div className="text-sm font-semibold text-slate-900">How are orders assigned?</div>
						<p className="mt-1 text-sm text-slate-600">Assignments are location-based and depend on partner availability and performance.</p>
					</div>
					<div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
						<div className="text-sm font-semibold text-slate-900">How do payments work?</div>
						<p className="mt-1 text-sm text-slate-600">You can track jobs digitally and settlements are processed quickly with clear records.</p>
					</div>
				</div>
			</section>
		</main>
	);
}
