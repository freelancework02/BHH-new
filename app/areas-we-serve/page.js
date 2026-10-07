import AreasWeServeClient from "./AreasWeServeClient";
import { site, defaultOgImages, defaultTwitterImages } from "@/lib/site";

export const metadata = {
  title: "Areas We Serve in Pennsylvania | 10 Counties",
  description:
    "Blessed Hearts Homecare provides licensed in-home senior care across 10 Pennsylvania counties including York, Lancaster, Dauphin, Cumberland, Adams, Lebanon, Perry, Berks, Lehigh, and Northampton.",
  keywords: [
    "home care service areas Pennsylvania",
    "senior care York County PA",
    "home care Lancaster County PA",
    "home care Harrisburg PA",
    "in-home care Cumberland County",
    "senior care Adams County",
    "Medicaid waiver counties PA",
  ],
  alternates: {
    canonical: "/areas-we-serve",
  },
  openGraph: {
    title: `Areas We Serve across 10 PA Counties | ${site.name}`,
    description:
      "Licensed in-home care serving York, Lancaster, Harrisburg, Reading, Allentown & 10 PA counties.",
    url: `${site.url}/areas-we-serve`,
    type: "website",
    siteName: site.name,
    images: defaultOgImages,
  },
  twitter: {
    card: "summary_large_image",
    title: `Areas We Serve across 10 PA Counties | ${site.name}`,
    description:
      "Licensed in-home care serving York, Lancaster, Harrisburg & 10 PA counties.",
    images: defaultTwitterImages,
  },
};

export default function AreasWeServePage() {
  return <AreasWeServeClient />;
}
