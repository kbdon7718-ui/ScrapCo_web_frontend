import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { fetchPublishedPosts, formatBlogDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | ScrapCo",
  description: "Updates, tips, and guides from ScrapCo.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | ScrapCo",
    description: "Updates, tips, and guides from ScrapCo.",
    url: "https://scrapco.app/blog",
    type: "website",
  },
  twitter: {
    title: "Blog | ScrapCo",
    description: "Updates, tips, and guides from ScrapCo.",
  },
};

export const revalidate = 60;

function CardImage({ src, alt }: { src: string | null; alt: string }) {
  if (!src) {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200" />
    );
  }

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200">
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
    </div>
  );
}

export default async function BlogIndexPage() {
  let posts = [] as Awaited<ReturnType<typeof fetchPublishedPosts>>;
  let error: string | null = null;

  try {
    posts = await fetchPublishedPosts();
  } catch (e) {
    error = e instanceof Error ? e.message : "Could not load blog";
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">Blog</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Latest from ScrapCo</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
        Stories, updates, and practical tips for a cleaner, smarter scrap business.
      </p>

      {error ? (
        <div className="mt-10 rounded-2xl bg-red-50 p-4 text-sm text-red-700 ring-1 ring-red-100">{error}</div>
      ) : null}

      {!error && posts.length === 0 ? (
        <div className="mt-10 rounded-2xl bg-slate-50 p-6 text-sm text-slate-700 ring-1 ring-slate-200">No posts yet.</div>
      ) : null}

      <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => {
          const date = formatBlogDate(p.created_at);
          return (
            <article
              key={p.id}
              className="group rounded-2xl bg-white p-5 shadow-lg ring-1 ring-slate-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardImage src={p.featured_image} alt={p.title} />

              <div className="mt-4">
                {date ? <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{date}</div> : null}
                <h2 className="mt-2 line-clamp-2 text-lg font-semibold text-slate-900">{p.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{p.excerpt || ""}</p>

                <div className="mt-4">
                  <Link
                    href={`/blog/${encodeURIComponent(p.slug)}`}
                    className="inline-flex h-10 items-center justify-center rounded-xl bg-white/70 px-4 text-sm font-semibold text-sky-700 shadow-sm ring-1 ring-slate-200/60 transition-colors hover:bg-white"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
