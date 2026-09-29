import BlogClient from "@/app/blog/BlogClient";
import { site, defaultOgImages, defaultTwitterImages } from "@/lib/site";
import { getAllBlogs } from "@/lib/blogsData";

export const dynamic = "force-dynamic";

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
    canonical: "/blogs",
  },
  openGraph: {
    title: `Home Care Blog & Resources | ${site.name}`,
    description:
      "Expert articles on in-home senior care, Medicaid waiver programs, caregiver tips, and home care costs in Pennsylvania.",
    url: `${site.url}/blogs`,
    type: "website",
    siteName: site.name,
    images: defaultOgImages,
  },
  twitter: {
    card: "summary_large_image",
    title: `Home Care Blog & Resources | ${site.name}`,
    description:
      "Expert articles on in-home senior care, Medicaid waiver programs, caregiver tips, and home care costs in Pennsylvania.",
    images: defaultTwitterImages,
  },
};

export default async function BlogsPage() {
  const posts = await getAllBlogs();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${site.url}/blogs/#breadcrumb`,
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
            name: "Blogs",
            item: `${site.url}/blogs`,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${site.url}/blogs/#collection`,
        name: "Home Care Blog & Resources",
        description:
          "Expert articles on in-home senior care, Medicaid waiver programs, caregiver tips, and home care costs in Pennsylvania.",
        url: `${site.url}/blogs`,
        isPartOf: {
          "@id": `${site.url}/#organization`,
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: posts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${site.url}/blog/${post.slug}`,
            name: post.title,
          })),
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogClient posts={posts} />
    </>
  );
}
