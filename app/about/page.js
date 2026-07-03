import Image from "next/image";
import PageHero from "@/components/PageHero";
import Placeholder from "@/components/Placeholder";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import { site } from "@/lib/site";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Blessed Hearts Homecare's history, values, licensing, and background-check protocols serving York, PA and surrounding counties.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="About Blessed Hearts Homecare"
        description="A York, PA based home care agency built on one guiding principle: care from the heart."
        mediaLabel="The Blessed Hearts Homecare care team"
        imageSrc="/images/hero-caregiver.png"
      />

      <section className="section text-center" aria-labelledby="mission-heading">
        <div className="container" style={{ maxWidth: "48rem" }}>
          <h2 id="mission-heading">Care from the Heart</h2>
          <p>
            Blessed Hearts Homecare was founded to make a real difference in how quality home care
            is delivered to families across York County and beyond. We believe every client
            deserves to be treated with dignity, patience, and genuine warmth — the same care
            we&apos;d want for our own families.
          </p>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="values-heading">
        <div className="container grid grid--2" style={{ alignItems: "center" }}>
          <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", minHeight: "24rem", position: "relative" }}>
            <Image
              src="/images/caregiver-client-warm.png"
              alt="Caregiver sharing a warm moment with a client"
              fill
              sizes="(max-width: 40rem) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div>
            <h2 id="values-heading">Licensed, Trained, and Trusted</h2>
            <p>
              Every caregiver on our team undergoes a thorough background check and hands-on
              training before ever stepping into a client&apos;s home. We are fully licensed to
              provide home care services in Pennsylvania and are committed to meeting the highest
              standards of safety and professionalism.
            </p>
            <p>
              We also work closely with families navigating Pennsylvania&apos;s Medicaid waiver
              programs, helping make quality in-home care accessible regardless of income or
              insurance coverage.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="commitment-heading">
        <div className="container text-center" style={{ maxWidth: "44rem" }}>
          <h2 id="commitment-heading">Our Commitment to {site.serviceAreas.join(", ")}</h2>
          <p>
            From our office in {site.address.city}, {site.address.state}, we proudly serve
            families throughout York, Adams, Lancaster, Cumberland, and Dauphin counties, offering
            24/7 availability for the care needs that matter most.
          </p>
        </div>
      </section>

      <Testimonials />
      <CTASection />
    </>
  );
}
