"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Heart, 
  ShieldCheck, 
  Award, 
  Users, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Phone, 
  ArrowRight, 
  Star, 
  UserCheck, 
  ShieldAlert, 
  GraduationCap, 
  Sparkles,
  Printer,
  Mail
} from "lucide-react";
import { site } from "@/lib/site";
import Testimonials from "@/components/Testimonials";
import InstagramWidget from "@/components/InstagramWidget";
import GoogleReviews from "@/components/GoogleReviews";


// Count Up component for stats
function Counter({ value, duration = 2 }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = parseInt(value);
      if (start === end) return;

      let totalMiliseconds = duration * 1000;
      let incrementTime = Math.abs(Math.floor(totalMiliseconds / end));
      
      let timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [inView, value, duration]);

  const suffix = value.includes("+") ? "+" : value.includes("%") ? "%" : "";

  return (
    <span ref={ref} className="about-stat-number">
      {count}{suffix}
    </span>
  );
}

export default function AboutClient() {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="about-luxury-page">
      {/* Decorative ambient blobs */}
      <div className="about-luxury-bg-blob-1" aria-hidden="true" />
      <div className="about-luxury-bg-blob-2" aria-hidden="true" />

      {/* ====================================================
         SECTION 1: PREMIUM HERO
         ==================================================== */}
      <section className="about-hero-section" aria-labelledby="hero-heading">
        <div className="container">
          <div className="about-hero-grid">
            {/* Left Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="about-hero-content"
            >
              <div className="about-badge-wrapper">
                <span className="about-badge">
                  <Sparkles size={12} className="mr-1 animate-pulse" />
                  OUR MISSION - COMPASSION AT HOME
                </span>
              </div>
              <h1 id="hero-heading" className="about-hero-title">
                Caring with Empathy,<br />
                <span className="text-gradient">Supporting Independence.</span>
              </h1>
              <p className="about-hero-desc">
                Blessed Hearts Homecare is dedicated to providing high-quality, clinical coordinator-supervised caregiver options across York and surrounding PA counties.
              </p>
              <div className="about-hero-actions">
                <Link href="/contact-us#contact-form" className="btn btn--gradient">
                  Request Care
                </Link>
                <a href="tel:+12232609042" className="btn btn--outline" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <Phone size={16} />
                  Call us
                </a>
              </div>
            </motion.div>

            {/* Right Media Wrapper */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="about-hero-media"
            >
              {/* Premium decorative shapes behind the image */}
              <div className="about-hero-decorative-shape" aria-hidden="true" />
              <div className="about-hero-dot-grid" aria-hidden="true" />

              <div className="about-hero-image-wrapper">
                <Image
                  src="https://plus.unsplash.com/premium_photo-1681996583708-b7fca2e8ed2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZWNhcmV8ZW58MHwxfDB8fHww"
                  alt="Blessed Hearts Homecare professional caregiver supporting an elderly senior client"
                  fill
                  sizes="(max-width: 68rem) 100vw, 550px"
                  className="about-hero-img"
                  priority
                />
              </div>

              {/* Floating badges with premium icons */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="about-floating-badge about-floating-badge--left"
              >
                <div className="about-floating-badge-icon about-floating-badge-icon--heart">
                  <Heart size={14} fill="#ff2d7a" aria-hidden="true" />
                </div>
                <div>
                  <div className="about-floating-badge-title">Family Trusted</div>
                  <div className="about-floating-badge-sub">South Central PA</div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="about-floating-badge about-floating-badge--right"
              >
                <div className="about-floating-badge-icon about-floating-badge-icon--award">
                  <Award size={14} fill="#ff7a1a" aria-hidden="true" />
                </div>
                <div>
                  <div className="about-floating-badge-title">15+ Years</div>
                  <div className="about-floating-badge-sub">Experienced Directors</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====================================================
         SECTION 2: OUR STORY (EDITORIAL LAYOUT)
         ==================================================== */}
      <section className="about-story-section" aria-labelledby="story-heading">
        <div className="container">
          <div className="about-story-grid">
            
            {/* Story Image Left */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="about-story-media"
            >
              <div className="about-story-image-container">
                <Image
                  src="https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SG9tZWNhcmV8ZW58MHx8MHx8fDA%3D"
                  alt="Blessed Hearts clinical directors planning customized home care schedule"
                  fill
                  sizes="(max-width: 68rem) 100vw, 500px"
                  className="about-story-img"
                />
              </div>
            </motion.div>

            {/* Story Text Right with Timeline */}
            <div className="about-story-content">
              <span className="eyebrow-luxury-accent">OUR HISTORY</span>
              <h2 id="story-heading" className="section-title-luxury" style={{ textAlign: "left" }}>
                How Blessed Hearts Started
              </h2>
              <div className="about-story-body">
                <p>
                  Blessed Hearts Homecare was established to raise the bar for local home care in South Central PA. We saw a critical need: providing professional, high-quality caregiver assistance that never compromises on human empathy and connection.
                </p>
                <p>
                  We believe that home is the foundation of independence. Our mission is to support seniors, veterans, and individuals with disabilities across York and surrounding PA counties, allowing them to lead fulfilling lives in the comfort of their own homes.
                </p>
              </div>

              {/* Story timeline */}
              <div className="about-story-timeline">
                <div className="about-timeline-item">
                  <div className="about-timeline-dot" />
                  <div className="about-timeline-content">
                    <h5>The Genesis</h5>
                    <p>Established with a simple guiding principle: care delivered from the heart, directed by experienced local care managers.</p>
                  </div>
                </div>
                <div className="about-timeline-item">
                  <div className="about-timeline-dot" />
                  <div className="about-timeline-content">
                    <h5>PA State Licensure</h5>
                    <p>Accredited and licensed by the Pennsylvania Department of Health to support Medicaid Waiver programs and private client families.</p>
                  </div>
                </div>
                <div className="about-timeline-item">
                  <div className="about-timeline-dot" />
                  <div className="about-timeline-content">
                    <h5>Community Leadership</h5>
                    <p>Serving hundreds of families across York, Lancaster, Dauphin, Cumberland, and Adams counties with 24/7 dedicated local coordinators.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================
         SECTION 3: OUR VALUES (5 VALUE CARDS)
         ==================================================== */}
      <section className="about-values-section" aria-labelledby="values-heading">
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <Sparkles size={14} /> OUR GUIDING PRINCIPLES <Sparkles size={14} />
            </span>
            <h2 id="values-heading" className="section-title-luxury">
              Our Pillars of Care
            </h2>
            <div className="luxury-title-divider" />
            <p className="section-subtitle-luxury">
              These five core values serve as our daily standard, guiding every client interaction and home visit we coordinate.
            </p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="about-values-grid"
          >
            {/* Card 1: Compassion */}
            <motion.div variants={fadeInUp} className="about-value-card card-compassion">
              <div className="about-value-number">01</div>
              <div className="about-value-icon-wrapper">
                <Heart size={24} className="about-value-icon" />
              </div>
              <h3>Compassion</h3>
              <p>Approaching every client with patience, warmth, and active empathy, matching caregiver personalities to encourage natural friendships.</p>
              <div className="about-value-accent-line" />
              <div className="about-value-card-glow" />
            </motion.div>

            {/* Card 2: Integrity */}
            <motion.div variants={fadeInUp} className="about-value-card card-integrity">
              <div className="about-value-number">02</div>
              <div className="about-value-icon-wrapper">
                <ShieldCheck size={24} className="about-value-icon" />
              </div>
              <h3>Integrity</h3>
              <p>Adhering to strict professional standards, transparent billing practices, and open communications with client families.</p>
              <div className="about-value-accent-line" />
              <div className="about-value-card-glow" />
            </motion.div>

            {/* Card 3: Respect */}
            <motion.div variants={fadeInUp} className="about-value-card card-respect">
              <div className="about-value-number">03</div>
              <div className="about-value-icon-wrapper">
                <Users size={24} className="about-value-icon" />
              </div>
              <h3>Respect</h3>
              <p>Honoring client decisions, cultural background, and daily habits, preserving personal choice in all care coordinate decisions.</p>
              <div className="about-value-accent-line" />
              <div className="about-value-card-glow" />
            </motion.div>

            {/* Card 4: Dignity */}
            <motion.div variants={fadeInUp} className="about-value-card card-dignity">
              <div className="about-value-number">04</div>
              <div className="about-value-icon-wrapper">
                <Award size={24} className="about-value-icon" />
              </div>
              <h3>Dignity</h3>
              <p>Supporting seniors with daily personal care with absolute privacy, helping them maintain control and independence at home.</p>
              <div className="about-value-accent-line" />
              <div className="about-value-card-glow" />
            </motion.div>

            {/* Card 5: Reliability */}
            <motion.div variants={fadeInUp} className="about-value-card card-reliability">
              <div className="about-value-number">05</div>
              <div className="about-value-icon-wrapper">
                <Clock size={24} className="about-value-icon" />
              </div>
              <h3>Reliability</h3>
              <p>Providing 100% background-checked standby caregivers, clock-in tracking metrics, and 24/7 coordinator support.</p>
              <div className="about-value-accent-line" />
              <div className="about-value-card-glow" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ====================================================
         SECTION 4: WHY FAMILIES TRUST US (ALTERNATING ROWS)
         ==================================================== */}
      <section className="about-trust-section" aria-labelledby="trust-heading">
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">WHY CHOOSE US</span>
            <h2 id="trust-heading" className="section-title-luxury">
              A Higher Standard of Home Care
            </h2>
            <p className="section-subtitle-luxury">
              We understand that choosing an in-home care agency is a deeply personal choice. Here is how we support your peace of mind.
            </p>
          </div>

          <div className="about-trust-rows">
            
            {/* Row 1: Licensed Caregivers (Image Left) */}
            <div className="about-trust-row">
              <div className="about-trust-media">
                <div className="about-trust-image-wrapper">
                  <Image
                    src="/images/image.webp"
                    alt="A caregiver assisting a senior client safely using a walker"
                    fill
                    sizes="(max-width: 68rem) 100vw, 550px"
                    className="about-trust-img"
                  />
                </div>
              </div>
              <div className="about-trust-content">
                <h3>Fully Licensed & Insured Caregivers</h3>
                <p>
                  Blessed Hearts Homecare is licensed by the Pennsylvania Department of Health. This ensures we adhere strictly to PA state background checks, safety regulations, and care standards.
                </p>
                <ul className="about-trust-checklist">
                  <li>Licensed by the PA Department of Health</li>
                  <li>100% Comprehensive General Liability Insured</li>
                  <li>Standby caregiver backup system</li>
                </ul>
                <Link href="/services" className="about-trust-cta">
                  Learn about our care
                  <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Row 2: Personalized Care (Image Right) */}
            <div className="about-trust-row about-trust-row--alt">
              <div className="about-trust-media">
                <div className="about-trust-image-wrapper">
                  <Image
                    src="https://images.unsplash.com/photo-1765896387387-0538bc9f997e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8SG9tZWNhcmV8ZW58MHx8MHx8fDA%3D"
                    alt="Caregiver preparing meals in client kitchen with senior"
                    fill
                    sizes="(max-width: 68rem) 100vw, 550px"
                    className="about-trust-img"
                  />
                </div>
              </div>
              <div className="about-trust-content">
                <h3>Customized Care Schedules</h3>
                <p>
                  No two clients are identical. We match care plans directly to daily habits, dietary routines, medical appointments, and preferred waking hours.
                </p>
                <ul className="about-trust-checklist">
                  <li>Custom care coordinator evaluations</li>
                  <li>Matched caregiver personality criteria</li>
                  <li>Flexible schedules (Hourly to 24/7 standby)</li>
                </ul>
                <Link href="/services" className="about-trust-cta">
                  View specialized programs
                  <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Row 3: Family Communication (Image Left) */}
            <div className="about-trust-row">
              <div className="about-trust-media">
                <div className="about-trust-image-wrapper">
                  <Image
                    src="https://plus.unsplash.com/premium_photo-1664475811964-75af7d90ee4b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SG9tZWNhcmV8ZW58MHx8MHx8fDA%3D"
                    alt="A friendly caregiver interacting warmly with an older woman"
                    fill
                    sizes="(max-width: 68rem) 100vw, 550px"
                    className="about-trust-img"
                  />
                </div>
              </div>
              <div className="about-trust-content">
                <h3>Transparent Family Updates</h3>
                <p>
                  We keep family members fully informed. Receive real-time client daily activity reviews, coordinator check-in notes, and quick schedule notifications.
                </p>
                <ul className="about-trust-checklist">
                  <li>Daily activity logs & safety reports</li>
                  <li>Dedicated family portal communication</li>
                  <li>Direct coordination with family physicians</li>
                </ul>
                <Link href="/contact-us" className="about-trust-cta">
                  Request consultation
                  <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Row 4: Local PA Expertise (Image Right) */}
            <div className="about-trust-row about-trust-row--alt">
              <div className="about-trust-media">
                <div className="about-trust-image-wrapper">
                  <Image
                    src="https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SG9tZWNhcmV8ZW58MHx8MHx8fDA%3D"
                    alt="Local York PA care coordination meeting"
                    fill
                    sizes="(max-width: 68rem) 100vw, 550px"
                    className="about-trust-img"
                  />
                </div>
              </div>
              <div className="about-trust-content">
                <h3>South Central PA Local Support</h3>
                <p>
                  Rooted on South Queen Street in York, PA, we have deep relationships with local PA case managers, health clinics, and veteran coordination programs.
                </p>
                <ul className="about-trust-checklist">
                  <li>Medicaid Waiver program enrollment guide</li>
                  <li>VA Aid & Attendance pension expertise</li>
                  <li>Serving York, Lancaster, Cumberland, and Adams counties</li>
                </ul>
                <Link href="/areas-we-serve" className="about-trust-cta">
                  See service areas
                  <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================
         SECTION 5: OUR CAREGIVER STANDARDS (INFOGRAPHIC STYLE)
         ==================================================== */}
      <section className="about-standards-section" aria-labelledby="standards-heading">
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent" style={{ color: "#ffa04d", WebkitTextFillColor: "#ffa04d", background: "none", WebkitBackgroundClip: "initial", backgroundClip: "initial" }}>SAFETY PROTOCOLS</span>
            <h2 id="standards-heading" className="section-title-luxury text-white">
              Our Caregiver Standards
            </h2>
            <p className="section-subtitle-luxury" style={{ color: "rgba(255,255,255,0.7)" }}>
              Every Blessed Hearts caregiver is selected not just for experience, but for their background and safety qualifications.
            </p>
          </div>

          <div className="about-standards-grid">
            {/* Standard 1: Background checks */}
            <div className="about-standard-card">
              <div className="about-standard-num">01</div>
              <div className="about-standard-icon-wrapper">
                <UserCheck size={20} className="about-standard-icon" />
              </div>
              <h4>Screened & Cleared</h4>
              <p>100% clean record confirmation across state-mandated criminal check registries and child abuse listings before client assignment.</p>
            </div>

            {/* Standard 2: Licensed */}
            <div className="about-standard-card">
              <div className="about-standard-num">02</div>
              <div className="about-standard-icon-wrapper">
                <ShieldCheck size={20} className="about-standard-icon" />
              </div>
              <h4>DOH Compliant</h4>
              <p>Full adherence to the Pennsylvania Department of Health licensing guidelines, verified credentials, and active references.</p>
            </div>

            {/* Standard 3: Training */}
            <div className="about-standard-card">
              <div className="about-standard-num">03</div>
              <div className="about-standard-icon-wrapper">
                <GraduationCap size={20} className="about-standard-icon" />
              </div>
              <h4>Professional Training</h4>
              <p>Trained in safe transfer procedures, dementia behavior redirection, nutrition preparation, and physical activity support.</p>
            </div>

            {/* Standard 4: Ongoing checks */}
            <div className="about-standard-card">
              <div className="about-standard-num">04</div>
              <div className="about-standard-icon-wrapper">
                <Clock size={20} className="about-standard-icon" />
              </div>
              <h4>Clinical Coordinator Audits</h4>
              <p>Regular in-home checks by our clinical care manager to audit routines, safety conditions, and caregiver performances.</p>
            </div>

            {/* Standard 5: 24/7 Support */}
            <div className="about-standard-card">
              <div className="about-standard-num">05</div>
              <div className="about-standard-icon-wrapper">
                <Phone size={20} className="about-standard-icon" />
              </div>
              <h4>24/7 On-Call Coordinator</h4>
              <p>Standby caregiver coordinate support is available around the clock to handle immediate scheduling adjustments or updates.</p>
            </div>

            {/* Standard 6: Emergency Protocols */}
            <div className="about-standard-card">
              <div className="about-standard-num">06</div>
              <div className="about-standard-icon-wrapper">
                <ShieldAlert size={20} className="about-standard-icon" />
              </div>
              <h4>Emergency Action Trained</h4>
              <p>First aid safety directives, emergency contact reporting, medication alarms, and local clinical escalation systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
         SECTION 6: SERVING YORK & LOCAL COUNTIES
         ==================================================== */}
      <section className="about-local-section" aria-labelledby="local-heading-new">
        <div className="container">
          <div className="about-local-grid">
            <div className="about-local-content">
              <span className="eyebrow-luxury-accent">OUR COVERAGE</span>
              <h2 id="local-heading-new" className="section-title-luxury" style={{ textAlign: "left" }}>
                Proudly Serving York & Surrounding PA Counties
              </h2>
              <p>
                From our offices on South Queen Street in York, PA, we coordinate support services across a broad South Central Pennsylvania footprint.
              </p>
              
              <div className="about-local-counties">
                <div className="about-county-pill"> York County </div>
                <div className="about-county-pill"> Adams County </div>
                <div className="about-county-pill"> Lancaster County </div>
                <div className="about-county-pill"> Dauphin County </div>
                <div className="about-county-pill"> Cumberland County </div>
              </div>

              <p className="about-local-footer-text">
                Need care outside these counties? Contact us. We frequently coordinate schedules with surrounding PA health systems to accommodate client requests.
              </p>

              <div style={{ marginTop: "2rem" }}>
                <Link href="/contact-us" className="btn btn--gradient">
                  Check Your Service Coverage
                </Link>
              </div>
            </div>

            {/* Local Image */}
            <div className="about-local-media">
              <div className="about-local-image-wrapper">
                <Image
                  src="/images/service-area-map.webp"
                  alt="Pennsylvania map highlighting York and serving Adams, Lancaster, Dauphin, Cumberland counties"
                  fill
                  sizes="(max-width: 68rem) 100vw, 550px"
                  className="about-local-img"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
         SECTION 8: STATISTICS (COUNT UP ANIMATIONS)
         ==================================================== */}
      <section className="about-stats-section" aria-label="Key Agency Statistics">
        <div className="container">
          <div className="about-stats-grid">
            {/* Stat 1 */}
            <div className="about-stat-card">
              <Counter value="500+" />
              <div className="about-stat-label">Families Served</div>
              <p>Providing peace of mind across South Central PA homes.</p>
            </div>

            {/* Stat 2 */}
            <div className="about-stat-card">
              <Counter value="98%" />
              <div className="about-stat-label">Client Satisfaction</div>
              <p>Highly rated for clinical reliability and compassion.</p>
            </div>

            {/* Stat 3 */}
            <div className="about-stat-card">
              <Counter value="15+" />
              <div className="about-stat-label">Years Agency Experience</div>
              <p>Managed by seasoned local healthcare directors.</p>
            </div>

            {/* Stat 4 */}
            <div className="about-stat-card">
              <Counter value="24/7" />
              <div className="about-stat-label">Coordinator Standby Support</div>
              <p>On-call coordinators ready for immediate scheduling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
         SECTION 9: TESTIMONIALS (REUSED COMPONENT)
         ==================================================== */}
      <Testimonials />

      {/* ====================================================
         SECTION 10: GOOGLE REVIEWS (CUSTOM CLONE)
         ==================================================== */}
      <section className="section" aria-label="Google Reviews">
        <div className="container">
          <GoogleReviews />
        </div>
      </section>

      {/* ====================================================
         SECTION 11: INSTAGRAM FEED (REUSED COMPONENT)
         ==================================================== */}
      <InstagramWidget />

    </div>
  );
}
