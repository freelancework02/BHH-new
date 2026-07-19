import ServicesClient from "./ServicesClient";
import { site } from "@/lib/site";

export async function generateMetadata({ searchParams }) {
  const service = searchParams?.service;

  const serviceSeo = {
    "companion-care": {
      title: `Companion Care | ${site.name}`,
      description: `Companion Care tailored to your family's needs, available across our PA service area. Learn what's included and request a free consultation.`,
      canonical: "/companion-care"
    },
    "personal-care": {
      title: `Personal Care / Personal Care Aide | ${site.name}`,
      description: `Personal Care / Personal Care Aide tailored to your family's needs, available across our PA service area. Learn what's included and request a free consultation.`,
      canonical: "/personal-care"
    },
    "24hour-care": {
      title: `24-Hour & Live-In Care | ${site.name}`,
      description: `24-Hour & Live-In Care tailored to your family's needs, available across our PA service area. Learn what's included and request a free consultation.`,
      canonical: "/24-hour-live-in-care"
    },
    "dementia-care": {
      title: `Dementia & Alzheimer's Care | ${site.name}`,
      description: `Dementia & Alzheimer's Care tailored to your family's needs, available across our PA service area. Learn what's included and request a free consultation.`,
      canonical: "/dementia-alzheimers-care"
    },
    "respite-care": {
      title: `Post-Hospital / Respite Care | ${site.name}`,
      description: `Post-Hospital / Respite Care tailored to your family's needs, available across our PA service area. Learn what's included and request a free consultation.`,
      canonical: "/post-hospital-respite-care"
    }
  };

  const seo = service && serviceSeo[service];
  const title = seo ? seo.title : `Professional In-Home Care Services | ${site.name}`;
  const description = seo ? seo.description : `Blessed Hearts Homecare offers licensed companion care, personal care, memory support, and respite care in Pennsylvania. Request a free assessment.`;
  const canonicalUrl = seo ? seo.canonical : "/services";

  return {
    title,
    description,
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
  return <ServicesClient initialService={searchParams?.service} />;
}
