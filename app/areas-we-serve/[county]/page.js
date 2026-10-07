import { notFound } from "next/navigation";
import { countiesData, citiesData } from "@/lib/countiesData";
import CountyPageClient from "./CountyPageClient";
import { site, defaultOgImages, defaultTwitterImages } from "@/lib/site";
// County route page handler

export async function generateStaticParams() {
  return Object.keys(countiesData).map((county) => ({
    county: county,
  }));
}

export async function generateMetadata({ params, searchParams }) {
  const data = countiesData[params.county];
  if (!data) return {};

  const city = searchParams?.city;
  const isCity = city && citiesData[city];
  const title = isCity ? citiesData[city].seoTitle : data.seoTitle;
  const description = isCity ? citiesData[city].metaDescription : data.metaDescription;
  const canonicalUrl = isCity ? `/${city}-pa-home-care` : `/areas-we-serve/${data.slug}`;

  const locationName = isCity ? `${city.charAt(0).toUpperCase() + city.slice(1)}, PA` : `${data.name}, PA`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `home care ${locationName}`,
      `in-home care ${locationName}`,
      `senior care ${locationName}`,
      `home care agency ${locationName}`,
      `caregiver services ${locationName}`,
      `home health aide ${locationName}`,
      `elderly care ${locationName}`,
      `personal care aide ${locationName}`,
      "home care near me",
      "senior home care Pennsylvania",
      "Medicaid waiver caregiver PA",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: `${site.url}${canonicalUrl}`,
      type: "website",
      siteName: site.name,
      images: defaultOgImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: defaultTwitterImages,
    },
  };
}

export default function CountyPage({ params, searchParams }) {
  const data = countiesData[params.county];
  
  if (!data) {
    notFound();
  }

  const city = searchParams?.city;
  const isCity = city && citiesData[city];
  const pageTitle = isCity ? citiesData[city].seoTitle : data.seoTitle;
  const pageDesc = isCity ? citiesData[city].metaDescription : data.metaDescription;
  const canonicalUrl = isCity ? `/${city}-pa-home-care` : `/areas-we-serve/${data.slug}`;

  // Generate dynamic JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${site.url}${canonicalUrl}/#localbusiness`,
        "name": isCity ? `${site.name} - Home Care in ${city.charAt(0).toUpperCase() + city.slice(1)}, PA` : `${site.name} - ${data.name} In-Home Care`,
        "url": `${site.url}${canonicalUrl}`,
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
          "name": isCity ? `${city.charAt(0).toUpperCase() + city.slice(1)}, PA` : data.name
        },
        "description": pageDesc
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${site.url}${canonicalUrl}/#breadcrumb`,
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
            "name": isCity ? `${city.charAt(0).toUpperCase() + city.slice(1)}, PA` : data.name,
            "item": `${site.url}${canonicalUrl}`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}${canonicalUrl}/#faq`,
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
      <CountyPageClient data={data} city={city} />
    </>
  );
}
