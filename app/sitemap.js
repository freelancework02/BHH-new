import { blogPosts, site } from "@/lib/site";
import { countiesData, citiesData } from "@/lib/countiesData";

/**
 * Next.js Dynamic Sitemap Generator
 * 
 * To ensure 100% indexing in Google Search Console with ZERO "Alternate page with proper canonical tag"
 * or "Duplicate without user-selected canonical" exclusions, EVERY URL in this sitemap must have
 * a 1-to-1 matching self-referencing canonical tag.
 */
export default function sitemap() {
  const baseUrl = site.url; // https://www.blessedheartshomecare.com
  const currentDate = new Date().toISOString().split("T")[0];

  // 1. Core Top-Level Pages
  const corePages = [
    { url: `${baseUrl}`, lastModified: currentDate, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/areas-we-serve`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/contact-us`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/faq`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/blog`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/privacy-policy`, lastModified: currentDate, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms-conditions`, lastModified: currentDate, changeFrequency: "yearly", priority: 0.3 },
  ];

  // 2. Dedicated In-Home Care Service Pages (Canonical URLs configured in app/services/page.js)
  const servicePages = [
    { url: `${baseUrl}/personal-care`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/companion-care`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/24-hour-live-in-care`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/dementia-alzheimers-care`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/post-hospital-respite-care`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.9 },
  ];

  // 3. County Canonical Pages (/areas-we-serve/[county])
  const countyPages = Object.keys(countiesData).map((county) => ({
    url: `${baseUrl}/areas-we-serve/${county}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 4. City-Specific Target Pages (Self-canonicalizing configured in app/areas-we-serve/[county]/page.js)
  const cityPages = Object.keys(citiesData).map((city) => ({
    url: `${baseUrl}/${city}-pa-home-care`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 5. Canonical Blog Articles
  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date || currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...corePages,
    ...servicePages,
    ...countyPages,
    ...cityPages,
    ...blogUrls,
  ];
}
