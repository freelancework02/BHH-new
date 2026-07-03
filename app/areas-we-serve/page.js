import { MapPin, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import Placeholder from "@/components/Placeholder";
import CTASection from "@/components/CTASection";
import { site } from "@/lib/site";

export const metadata = {
  title: "Areas We Serve",
  description:
    "Blessed Hearts Homecare proudly serves York County, Adams County, Lancaster County, Cumberland County, and Dauphin County, Pennsylvania.",
  alternates: { canonical: "/areas-we-serve" },
};

export default function AreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Service Area"
        title="Proudly Serving South Central Pennsylvania"
        description="From our York, PA office, our caregivers travel throughout the surrounding counties to bring compassionate care home."
        mediaLabel="Map pin marking the Blessed Hearts Homecare service region"
      />

      <section className="section" aria-labelledby="counties-heading">
        <div className="container grid grid--2" style={{ alignItems: "center" }}>
          <div>
            <h2 id="counties-heading">Counties We Serve</h2>
            <ul style={{ display: "grid", gap: "0.85rem" }}>
              {site.serviceAreas.map((area) => (
                <li key={area} style={{ display: "flex", gap: "0.65rem", alignItems: "center" }}>
                  <CheckCircle2 size={20} color="var(--pink)" aria-hidden="true" />
                  <span>{area}, PA</span>
                </li>
              ))}
            </ul>
            <p className="mt-lg">
              Not sure if we cover your town? Reach out — we&apos;re always growing our coverage
              area and happy to talk through your options.
            </p>
          </div>
          <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", minHeight: "22rem" }}>
            <Placeholder label="Stylized map of the counties Blessed Hearts Homecare serves" />
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="office-heading">
        <div className="container text-center" style={{ maxWidth: "40rem" }}>
          <MapPin size={32} color="var(--pink)" aria-hidden="true" />
          <h2 id="office-heading">Visit or Call Our York Office</h2>
          <p>
            {site.address.line1}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </p>
          <p>
            <a href={site.phoneHref}>{site.phoneDisplay}</a> &middot; We speak English and Spanish,
            and are available 24/7.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
