import FAQClient from "./FAQClient";
import { flatFaqItems, faqGroups } from "@/lib/faqData";
import { site } from "@/lib/site";

export const metadata = {
  title: "Home Care FAQ in Pennsylvania",
  description:
    "Answers to common home care questions about cost, Medicare, Medicaid CHC, caregivers, schedules, services, and licensing in Pennsylvania.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: `Home Care FAQ in Pennsylvania | ${site.name}`,
    description:
      "Get clear answers about home care costs, Medicaid CHC, caregiver screening, scheduling, services, and local licensing.",
    url: `${site.url}/faq`,
    type: "website",
    siteName: site.name,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${site.url}/faq/#breadcrumb`,
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
          name: "FAQ",
          item: `${site.url}/faq`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/faq/#faq`,
      mainEntity: flatFaqItems.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FAQClient faqGroups={faqGroups} site={site} />
    </>
  );
}
