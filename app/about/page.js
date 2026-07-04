import AboutClient from "@/components/AboutClient";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Blessed Hearts Homecare's history, values, licensing, and background-check protocols serving York, PA and surrounding counties.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutClient />;
}
