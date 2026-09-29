import AboutClient from "@/components/AboutClient";
import { site, defaultOgImages, defaultTwitterImages } from "@/lib/site";

export const metadata = {
  title: "About Us | Licensed Home Care Agency in York, PA",
  description:
    "Learn about Blessed Hearts Homecare's mission, values, licensing, background-check protocols, and our dedicated team serving York, Lancaster, Harrisburg & 10 PA counties.",
  keywords: [
    "about Blessed Hearts Homecare",
    "licensed home care agency York PA",
    "home care team Pennsylvania",
    "background checked caregivers PA",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About Us | ${site.name}`,
    description:
      "Learn about Blessed Hearts Homecare's mission, values, licensing, and dedicated caregiving team serving South Central Pennsylvania.",
    url: `${site.url}/about`,
    type: "website",
    siteName: site.name,
    images: defaultOgImages,
  },
  twitter: {
    card: "summary_large_image",
    title: `About Us | ${site.name}`,
    description:
      "Learn about Blessed Hearts Homecare's mission, values, licensing, and dedicated caregiving team serving South Central PA.",
    images: defaultTwitterImages,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${site.url}/about/#breadcrumb`,
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
      name: "About Us",
      item: `${site.url}/about`,
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </>
  );
}
