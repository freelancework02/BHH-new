import { Poppins, Open_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-body",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cta",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `In-Home Care Services in York, PA | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Blessed Hearts Homecare offers professional, compassionate in-home care services, companion care, housekeeping, and Medicaid waiver caregiver options in York, PA.",
  keywords: [
    "home care agency York PA",
    "Medicaid waiver caregiver York PA",
    "in-home care York PA",
    "companion care Pennsylvania",
  ],
  openGraph: {
    title: `In-Home Care Services in York, PA | ${site.name}`,
    description:
      "Compassionate in-home care, companion care, housekeeping, and Medicaid waiver caregiver options in York, PA.",
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/logo.png`,
    },
    {
      "@type": "LocalBusiness",
      name: `${site.name} - York PA Office`,
      telephone: site.phoneDisplay,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.line1,
        addressLocality: site.address.city,
        addressRegion: site.address.state,
        postalCode: site.address.zip,
        addressCountry: "US",
      },
      areaServed: site.serviceAreas,
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${openSans.variable} ${montserrat.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
