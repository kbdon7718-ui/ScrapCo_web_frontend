export type BlogPostPublic = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  created_at: string;
  updated_at: string;
};

export type BlogPostDetail = BlogPostPublic & {
  content: string;
};

function getApiBaseUrl() {
  const url = process.env.NEXT_PUBLIC_API_BASE ?? process.env.NEXT_PUBLIC_API_URL;
  if (!url) throw new Error("Missing NEXT_PUBLIC_API_BASE");
  return url.replace(/\/$/, "");
}

export async function fetchPublishedPosts(): Promise<BlogPostPublic[]> {
  const baseUrl = getApiBaseUrl();
  const res = await fetch(`${baseUrl}/api/blog`, {
    // Cache a little; keeps listing fast but not stale for too long.
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error(`Failed to fetch blog posts (${res.status})`);
  const data = (await res.json()) as { success: boolean; posts?: BlogPostPublic[] };
  return (data.posts ?? []).filter((p: any) => p && (p as any).is_published === true);
}

export async function fetchPublishedPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  const baseUrl = getApiBaseUrl();
  const res = await fetch(`${baseUrl}/api/blog/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch blog post (${res.status})`);

  const data = (await res.json()) as { success: boolean; post?: BlogPostDetail };
  return data.post ?? null;
}
