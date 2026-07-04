import { MapPin, CheckCircle2, Navigation, Map } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { site } from "@/lib/site";

export const metadata = {
  title: "Areas We Serve",
  description:
    "Blessed Hearts Homecare proudly serves York County, Adams County, Lancaster County, Cumberland County, and Dauphin County, Pennsylvania.",
  alternates: { canonical: "/areas-we-serve" },
};

const countyMunicipalities = [
  {
    name: "York County",
    cities: ["York City", "Hanover", "Red Lion", "Dallastown", "Shrewsbury", "West York", "Wrightsville"],
    status: "Primary Hub"
  },
  {
    name: "Lancaster County",
    cities: ["Lancaster City", "Columbia", "Millersville", "Lititz", "Mount Joy", "Elizabethtown", "Ephrata"],
    status: "Active Coverage"
  },
  {
    name: "Adams County",
    cities: ["Gettysburg", "Littlestown", "East Berlin", "McSherrystown", "New Oxford", "Carroll Valley"],
    status: "Active Coverage"
  },
  {
    name: "Cumberland County",
    cities: ["Carlisle", "Mechanicsburg", "Camp Hill", "Shiremanstown", "Enola", "Lemoyne", "New Cumberland"],
    status: "Active Coverage"
  },
  {
    name: "Dauphin County",
    cities: ["Harrisburg", "Hershey", "Middletown", "Lower Paxton", "Steelton", "Hummelstown", "Penbrook"],
    status: "Active Coverage"
  }
];

