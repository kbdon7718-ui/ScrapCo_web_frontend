import sanitizeHtml from "sanitize-html";

export type BlogListItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type BlogPost = BlogListItem & {
  content: string;
};

function getApiBaseUrl() {
  const url = process.env.NEXT_PUBLIC_API_BASE ?? process.env.NEXT_PUBLIC_API_URL;
  if (!url) throw new Error("Missing NEXT_PUBLIC_API_BASE");
  return url.replace(/\/$/, "");
}

export async function fetchPublishedPosts() {
  const base = getApiBaseUrl();
  const res = await fetch(`${base}/api/blog`, { next: { revalidate: 60 } });
  const json = (await res.json()) as any;
  if (!res.ok) throw new Error(json?.error || `Failed to load blog (${res.status})`);
  return (json?.posts || []) as BlogListItem[];
}

export async function fetchPublishedPostBySlug(slug: string) {
  const base = getApiBaseUrl();
  const res = await fetch(`${base}/api/blog/${encodeURIComponent(slug)}`, { next: { revalidate: 60 } });
  const json = (await res.json()) as any;
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(json?.error || `Failed to load post (${res.status})`);
  return (json?.post || null) as BlogPost | null;
}

export function sanitizeBlogHtml(html: string) {
  return sanitizeHtml(html || "", {
    allowedTags: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "br",
      "hr",
      "strong",
      "em",
      "u",
      "blockquote",
      "ul",
      "ol",
      "li",
      "a",
      "code",
      "pre",
      "img",
      "span",
    ],
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      span: [],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href || "";
        const isExternal = /^https?:\/\//i.test(href);
        return {
          tagName,
          attribs: {
            ...attribs,
            ...(isExternal ? { target: "_blank", rel: "noreferrer" } : {}),
          },
        };
      },
    },
  });
}

export function formatBlogDate(iso: string | null | undefined) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}
