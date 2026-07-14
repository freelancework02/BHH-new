import { notFound } from "next/navigation";
import { countiesData } from "@/lib/countiesData";
import CountyPageClient from "./CountyPageClient";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  return Object.keys(countiesData).map((county) => ({
    county: county,
  }));
}

export async function generateMetadata({ params }) {
  const data = countiesData[params.county];
  if (!data) return {};

  return {
    title: data.seoTitle,
    description: data.metaDescription,
    alternates: {
      canonical: `/areas-we-serve/${data.slug}`,
    },
    openGraph: {
      title: data.seoTitle,
      description: data.metaDescription,
      url: `${site.url}/areas-we-serve/${data.slug}`,
      type: "website",
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: data.seoTitle,
      description: data.metaDescription,
    },
  };
}

export default function CountyPage({ params }) {
  const data = countiesData[params.county];
  
  if (!data) {
    notFound();
  }

  // Generate dynamic JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${site.url}/areas-we-serve/${data.slug}/#localbusiness`,
        "name": `${site.name} - ${data.name} In-Home Care`,
        "url": `${site.url}/areas-we-serve/${data.slug}`,
        "telephone": site.phoneDisplay,
        "email": site.email,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": site.address.line1,
          "addressLocality": site.address.city,
          "addressRegion": site.address.state,
          "postalCode": site.address.zip,
          "addressCountry": "US"
        },
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": data.name
        },
        "description": data.metaDescription
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${site.url}/areas-we-serve/${data.slug}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": site.url
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Areas We Serve",
            "item": `${site.url}/areas-we-serve`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": data.name,
            "item": `${site.url}/areas-we-serve/${data.slug}`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/areas-we-serve/${data.slug}/#faq`,
        "mainEntity": data.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CountyPageClient data={data} />
    </>
  );
}
