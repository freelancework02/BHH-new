import FAQClient from "./FAQClient";
import { flatFaqItems, faqGroups } from "@/lib/faqData";
import { site } from "@/lib/site";

export const metadata = {
  title: `Home Care FAQs: Costs, Medicaid Waiver, Hours & Caregiver Questions | ${site.name}`,
  description:
    "Got questions about in-home care in Pennsylvania? Find answers on home care costs per hour, Medicaid CHC waiver coverage, Medicare vs Medicaid, caregiver vetting, and 24/7 schedules.",
  keywords: [
    "how much does home care cost in PA",
    "home care cost per hour Pennsylvania",
    "does Medicaid pay for home care in PA",
    "Medicaid waiver caregiver PA",
    "Community HealthChoices PA home care",
    "difference between home health and home care",
    "home care FAQs",
    "hire caregiver for parent PA",
    "24 hour care cost PA",
  ],
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: `Home Care FAQs: Costs, Medicaid & Services in PA | ${site.name}`,
    description:
      "Clear, expert answers about home care costs in Pennsylvania, Medicaid waiver eligibility, caregiver vetting, and customized care schedules.",
    url: `${site.url}/faq`,
    type: "website",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `Home Care FAQs | ${site.name}`,
    description:
      "Answers to top questions about PA in-home senior care costs, Medicaid waiver, and hiring a caregiver.",
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
