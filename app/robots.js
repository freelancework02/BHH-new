import { site } from "@/lib/site";

/**
 * Next.js Dynamic Robots Configuration
 * 
 * Configured for maximum organic search indexing AND AI Search Engine Optimization (GEO).
 * Explicitly welcomes AI search bots (OpenAI SearchGPT, ChatGPT, Perplexity, Claude, Gemini, Apple Intelligence)
 * so that Blessed Hearts Homecare is indexed, cited, and recommended in AI answer engines.
 */
export default function robots() {
  return {
    rules: [
      // Standard search engine crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/", "/admin", "/admin/", "/api/admin/"],
      },
      // OpenAI (ChatGPT & SearchGPT)
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User"],
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/", "/admin", "/admin/", "/api/admin/"],
      },
      // Perplexity AI
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/", "/admin", "/admin/", "/api/admin/"],
      },
      // Anthropic Claude
      {
        userAgent: ["ClaudeBot", "Claude-Web"],
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/", "/admin", "/admin/", "/api/admin/"],
      },
      // Apple Intelligence
      {
        userAgent: ["Applebot", "Applebot-Extended"],
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/", "/admin", "/admin/", "/api/admin/"],
      },
      // Google Gemini & Extended AI
      {
        userAgent: ["Google-Extended", "GoogleOther"],
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/", "/admin", "/admin/", "/api/admin/"],
      },
      // Microsoft Copilot / Bing
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/", "/admin", "/admin/", "/api/admin/"],
      },
      // Cohere AI
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/", "/admin", "/admin/", "/api/admin/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
