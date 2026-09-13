import ServicesClient from "./ServicesClient";
import { site } from "@/lib/site";

export async function generateMetadata({ searchParams }) {
  const service = searchParams?.service;

  const serviceSeo = {
    "companion-care": {
      title: `Companion Care Services Near Me | Elderly Companionship PA | ${site.name}`,
      description: `Looking for companion care near me in PA? Blessed Hearts Homecare provides compassionate senior companionship, meal prep, transportation & social engagement across York, Lancaster & 10 PA counties.`,
      canonical: "/companion-care",
      keywords: [
        "companion care near me",
        "elderly companion services PA",
        "companion caregiver York PA",
        "senior companion care Lancaster",
        "non-medical companion care",
      ],
    },
    "personal-care": {
      title: `Personal Care Aide Services in York, PA | In-Home Caregiver | ${site.name}`,
      description: `Certified personal care aides in York, PA and South Central Pennsylvania. Hands-on assistance with bathing, dressing, grooming, hygiene & mobility. Medicaid waiver accepted.`,
      canonical: "/personal-care",
      keywords: [
        "personal care aide PA",
        "personal care assistant York PA",
        "in home caregiver services",
        "personal care near me",
        "Medicaid waiver personal care PA",
      ],
    },
    "24hour-care": {
      title: `24-Hour Home Care & Live-In Caregiver Services PA | ${site.name}`,
      description: `Reliable 24-hour home care and live-in caregivers in York, Lancaster, Harrisburg & across Pennsylvania. Continuous around-the-clock safety, monitoring, and personalized care.`,
      canonical: "/24-hour-live-in-care",
      keywords: [
        "24 hour home care near me",
        "live in caregiver Pennsylvania",
        "around the clock senior care",
        "overnight home care York PA",
        "24 hour caregiver cost PA",
      ],
    },
    "dementia-care": {
      title: `Dementia & Alzheimer's Care at Home in PA | Memory Care | ${site.name}`,
      description: `Specialized in-home Alzheimer's & dementia care across Pennsylvania. Compassionate memory care caregivers supporting cognitive safety, daily routines, and family peace of mind.`,
      canonical: "/dementia-alzheimers-care",
      keywords: [
        "dementia care at home PA",
        "Alzheimer's home care near me",
        "in home memory care York PA",
        "dementia caregiver Pennsylvania",
        "memory care services at home",
      ],
    },
    "respite-care": {
      title: `Respite Care Services for Family Caregivers in PA | ${site.name}`,
      description: `Short-term respite care services in York, PA and surrounding counties. Relieve family caregiver burnout with flexible hourly, overnight, and temporary in-home relief.`,
      canonical: "/post-hospital-respite-care",
      keywords: [
        "respite care near me",
        "respite care services PA",
        "caregiver burnout relief York PA",
        "short term in home care",
        "respite caregiver Pennsylvania",
      ],
    },
  };

  const seo = service && serviceSeo[service];
  const title = seo ? seo.title : `In-Home Senior Care Services in Pennsylvania | ${site.name}`;
  const description = seo
    ? seo.description
    : `Blessed Hearts Homecare offers licensed companion care, personal care aides, dementia care, 24-hour live-in care, respite care, and Medicaid waiver support across York, Lancaster, Harrisburg & 10 PA counties. Request a free assessment.`;
  const canonicalUrl = seo ? seo.canonical : "/services";
  const pageKeywords = seo
    ? seo.keywords
    : [
        "home care services near me",
        "in-home care services PA",
        "senior care York PA",
        "personal care aide PA",
        "companion care Lancaster PA",
        "dementia care at home PA",
        "respite care Pennsylvania",
        "Medicaid waiver home care PA",
      ];

  return {
    title,
    description,
    keywords: pageKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: `${site.url}${canonicalUrl}`,
      type: "website",
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function ServicesPage({ searchParams }) {
  const service = searchParams?.service;

  const serviceNames = {
    "companion-care": "Companion Care Services",
    "personal-care": "Personal Care Aide Services",
    "24hour-care": "24-Hour & Live-In Care",
    "dementia-care": "Dementia & Alzheimer's Care at Home",
    "respite-care": "Respite Care for Family Caregivers",
  };

  const activeServiceName = service && serviceNames[service] ? serviceNames[service] : "In-Home Care Services";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${site.url}/services/#breadcrumb`,
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
            name: "Services",
            item: `${site.url}/services`,
          },
          ...(service
            ? [
                {
                  "@type": "ListItem",
                  position: 3,
                  name: activeServiceName,
                  item: `${site.url}/services?service=${service}`,
                },
              ]
            : []),
        ],
      },
      {
        "@type": "Service",
        "@id": `${site.url}/services/#service`,
        name: activeServiceName,
        provider: {
          "@type": "HomeAndConstructionBusiness",
          additionalType: "https://schema.org/HomeHealthCareService",
          name: site.name,
          telephone: site.phoneDisplay,
          url: site.url,
          address: {
            "@type": "PostalAddress",
            streetAddress: site.address.line1,
            addressLocality: site.address.city,
            addressRegion: site.address.state,
            postalCode: site.address.zip,
            addressCountry: "US",
          },
        },
        areaServed: site.serviceAreas.map((area) => ({
          "@type": "AdministrativeArea",
          name: area + ", Pennsylvania",
        })),
        serviceType: "In-Home Senior Care",
        description:
          "Licensed, compassionate non-medical home care services including personal care, companion care, dementia care, respite care, and Medicaid waiver support.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesClient initialService={searchParams?.service} />
    </>
  );
}
