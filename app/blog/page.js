import BlogClient from "./BlogClient";
import { site, blogPosts } from "@/lib/site";

export const metadata = {
  title: "Home Care Blog & Resources | Senior Care Tips Pennsylvania",
  description:
    "Expert articles on in-home senior care, Medicaid waiver programs, caregiver tips, and home care costs in Pennsylvania. Trusted guidance from Blessed Hearts Homecare.",
  keywords: [
    "home care blog Pennsylvania",
    "senior care tips PA",
    "Medicaid waiver home care PA",
    "caregiver resources York PA",
    "in-home care guides",
    "elderly care tips Pennsylvania",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `Home Care Blog & Resources | ${site.name}`,
    description:
      "Expert articles on in-home senior care, Medicaid waiver programs, caregiver tips, and home care costs in Pennsylvania.",
    url: `${site.url}/blog`,
    type: "website",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `Home Care Blog & Resources | ${site.name}`,
    description:
      "Expert articles on in-home senior care, Medicaid waiver programs, caregiver tips, and home care costs in Pennsylvania.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${site.url}/blog/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: site.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${site.url}/blog`,
        },
      ],
    },
    {
      "@type": "CollectionPage",
      "@id": `${site.url}/blog/#collection`,
      name: "Home Care Blog & Resources",
      description:
        "Expert articles on in-home senior care, Medicaid waiver programs, caregiver tips, and home care costs in Pennsylvania.",
      url: `${site.url}/blog`,
      isPartOf: {
        "@id": `${site.url}/#organization`,
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: blogPosts.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${site.url}/blog/${post.slug}`,
          name: post.title,
        })),
      },
    },
  ],
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogClient />
    </>
  );
}
