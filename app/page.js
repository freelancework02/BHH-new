import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import {
  ShieldCheck,
  HeartHandshake,
  ClipboardList,
  Bath,
  Utensils,
  Brush,
  Car,
  Bell,
  AlertTriangle,
  Accessibility,
  ShoppingBag,
  ArrowRight,
  Heart,
  Star,
  Award,
  Home,
  Shield
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import Placeholder from "@/components/Placeholder";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import ServiceAreasSearch from "@/components/ServiceAreasSearch";
import KnowledgeHub from "@/components/KnowledgeHub";
import GoogleReviews from "@/components/GoogleReviews";

import { services, site } from "@/lib/site";

export const metadata = {
  title: `Home Care Services in Pennsylvania | ${site.name}`,
  description:
    "Trusted in-home senior care across South Central & Eastern PA. Serving 10 counties. Call today for a free consultation.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="services-luxury-section" aria-labelledby="services-overview-heading">
        {/* Ambient gradient backdrops */}
        <div className="services-luxury-bg-blob" aria-hidden="true" />
        <div className="services-luxury-bg-blob-2" aria-hidden="true" />

        <div className="container services-luxury-container">

          {/* Left Column (60% width) */}
          <div className="services-luxury-content">
            <div className="services-luxury-badge-wrapper">
              <span className="services-luxury-badge">OUR SERVICES</span>
            </div>

            <h2 id="services-overview-heading" className="services-luxury-title">
              How We Help You<br />Live Comfortably<br />At Home
            </h2>

            <p className="services-luxury-desc">
              We provide personalized non-medical home care plans tailored around your routines, preferences, and clinical needs. Our caregivers are dedicated to helping seniors, veterans, and individuals with disabilities remain independent at home.
            </p>

            <div className="services-luxury-grid">

              <div className="service-luxury-card">
                <div className="service-luxury-card__top">
                  <div className="service-luxury-card__icon-container">
                    <Bath size={22} className="service-luxury-card__icon" />
                  </div>
                  <h3 className="service-luxury-card__title">Personal Care</h3>
                </div>
                <p className="service-luxury-card__desc">
                  Compassionate assistance with daily bathing, dressing, grooming, and hygiene.
                </p>
                <div className="service-luxury-card__arrow-wrapper">
                  <ArrowRight size={16} className="service-luxury-card__arrow" />
                </div>
              </div>

              <div className="service-luxury-card">
                <div className="service-luxury-card__top">
                  <div className="service-luxury-card__icon-container">
                    <HeartHandshake size={22} className="service-luxury-card__icon" />
                  </div>
                  <h3 className="service-luxury-card__title">Companion Care</h3>
                </div>
                <p className="service-luxury-card__desc">
                  Friendly social interaction, cognitive games, light walks, and emotional support.
                </p>
                <div className="service-luxury-card__arrow-wrapper">
                  <ArrowRight size={16} className="service-luxury-card__arrow" />
                </div>
              </div>

              <div className="service-luxury-card">
                <div className="service-luxury-card__top">
                  <div className="service-luxury-card__icon-container">
                    <Utensils size={22} className="service-luxury-card__icon" />
                  </div>
                  <h3 className="service-luxury-card__title">Meal Prep &amp; Feeding</h3>
                </div>
                <p className="service-luxury-card__desc">
                  Healthy meal planning, nutritious cooking, clean-up, and feeding support.
                </p>
                <div className="service-luxury-card__arrow-wrapper">
                  <ArrowRight size={16} className="service-luxury-card__arrow" />
                </div>
              </div>

              <div className="service-luxury-card">
                <div className="service-luxury-card__top">
                  <div className="service-luxury-card__icon-container">
                    <Brush size={22} className="service-luxury-card__icon" />
                  </div>
                  <h3 className="service-luxury-card__title">Light Housekeeping</h3>
                </div>
                <p className="service-luxury-card__desc">
                  Maintaining a clean home with dusting, vacuuming, laundry, and organizing.
                </p>
                <div className="service-luxury-card__arrow-wrapper">
                  <ArrowRight size={16} className="service-luxury-card__arrow" />
                </div>
              </div>

              <div className="service-luxury-card">
                <div className="service-luxury-card__top">
                  <div className="service-luxury-card__icon-container">
                    <Car size={22} className="service-luxury-card__icon" />
                  </div>
                  <h3 className="service-luxury-card__title">Transportation</h3>
                </div>
                <p className="service-luxury-card__desc">
                  Safe escort to doctor visits, therapy sessions, and community events.
                </p>
                <div className="service-luxury-card__arrow-wrapper">
                  <ArrowRight size={16} className="service-luxury-card__arrow" />
                </div>
              </div>

              <div className="service-luxury-card">
                <div className="service-luxury-card__top">
                  <div className="service-luxury-card__icon-container">
                    <Bell size={22} className="service-luxury-card__icon" />
                  </div>
                  <h3 className="service-luxury-card__title">Daily Reminders</h3>
                </div>
                <p className="service-luxury-card__desc">
                  Consistent reminders for daily routines, medication timings, and hydration.
                </p>
                <div className="service-luxury-card__arrow-wrapper">
                  <ArrowRight size={16} className="service-luxury-card__arrow" />
                </div>
              </div>

              <div className="service-luxury-card">
                <div className="service-luxury-card__top">
                  <div className="service-luxury-card__icon-container">
                    <ShieldCheck size={22} className="service-luxury-card__icon" />
                  </div>
                  <h3 className="service-luxury-card__title">Fall Prevention</h3>
                </div>
                <p className="service-luxury-card__desc">
                  Identifying hazard zones, clearing walk pathways, and guiding transfers.
                </p>
                <div className="service-luxury-card__arrow-wrapper">
                  <ArrowRight size={16} className="service-luxury-card__arrow" />
                </div>
              </div>

              <div className="service-luxury-card">
                <div className="service-luxury-card__top">
                  <div className="service-luxury-card__icon-container">
                    <Accessibility size={22} className="service-luxury-card__icon" />
                  </div>
                  <h3 className="service-luxury-card__title">Transfers &amp; Mobility</h3>
                </div>
                <p className="service-luxury-card__desc">
                  Safe assistance with standing, walking, wheelchair transfers, and movement.
                </p>
                <div className="service-luxury-card__arrow-wrapper">
                  <ArrowRight size={16} className="service-luxury-card__arrow" />
                </div>
              </div>

              <div className="service-luxury-card">
                <div className="service-luxury-card__top">
                  <div className="service-luxury-card__icon-container">
                    <ShoppingBag size={22} className="service-luxury-card__icon" />
                  </div>
                  <h3 className="service-luxury-card__title">Grocery Shopping</h3>
                </div>
                <p className="service-luxury-card__desc">
                  Handling grocery runs, picking up prescription refills, and errands.
                </p>
                <div className="service-luxury-card__arrow-wrapper">
                  <ArrowRight size={16} className="service-luxury-card__arrow" />
                </div>
              </div>

            </div>

            {/* CTA buttons */}
            <div className="services-luxury-actions">
              <Link href="/services" className="btn-luxury-primary btn-luxury-cta" style={{ textDecoration: "none" }}>
                Explore All Services
                <svg className="btn-luxury-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 18, height: 18, marginLeft: 8 }}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
              <Link href="/contact-us" className="btn-luxury-secondary btn-luxury-cta-sec" style={{ textDecoration: "none" }}>
                Request Care
              </Link>
            </div>
          </div>

          {/* Right Column (40% width) */}
          <div className="services-luxury-media">
            {/* Ambient blur blob */}
            <div className="services-luxury-media__backdrop-blob" aria-hidden="true" />

            {/* Image card wrapper */}
            <div className="services-luxury-image-container">
              <Image
                src="https://plus.unsplash.com/premium_photo-1663134144095-a1cf58ce152f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvbWVjYXJlfGVufDB8MXwwfHx8MA%3D%3D"
                alt="Caregiver supporting senior client walking with walker"
                fill
                sizes="(max-width: 56rem) 100vw, 40vw"
                className="services-luxury-media__img"
                style={{ objectFit: "cover" }}
              />

              {/* Floating badge */}
              <div className="services-luxury-floating-badge">
                <span className="services-luxury-floating-badge__icon" aria-hidden="true">⭐</span>
                <span>Personalized Care</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="why-luxury-section" aria-labelledby="why-choose-heading">
        {/* Ambient blobs */}
        <div className="why-luxury-bg-blob" aria-hidden="true" />
        <div className="why-luxury-bg-blob-2" aria-hidden="true" />

        <div className="container">
          {/* Header */}
          <div className="why-luxury-header">
            <div className="why-luxury-badge-wrapper">
              <span className="why-luxury-badge">WHY CHOOSE US</span>
            </div>
            <h2 id="why-choose-heading" className="why-luxury-title">
              Why Families Trust<br />Blessed Hearts Homecare
            </h2>
            <p className="why-luxury-intro">
              Welcoming a caregiver into your private home is a deeply personal decision. We dedicate ourselves to raising the standard of senior care through rigorous screening, clinical oversight, and empathy.
            </p>
          </div>

          {/* Alternating Rows */}
          <div className="why-luxury-rows">
            
            {/* Block 1: Image Left, Content Right */}
            <div className="why-luxury-row why-luxury-row--image-left">
              <div className="why-luxury-media">
                <div className="why-luxury-media__backdrop-blob" aria-hidden="true" />
                <div className="why-luxury-image-container">
                  <Image
                    src="https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SG9tZWNhcmV8ZW58MHx8MHx8fDA%3D"
                    alt="Caregiver meeting senior client for a screening interview"
                    fill
                    sizes="(max-width: 56rem) 100vw, 45vw"
                    className="why-luxury-media__img"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className="why-luxury-content">
                <div className="why-luxury-icon-circle">
                  <ShieldCheck size={24} aria-hidden="true" />
                </div>
                <h3>Licensed &amp; Background Checked Caregivers</h3>
                <p>
                  Every caregiver undergoes a rigorous, multi-stage screening process. We run comprehensive criminal background checks, verify active credentials, conduct references audits, and test clinical competence. We only hire professionals we would trust in our own homes.
                </p>
                <ul className="why-luxury-highlights">
                  <li>
                    <span className="why-luxury-check" aria-hidden="true">✓</span>
                    <span>100% Screened Caregivers</span>
                  </li>
                  <li>
                    <span className="why-luxury-check" aria-hidden="true">✓</span>
                    <span>Fully Bonded &amp; Insured</span>
                  </li>
                </ul>
                <Link href="/about" className="why-luxury-link" aria-label="Learn more about our screening process">
                  Learn More
                  <ArrowRight size={14} className="why-luxury-link__arrow" />
                </Link>
              </div>
            </div>

            {/* Block 2: Content Left, Image Right */}
            <div className="why-luxury-row why-luxury-row--image-right">
              <div className="why-luxury-media">
                <div className="why-luxury-media__backdrop-blob" aria-hidden="true" />
                <div className="why-luxury-image-container">
                  <Image
                    src="https://images.unsplash.com/photo-1765896387387-0538bc9f997e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8SG9tZWNhcmV8ZW58MHx8MHx8fDA%3D"
                    alt="Caregiver preparing a custom healthy meal in client's kitchen"
                    fill
                    sizes="(max-width: 56rem) 100vw, 45vw"
                    className="why-luxury-media__img"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className="why-luxury-content">
                <div className="why-luxury-icon-circle">
                  <ClipboardList size={24} aria-hidden="true" />
                </div>
                <h3>Personalized Care Plans</h3>
                <p>
                  We believe that care plans should adapt to your routine, not the other way around. Our customized home care solutions are built around your loved one’s unique schedule, sleeping patterns, dietary needs, and medical preferences to support complete daily autonomy.
                </p>
                <ul className="why-luxury-highlights">
                  <li>
                    <span className="why-luxury-check" aria-hidden="true">✓</span>
                    <span>Custom Care Routines</span>
                  </li>
                  <li>
                    <span className="why-luxury-check" aria-hidden="true">✓</span>
                    <span>Regular Plan Assessments</span>
                  </li>
                </ul>
                <Link href="/services" className="why-luxury-link" aria-label="Learn more about personalized care plans">
                  Learn More
                  <ArrowRight size={14} className="why-luxury-link__arrow" />
                </Link>
              </div>
            </div>

            {/* Block 3: Image Left, Content Right */}
            <div className="why-luxury-row why-luxury-row--image-left">
              <div className="why-luxury-media">
                <div className="why-luxury-media__backdrop-blob" aria-hidden="true" />
                <div className="why-luxury-image-container">
                  <Image
                    src="https://plus.unsplash.com/premium_photo-1664475811964-75af7d90ee4b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SG9tZWNhcmV8ZW58MHx8MHx8fDA%3D"
                    alt="Smiling caregiver sitting and chatting warmly with a senior client"
                    fill
                    sizes="(max-width: 56rem) 100vw, 45vw"
                    className="why-luxury-media__img"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className="why-luxury-content">
                <div className="why-luxury-icon-circle">
                  <HeartHandshake size={24} aria-hidden="true" />
                </div>
                <h3>Care Delivered With Compassion</h3>
                <p>
                  Dignity and empathy are more than values—they are the core of our daily practice. Our caregivers are chosen for their warm hearts, offering dedicated companionship, emotional support, and respectful assistance that treats your loved one like family.
                </p>
                <ul className="why-luxury-highlights">
                  <li>
                    <span className="why-luxury-check" aria-hidden="true">✓</span>
                    <span>Sincere Empathy Matching</span>
                  </li>
                  <li>
                    <span className="why-luxury-check" aria-hidden="true">✓</span>
                    <span>Relationship-First Spirit</span>
                  </li>
                </ul>
                <Link href="/about" className="why-luxury-link" aria-label="Learn more about our companion care philosophy">
                  Learn More
                  <ArrowRight size={14} className="why-luxury-link__arrow" />
                </Link>
              </div>
            </div>

            {/* Block 4: Content Left, Image Right */}
            <div className="why-luxury-row why-luxury-row--image-right">
              <div className="why-luxury-media">
                <div className="why-luxury-media__backdrop-blob" aria-hidden="true" />
                <div className="why-luxury-image-container">
                  <Image
                    src="/images/image.jpg"
                    alt="Caregiver supporting senior client walking with walker"
                    fill
                    sizes="(max-width: 56rem) 100vw, 45vw"
                    className="why-luxury-media__img"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className="why-luxury-content">
                <div className="why-luxury-icon-circle">
                  <Home size={24} aria-hidden="true" />
                </div>
                <h3>Serving Families Across York County</h3>
                <p>
                  As a locally owned Pennsylvania home care provider, we are deeply committed to supporting our community. Our local presence ensures prompt communication, 24/7 coordinator availability, and rapid caregiver response times when your family needs us most.
                </p>
                <ul className="why-luxury-highlights">
                  <li>
                    <span className="why-luxury-check" aria-hidden="true">✓</span>
                    <span>York &amp; Surrounding Counties</span>
                  </li>
                  <li>
                    <span className="why-luxury-check" aria-hidden="true">✓</span>
                    <span>24/7 Coordinator Support</span>
                  </li>
                </ul>
                <Link href="/areas-we-serve" className="why-luxury-link" aria-label="Learn more about the counties we serve">
                  Learn More
                  <ArrowRight size={14} className="why-luxury-link__arrow" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="about-luxury-section" aria-labelledby="about-story-heading">
        {/* Decorative elements */}
        <div className="about-luxury-bg-blob" aria-hidden="true" />
        <div className="about-luxury-bg-blob-2" aria-hidden="true" />

        <div className="container about-luxury-container">

          {/* Left Column (45% width) */}
          <div className="about-luxury-media">
            {/* Background Organic Gradients & Shapes */}
            <div className="about-luxury-media__backdrop-blob" aria-hidden="true" />
            <div className="about-luxury-floating-dot about-luxury-floating-dot--1" aria-hidden="true" />
            <div className="about-luxury-floating-dot about-luxury-floating-dot--2" aria-hidden="true" />

            <div className="about-luxury-image-container">
              <Image
                src="/images/image2.jpg"
                alt="Friendly professional caregiver supporting senior client walking with walker"
                fill
                sizes="(max-width: 56rem) 100vw, 45vw"
                className="about-luxury-media__img"
                style={{ objectFit: "cover" }}
              />

            </div>
          </div>

          {/* Right Column (55% width) */}
          <div className="about-luxury-content">
            <div className="about-luxury-badge-wrapper">
              <span className="about-luxury-badge">ABOUT BLESSED HEARTS</span>
            </div>

            <h2 id="about-story-heading" className="about-luxury-title">
              Compassionate Care,<br />Delivered With Heart.
            </h2>

            <div className="about-editorial-story">
              <p className="about-editorial-lead">
                Blessed Hearts Homecare was established to bridge a vital need: providing professional, high-quality care that never compromises on warmth, dignity, or human connection.
              </p>

              <p>
                We believe that home is more than just a place; it is a repository of memories, a source of comfort, and the foundation of independence. Our mission is to support seniors, veterans, and individuals with disabilities across York and surrounding PA counties, allowing them to lead fulfilling lives in the comfort of their familiar surroundings.
              </p>

              <p>
                Every Blessed Hearts caregiver is selected not just for their professional experience, but for their genuine empathy. We pair clients with caregivers who understand the unique rhythm of their daily life, providing a reliable partnership that honors individual routines, preferences, and personal independence.
              </p>

              <p className="about-editorial-signature">
                Dedicated to serving our community with reliable availability and families first.
              </p>
            </div>
          </div>

        </div>
      </section>

      <ServiceAreasSearch />

      <KnowledgeHub />

      <section className="section" aria-label="Google Reviews">
        <div className="container">
          <GoogleReviews />
        </div>
      </section>

      <CTASection />
    </>
  );
}
