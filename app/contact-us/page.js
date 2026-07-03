import Link from "next/link";
import PageHero from "@/components/PageHero";
import ContactSplit from "@/components/ContactSplit";
import Placeholder from "@/components/Placeholder";
import { site } from "@/lib/site";

export const metadata = {
  title: "Contact Us",
  description: `Reach ${site.name} in York, PA. Call ${site.phoneDisplay}, email us, or submit our contact form to request care.`,
  alternates: { canonical: "/contact-us" },
};

export default function ContactUsPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        description="We're available for your needs 24/7. Reach out and a member of our care team will respond promptly."
        ctaLabel={null}
        mediaLabel="Caregiver embracing an elderly client warmly"
      />

      <section className="section" aria-labelledby="get-in-touch-heading">
        <div className="container">
          <h2 id="get-in-touch-heading" className="visually-hidden">
            Get in touch
          </h2>
          <ContactSplit />
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="map-heading">
        <div className="container grid grid--2" style={{ alignItems: "center" }}>
          <div>
            <h2 id="map-heading">Find Our York Office</h2>
            <p>
              {site.address.line1}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </p>
            <p>
              <a href={site.phoneHref}>{site.phoneDisplay}</a> &middot; Fax {site.faxDisplay}
            </p>
          </div>
          <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", minHeight: "18rem" }}>
            <Placeholder label="Map showing the Blessed Hearts Homecare York office location" />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="careers-heading">
        <div className="container text-center" style={{ maxWidth: "36rem" }}>
          <h2 id="careers-heading">Interested in Working With Us?</h2>
          <p>We seek caregivers who are hardworking, compassionate, and determined to give the best care.</p>
          <Link href="/contact-us" className="btn btn--gradient">
            Join Our Team
          </Link>
        </div>
      </section>
    </>
  );
}
