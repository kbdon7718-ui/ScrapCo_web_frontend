const siteUrl = "https://scrapco.app";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ["/admin/*", "/api/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
  },
  additionalPaths: async (config) => {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE;
    if (!apiBase) return [];

    try {
      const res = await fetch(`${apiBase.replace(/\/$/, "")}/api/blog`, {
        headers: { accept: "application/json" },
      });

      if (!res.ok) return [];
      const posts = await res.json();
      if (!Array.isArray(posts)) return [];

      return posts
        .filter((p) => p && typeof p.slug === "string" && p.slug.length > 0)
        .map((p) => ({
          loc: `/blog/${encodeURIComponent(p.slug)}`,
          lastmod: p.updated_at || p.created_at || new Date().toISOString(),
          changefreq: "weekly",
          priority: 0.7,
        }));
    } catch {
      return [];
    }
  },
};
