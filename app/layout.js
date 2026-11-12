import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import CookieConsent from "@/components/CookieConsent";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import { site, defaultOgImages, defaultTwitterImages } from "@/lib/site";
import Script from "next/script";

const poppins = localFont({
  src: [
    { path: "./fonts/poppins-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-heading",
  display: "swap",
});

const openSans = localFont({
  src: "./fonts/open-sans.woff2",
  weight: "300 600",
  variable: "--font-body",
  display: "swap",
});

const montserrat = localFont({
  src: "./fonts/montserrat.woff2",
  weight: "500 600",
  variable: "--font-cta",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Blessed Hearts Homecare | Home Care Services Near York, Pennsylvania | In-Home Senior Care",
    template: `%s | ${site.name}`,
  },
  description:
    "Blessed Hearts Homecare provides licensed, compassionate in-home care services including personal care, companion care, dementia care, and Medicaid waiver support across York, Lancaster, Harrisburg & 10 PA counties. Free consultation.",
  keywords: [
    "home care agency York PA",
    "in-home care York PA",
    "home care services Pennsylvania",
    "senior home care York PA",
    "companion care Pennsylvania",
    "personal care aide York PA",
    "Medicaid waiver caregiver York PA",
    "Medicaid home care PA",
    "home care near me Pennsylvania",
    "elder care York County PA",
    "dementia care at home PA",
    "respite care Pennsylvania",
    "24 hour home care York PA",
    "home care Lancaster PA",
    "home care Harrisburg PA",
    "senior care services South Central PA",
    "in-home caregiver services PA",
    "home care for veterans PA",
    "Community HealthChoices PA",
  ],
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Blessed Hearts Homecare | Home Care Services Near York, Pennsylvania | In-Home Senior Care",
    description:
      "Licensed, compassionate in-home care including personal care, companion care, dementia care & Medicaid waiver support across York, Lancaster, Harrisburg & 10 PA counties.",
    url: site.url,
    siteName: site.name,
    images: defaultOgImages,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blessed Hearts Homecare | Home Care Services Near York, Pennsylvania | In-Home Senior Care",
    description:
      "Licensed, compassionate in-home care including personal care, companion care, dementia care & Medicaid waiver support across 10 PA counties.",
    images: defaultTwitterImages,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/images/logo-horizontal-official.webp`,
      description:
        "Licensed home care agency providing compassionate in-home care services across South Central & Eastern Pennsylvania.",
      sameAs: [
        site.social.facebook,
        site.social.instagram,
        site.googleBusinessUrl,
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-223-260-9042",
        contactType: "customer service",
        areaServed: "US",
        availableLanguage: [
          "English",
          "Spanish",
          "Chinese",
          "Nepali",
          "Russian",
          "Arabic",
          "Haitian Creole",
          "Vietnamese",
          "Ukrainian",
          "Portuguese",
          "Bengali",
          "French",
          "Cambodian",
          "Korean",
          "Gujarati",
          "Hindi",
          "Urdu",
          "Burmese",
          "Albanian"
        ],
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${site.url}/#localbusiness`,
      name: `${site.name}`,
      image: `${site.url}/images/logo-horizontal-official.webp`,
      telephone: site.phoneDisplay,
      email: site.email,
      url: site.url,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.line1,
        addressLocality: site.address.city,
        addressRegion: site.address.state,
        postalCode: site.address.zip,
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 39.9440,
        longitude: -76.7196,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "17:00",
        },
      ],
      areaServed: site.serviceAreas.map((area) => ({
        "@type": "AdministrativeArea",
        name: area,
      })),
      hasMap: "https://www.google.com/maps/place/1224+S+Queen+St+%23206,+York,+PA+17403",
      serviceType: [
        "Personal Care",
        "Companion Care",
        "Dementia Care",
        "Respite Care",
        "Light Housekeeping",
        "Meal Preparation",
        "Transportation Support",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description:
        "Licensed home care agency providing compassionate in-home care across 10 Pennsylvania counties.",
      publisher: {
        "@id": `${site.url}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${site.url}/blogs?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-03RJ0S1WGG";

  return (
    <html lang="en" className={`${poppins.variable} ${openSans.variable} ${montserrat.variable}`}>
      <head>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon-precomposed" sizes="180x180" href="/apple-touch-icon-precomposed.png" />
        <meta name="apple-mobile-web-app-title" content="Blessed Hearts" />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
        <Chatbot />
        <CookieConsent />
        <AccessibilityWidget />
        <div id="google_translate_element" style={{ display: "none" }} aria-hidden="true" />
      </body>
    </html>
  );
}
