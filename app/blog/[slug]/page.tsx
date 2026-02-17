import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { fetchPublishedPostBySlug, formatBlogDate, sanitizeBlogHtml } from "@/lib/blog";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPublishedPostBySlug(slug).catch(() => null);

  if (!post) {
    return {
      title: "Blog | ScrapCo",
      description: "Read the latest from ScrapCo.",
      alternates: { canonical: "/blog" },
      openGraph: {
        title: "Blog | ScrapCo",
        description: "Read the latest from ScrapCo.",
        url: "https://scrapco.app/blog",
        type: "website",
      },
      twitter: {
        title: "Blog | ScrapCo",
        description: "Read the latest from ScrapCo.",
      },
    };
  }

  const canonicalPath = `/blog/${encodeURIComponent(post.slug)}`;

  return {
    title: `${post.title} | ScrapCo Blog`,
    description: post.excerpt || "Read the latest from ScrapCo.",
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      url: `https://scrapco.app${canonicalPath}`,
      type: "article",
      images: post.featured_image ? [post.featured_image] : undefined,
    },
    twitter: {
      title: post.title,
      description: post.excerpt || "Read the latest from ScrapCo.",
      images: post.featured_image ? [post.featured_image] : undefined,
    },
  };
}

function HeaderImage({ src, alt }: { src: string | null; alt: string }) {
  if (!src) return null;
  return (
    <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-lg ring-1 ring-slate-200">
      <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" priority />
    </div>
  );
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPublishedPostBySlug(slug);

  if (!post) return notFound();

  const date = formatBlogDate(post.created_at);
  const safeHtml = sanitizeBlogHtml(post.content || "");

  const publishedIso = post.created_at ? new Date(post.created_at).toISOString() : undefined;
  const modifiedIso = post.updated_at ? new Date(post.updated_at).toISOString() : publishedIso;
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || undefined,
    image: post.featured_image ? [post.featured_image] : undefined,
    datePublished: publishedIso,
    dateModified: modifiedIso,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://scrapco.app/blog/${encodeURIComponent(post.slug)}`,
    },
    publisher: {
      "@type": "Organization",
      name: "ScrapCo",
      logo: {
        "@type": "ImageObject",
        url: "https://scrapco.app/icon.png",
      },
    },
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/blog"
          className="inline-flex h-10 items-center justify-center rounded-xl bg-white/70 px-4 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200/60 transition-colors hover:bg-white"
        >
          ← Back to Blog
        </Link>
      </div>

      {date ? <div className="mt-8 text-xs font-semibold uppercase tracking-wider text-slate-500">{date}</div> : null}

      <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">{post.title}</h1>

      <HeaderImage src={post.featured_image} alt={post.title} />

      <article className="prose prose-slate mt-10 max-w-none">
        <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
      </article>

      <div className="mt-12">
        <Link
          href="/blog"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-green-500 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-600"
        >
          Back to Blog
        </Link>
      </div>
    </main>
  );
}
