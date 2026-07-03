import { blogPosts, site } from "@/lib/site";

export default function sitemap() {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/areas-we-serve",
    "/privacy-policy",
    "/contact-us",
    "/blog",
  ].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...blogRoutes];
}
