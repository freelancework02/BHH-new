import ContactClient from "./ContactClient";
import { site, defaultOgImages, defaultTwitterImages } from "@/lib/site";

export const metadata = {
  title: `Contact Us | Request Free In-Home Care Consultation | ${site.name}`,
  description:
    "Contact Blessed Hearts Homecare in York, PA. Request a free in-home assessment, ask about Medicaid waiver coverage, or call (223) 260-9042 to speak with a local care coordinator.",
  keywords: [
    "contact Blessed Hearts Homecare",
    "home care consultation York PA",
    "home care phone number York PA",
    "senior care intake Pennsylvania",
    "Medicaid waiver coordinator PA",
  ],
  alternates: {
    canonical: "/contact-us",
  },
  openGraph: {
    title: `Contact Us | ${site.name}`,
    description:
      "Request a free in-home assessment or call (223) 260-9042. Serving York, Lancaster, Harrisburg & 10 PA counties.",
    url: `${site.url}/contact-us`,
    type: "website",
    siteName: site.name,
    images: defaultOgImages,
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact Us | ${site.name}`,
    description:
      "Request a free in-home assessment or call (223) 260-9042. Serving York, Lancaster, Harrisburg & 10 PA counties.",
    images: defaultTwitterImages,
  },
};

export default function ContactUsPage() {
  return <ContactClient />;
}