export default function AreasPage() {
  return (
    <>
      <PageHero
        variant="services"
        eyebrow="PA SERVICE COVERAGE"
        title="Proudly Serving South Central Pennsylvania"
        description="From our York, PA office, our caregivers travel throughout the surrounding counties to bring compassionate care home."
        mediaLabel="Map pin marking the Blessed Hearts Homecare service region"
        imageSrc="/images/caregiver-meeting.png"
      />

      {/* Counties municipalities Directory */}
      <section className="section service-areas-luxury" aria-labelledby="municipalities-heading">
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">COUNTIES &amp; MUNICIPALITIES</span>
            <h2 id="municipalities-heading" className="section-title-luxury">Our Service Directory</h2>
            <p className="section-subtitle-luxury">
              We provide licensed in-home care services across the following local boroughs, cities, and townships:
            </p>
          </div>

          <div className="areas-grid-luxury" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))", gap: "2rem" }}>
            {countyMunicipalities.map((county, i) => (
              <div key={i} className="area-card-luxury" style={{ display: "flex", flexDirection: "column" }}>
                <div className="area-card__pin" aria-hidden="true" style={{ background: county.status === "Primary Hub" ? "rgba(255, 45, 122, 0.08)" : "rgba(255, 122, 26, 0.08)", color: county.status === "Primary Hub" ? "var(--pink)" : "var(--orange)" }}>
                  {county.status}
                </div>
                
                <h3 style={{ borderBottom: "1px solid rgba(0,0,0,0.05)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
                  {county.name}
                </h3>
                
                <ul style={{ display: "grid", gap: "0.4rem", listStyle: "none", padding: 0, margin: "0 0 1.5rem 0", flexGrow: 1 }}>
                  {county.cities.map((city, cityIndex) => (
                    <li key={cityIndex} style={{ display: "flex", gap: "0.4rem", alignItems: "center", fontSize: "0.85rem", color: "#555555" }}>
                      <span className="trust-badge-check" style={{ fontSize: "0.75rem" }} aria-hidden="true">✓</span>
                      <span>{city}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pennsylvania Coverage Map Section */}
      <section className="section services-alternating" aria-labelledby="map-title-heading">
        <div className="container">
          <div className="service-row-luxury service-row-luxury--reversed">
            
            {/* Left Column: Stylized map of the counties */}
            <div className="service-row-luxury__media">
              <div className="service-row-luxury__image-container" style={{ border: "4px solid var(--white)", boxShadow: "0 20px 45px rgba(90, 26, 94, 0.08)" }}>
                <Image
                  src="/images/service-area-map.png"
                  alt="Stylized regional coverage map of South Central Pennsylvania"
                  fill
                  sizes="(max-width: 56rem) 100vw, 45vw"
                  className="service-row-luxury__img"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Right Column: Local Coordination Details */}
            <div className="service-row-luxury__content">
              <div className="service-row-luxury__card" style={{ overflow: "visible" }}>
                <div className="why-us-card__icon-wrapper">
                  <Map className="why-us-card__icon" />
                </div>
                <span className="eyebrow-luxury-accent" style={{ fontSize: "0.8rem", marginBottom: "0.5rem", display: "block" }}>REGIONAL REACH</span>
                <h2 id="map-title-heading" className="section-title-luxury" style={{ textAlign: "left", fontSize: "1.85rem", marginBottom: "1rem" }}>
                  South Central PA Coverage Map
                </h2>
                <p style={{ fontSize: "1rem", lineHeight: "1.65", color: "#555555", marginBottom: "1.25rem" }}>
                  Blessed Hearts Homecare bridges care gaps throughout Adams, Cumberland, Dauphin, Lancaster, and York counties. Our regional care map extends support directly to rural communities and municipal centers alike.
                </p>
                <p style={{ fontSize: "1rem", lineHeight: "1.65", color: "#555555", marginBottom: "1.5rem" }}>
                  Whether your loved one is in Harrisburg, Gettysburg, or Lancaster City, our network of screened caregivers provides consistent home care assistance matching your exact schedule.
                </p>

                <div className="why-us-grid-luxury" style={{ gridTemplateColumns: "1fr", gap: "1rem", marginTop: "1rem" }}>
                  <Link href="/contact-us" className="btn-luxury-primary" style={{ textDecoration: "none", display: "inline-flex", justifyContent: "center" }}>
                    Request Local Consultation
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* York Office map and live Google Road Map */}
      <section className="section why-us-luxury" aria-labelledby="office-location-heading">
        <div className="container">
          <div className="service-row-luxury">
            
            {/* Left Column: Office Details */}
            <div className="service-row-luxury__content">
              <div className="service-row-luxury__card" style={{ overflow: "visible" }}>
                <div className="why-us-card__icon-wrapper">
                  <MapPin className="why-us-card__icon" />
                </div>
                <span className="eyebrow-luxury-accent" style={{ fontSize: "0.8rem", marginBottom: "0.5rem", display: "block" }}>PHYSICAL HQ</span>
                <h2 id="office-location-heading" className="section-title-luxury" style={{ textAlign: "left", fontSize: "1.85rem", marginBottom: "1rem" }}>
                  Visit Our York Office
                </h2>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--plum)", lineHeight: "1.4", marginBottom: "1.25rem" }}>
                  {site.address.line1}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </p>
                <p style={{ fontSize: "1rem", lineHeight: "1.65", color: "#555555", marginBottom: "1.5rem" }}>
                  Located on South Queen Street, Suite 206 in York, PA, our office coordinates matches, schedules, and clinical coordinator reviews for families. Call us directly to speak with an on-call care specialist at any time.
                </p>

                <div style={{ display: "grid", gap: "0.75rem", borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "1.5rem" }}>
                  <span style={{ fontSize: "0.9rem", color: "#555555" }}>
                    <strong>Phone:</strong> <a href={site.phoneHref} style={{ color: "var(--pink)", fontWeight: 700 }}>{site.phoneDisplay}</a>
                  </span>
                  <span style={{ fontSize: "0.9rem", color: "#555555" }}>
                    <strong>Operating Hours:</strong> Mon - Fri, 9am - 5pm (On-Call Coordinators 24/7)
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Google Map Embed */}
            <div className="service-row-luxury__media">
              <div className="service-row-luxury__image-container" style={{ border: "4px solid var(--white)", boxShadow: "0 20px 45px rgba(26, 5, 28, 0.08)", minHeight: "26rem" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3056.8839077222384!2d-76.71960292398436!3d39.943960071519965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c88ede53eb5183%3A0xc3f8e65814bfb2b1!2s1224%20S%20Queen%20St%20%23206%2C%20York%2C%20PA%2017403!5e0!3m2!1sen!2sus!4v1719999999999!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: "absolute", inset: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Blessed Hearts Homecare Office Google Road Map"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
