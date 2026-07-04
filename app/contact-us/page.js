"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Placeholder from "@/components/Placeholder";
import { site } from "@/lib/site";
import { MapPin, Phone, Printer, Mail, Clock, ShieldCheck, CheckCircle } from "lucide-react";

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero
        variant="services"
        eyebrow="GET IN TOUCH"
        title="Contact Blessed Hearts Homecare"
        description="We're available for your needs 24/7. Reach out and a member of our care team will respond promptly."
        ctaLabel={null}
        mediaLabel="Caregiver embracing an elderly client warmly"
        imageSrc="/images/caregiver-meeting.png"
      />

      {/* Main Contact Hub (Split Grid layout) */}
      <section className="section" aria-labelledby="get-in-touch-heading">
        <div className="container">
          <div className="service-row-luxury" style={{ alignItems: "stretch", gap: "3.5rem" }}>
            
            {/* Left Column: Form Card Container */}
            <div className="form-card-luxury" style={{ border: "1px solid rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div className="section-heading-luxury" style={{ textAlign: "left", alignItems: "flex-start", marginBottom: "2rem" }}>
                <span className="eyebrow-luxury-accent">SEND A MESSAGE</span>
                <h2 id="get-in-touch-heading" className="section-title-luxury" style={{ fontSize: "1.85rem", marginLeft: 0 }}>Request Information</h2>
              </div>
              <ContactForm />
            </div>

            {/* Right Column: Agency Details Sidebar Card */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              
              {/* Card 1: Main Contacts */}
              <div className="service-row-luxury__card" style={{ padding: "2.25rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem", height: "100%" }}>
                <span className="eyebrow-luxury-accent" style={{ fontSize: "0.8rem", marginBottom: "0" }}>OFFICE CONTACTS</span>
                
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <MapPin className="trust-badge-check" style={{ color: "var(--pink)", marginTop: "0.2rem", flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--plum)", margin: "0 0 0.25rem 0" }}>York Office HQ</h4>
                    <p style={{ fontSize: "0.9rem", color: "#555555", margin: 0, lineHeight: "1.4" }}>
                      {site.address.line1}<br />
                      {site.address.city}, {site.address.state} {site.address.zip}
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <Phone className="trust-badge-check" style={{ color: "var(--pink)", marginTop: "0.2rem", flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--plum)", margin: "0 0 0.25rem 0" }}>Phone Lines</h4>
                    <p style={{ fontSize: "0.9rem", color: "#555555", margin: 0 }}>
                      <a href={site.phoneHref} style={{ color: "var(--pink)", fontWeight: 700, textDecoration: "none" }}>{site.phoneDisplay}</a>
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <Printer className="trust-badge-check" style={{ color: "var(--pink)", marginTop: "0.2rem", flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--plum)", margin: "0 0 0.25rem 0" }}>Office Fax</h4>
                    <p style={{ fontSize: "0.9rem", color: "#555555", margin: 0 }}>{site.faxDisplay}</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <Mail className="trust-badge-check" style={{ color: "var(--pink)", marginTop: "0.2rem", flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--plum)", margin: "0 0 0.25rem 0" }}>Email Support</h4>
                    <p style={{ fontSize: "0.9rem", color: "#555555", margin: 0 }}>
                      <a href={`mailto:${site.email}`} style={{ color: "var(--plum)", fontWeight: 600, textDecoration: "none" }}>{site.email}</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: Hours/Emergency availability */}
              <div className="service-row-luxury__card" style={{ padding: "2rem", background: "linear-gradient(135deg, #fdf6fa 0%, #fef5f0 100%)", border: "1px solid rgba(255, 45, 122, 0.08)" }}>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <Clock className="trust-badge-check" style={{ color: "var(--orange)", flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: "var(--plum)", margin: "0 0 0.25rem 0" }}>24/7/365 On-Call Availability</h4>
                    <p style={{ fontSize: "0.85rem", color: "#555555", margin: 0, lineHeight: "1.5" }}>
                      Our office operates normal business hours (Monday - Friday, 9am - 5pm), but our local care coordinators are available on call 24 hours a day, 365 days a year, to handle emergencies, schedule updates, or urgent care consults.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Office location map placeholder */}
      <section className="section services-alternating" aria-labelledby="map-heading">
        <div className="container">
          <div className="service-row-luxury">
            {/* Left: Map */}
            <div className="service-row-luxury__media">
              <div className="service-row-luxury__image-container" style={{ border: "4px solid var(--white)", boxShadow: "0 20px 45px rgba(26, 5, 28, 0.08)", height: "24rem" }}>
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

            {/* Right: Directions */}
            <div className="service-row-luxury__content">
              <div className="service-row-luxury__card">
                <span className="eyebrow-luxury-accent" style={{ fontSize: "0.8rem", marginBottom: "0.5rem", display: "block" }}>HOW TO FIND US</span>
                <h3 style={{ fontSize: "1.5rem" }}>Our Queen Street Location</h3>
                <p style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                  We are conveniently located on South Queen Street in York, Suite 206, right near the Interstate 83 Queen Street exit. Parking is free and fully accessible for seniors and individuals with disabilities. Walk-in inquiries are welcome.
                </p>
                <div style={{ marginTop: "1.5rem" }}>
                  <a href={`https://maps.google.com/?q=1224+S+Queen+St+Suite+206+York+PA+17403`} target="_blank" rel="noopener noreferrer" className="btn-luxury-secondary-small" style={{ textDecoration: "none" }}>
                    Get Driving Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Careers hiring recruitment block */}
      <section className="section service-areas-luxury" aria-labelledby="careers-heading">
        <div className="container" style={{ maxWidth: "44rem" }}>
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">WE ARE HIRING</span>
            <h2 id="careers-heading" className="section-title-luxury">Join Our Local Caregiver Team</h2>
            <p className="section-subtitle-luxury" style={{ marginBottom: "2rem" }}>
              Are you a compassionate, hardworking caregiver in York, Lancaster, or Adams county? We offer competitive pay, flexible schedules, ongoing skills training, and a supportive, family-friendly culture.
            </p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "flex-start", maxWidth: "24rem", margin: "0 auto 2.5rem auto" }}>
              <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.9rem" }}>
                <CheckCircle size={16} className="trust-badge-check" style={{ marginTop: "0.15rem" }} />
                <span style={{ fontWeight: 600 }}>Competitive Hourly Rates &amp; Weekly Pay</span>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.9rem" }}>
                <CheckCircle size={16} className="trust-badge-check" style={{ marginTop: "0.15rem" }} />
                <span style={{ fontWeight: 600 }}>Flexible Shifts (Day, Night, Weekend)</span>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.9rem" }}>
                <CheckCircle size={16} className="trust-badge-check" style={{ marginTop: "0.15rem" }} />
                <span style={{ fontWeight: 600 }}>Paid Training &amp; Career Development</span>
              </div>
            </div>

            <div>
              <a href="mailto:blessedheartshca1@gmail.com?subject=Caregiver Application Request" className="btn-luxury-primary" style={{ textDecoration: "none" }}>
                Email Resume to Apply
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
