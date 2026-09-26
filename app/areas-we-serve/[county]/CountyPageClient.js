"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  UserCheck, 
  FileHeart, 
  Phone, 
  Mail,
  ChevronRight,
  Plus,
  Minus,
  Star,
  Users,
  Compass,
  Heart,
  Calendar,
  Home,
  Check
} from "lucide-react";
import { site } from "@/lib/site";
import GoogleReviews from "@/components/GoogleReviews";
import "../areas.css";

const servicesList = [
  {
    icon: UserCheck,
    title: "Personal Care",
    desc: "Dignified assistance with bathing, dressing, grooming, toileting, and mobility support."
  },
  {
    icon: Heart,
    title: "Companion Care",
    desc: "Meaningful conversation, social activities, and daily companionship to reduce isolation."
  },
  {
    icon: Clock,
    title: "Respite Care",
    desc: "Short-term relief for family caregivers, ensuring your loved one is in safe hands."
  },
  {
    icon: Home,
    title: "Meal Preparation",
    desc: "Nutritious meal planning, grocery shopping, and custom cooking aligned with dietary needs."
  },
  {
    icon: MapPin,
    title: "Transportation",
    desc: "Safe transportation to medical appointments, community outings, and errands."
  },
  {
    icon: ShieldCheck,
    title: "Light Housekeeping",
    desc: "Tidying, laundry, dishwashing, and sorting to maintain a clean, organized home environment."
  },
  {
    icon: Calendar,
    title: "Medication Reminders",
    desc: "Prompt reminders to ensure prescription medication routines are followed correctly."
  },
  {
    icon: Compass,
    title: "Dementia Care",
    desc: "Specialized memory support, routines, and safe engagement for seniors with Alzheimer's."
  },
  {
    icon: FileHeart,
    title: "Veteran Care",
    desc: "Supporting veterans and surviving spouses with tailored home care and benefit coordination."
  }
];

const chooseUsReasons = [
  {
    title: "Licensed Agency",
    desc: "Fully licensed by the PA Department of Health for non-medical home care."
  },
  {
    title: "Background Checked",
    desc: "Strict screening, fingerprinting, and reference audits for every caregiver."
  },
  {
    title: "Personalized Care Plans",
    desc: "Custom care hours and support mapped precisely to individual daily goals."
  },
  {
    title: "Compassionate Care",
    desc: "Caregivers matched carefully based on clinical needs, routines, and personalities."
  },
  {
    title: "Experienced Caregivers",
    desc: "Ongoing training and credentials verification for our care professionals."
  },
  {
    title: "24/7 Support",
    desc: "Local PA care coordinators on-call around the clock for client family emergencies."
  }
];

const timelineSteps = [
  {
    num: "1",
    title: "Contact Us",
    desc: "Submit a request online or call our team to discuss your care goals."
  },
  {
    num: "2",
    title: "Free Consultation",
    desc: "A local coordinator conducts a complimentary in-home assessment."
  },
  {
    num: "3",
    title: "Personalized Care Plan",
    desc: "We draft a customized plan covering authorized hours and matching care needs."
  },
  {
    num: "4",
    title: "Care Begins",
    desc: "We introduce your matched caregiver and launch transparent scheduled care visits."
  }
];

export default function CountyPageClient({ data, city }) {
  const cityName = city ? city.charAt(0).toUpperCase() + city.slice(1) : "";
  const displayLocation = city ? `${cityName}, PA` : data.name;
  const heroTitle = city ? `Home Care in ${cityName}, PA` : data.heroTitle;
  const heroSubtitle = city ? `Reliable in-home care for seniors in ${cityName}, PA and surrounding ${data.name}. Companion, personal & 24 hour care. Call for a free in-home assessment.` : data.heroSubtitle;

  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", phone: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleValidation = () => {
    let tempErrors = {};
    if (!formData.firstName.trim()) tempErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) tempErrors.lastName = "Last name is required.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required.";
    } else if (cleanPhone.length < 10) {
      tempErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidation()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const formPayload = new FormData();
      formPayload.append("access_key", "ae29ff25-607e-4eb5-a6df-e30885a1b4a5");
      formPayload.append("subject", `New Consultation Request from ${formData.firstName} ${formData.lastName} (${data?.name || "County"})`);
      formPayload.append("from_name", "Blessed Hearts Website Lead");
      formPayload.append("name", `${formData.firstName} ${formData.lastName}`);
      formPayload.append("email", formData.email);
      formPayload.append("phone", formData.phone);
      formPayload.append("county", data?.name || "");
      formPayload.append("message", formData.message || "N/A");
      formPayload.append("source", `County Page Consultation - ${displayLocation || data?.name || "County"}`);

      const web3Res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });

      const web3Data = await web3Res.json();
      if (!web3Data.success) {
        throw new Error(web3Data.message || "Failed to submit request. Please try again.");
      }

      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          county: data?.name || "",
          source: `County Page Consultation - ${displayLocation || data?.name || "County"}`,
        }),
      }).catch((e) => console.warn("Firestore save error:", e));

      setFormSubmitted(true);
      setFormData({ firstName: "", lastName: "", phone: "", email: "", message: "" });
      setErrors({});
    } catch (err) {
      setSubmitError(err.message || "An error occurred. Please call us at (223) 260-9042.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="areas-page-container">
      {/* Organic Backdrop Blobs */}
      <div className="areas-bg-blob areas-bg-blob--1" aria-hidden="true" />
      <div className="areas-bg-blob areas-bg-blob--2" aria-hidden="true" />
      <div className="areas-bg-blob areas-bg-blob--3" aria-hidden="true" />

      {/* SECTION 1: Hero */}
      <section className="areas-hero-section" aria-label={`Home Care Coverage in ${data.name}`}>
        <div className="container">
          <div className="areas-hero-grid">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="areas-hero-content"
            >
              <div className="areas-hero-badge">
                <Compass size={12} /> Serving {displayLocation}
              </div>
              <h1 className="areas-hero-title">
                {heroTitle}
              </h1>
              <p className="areas-hero-desc">
                {heroSubtitle}
              </p>
              <div className="areas-hero-actions">
                <button 
                  onClick={() => handleScrollToSection("local-consultation")}
                  className="btn-luxury-lg btn-luxury-lg--primary"
                >
                  Request Care <ArrowRight size={16} />
                </button>
                <a 
                  href={site.phoneHref}
                  className="btn-luxury-lg btn-luxury-lg--secondary"
                >
                  Call Now
                </a>
              </div>
              <div className="areas-hero-trust">
                <div className="areas-hero-trust-item">
                  <ShieldCheck size={18} />
                  <span>Licensed Agency</span>
                </div>
                <div className="areas-hero-trust-item">
                  <Users size={18} />
                  <span>Screened Caregivers</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="areas-hero-media"
            >
              <div className="areas-hero-image-wrapper">
                <Image
                  src={data.heroImage || "https://images.unsplash.com/photo-1773227055624-07b515ba87c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGhvbWVjYXJlfGVufDB8fDB8fHww"}
                  alt={`Licensed caregiver providing professional support in ${data.name}`}
                  fill
                  priority
                  className="areas-hero-img"
                  sizes="(max-width: 64rem) 100vw, 45vw"
                />
              </div>

              {/* Floating Trust Badge */}
              <div className="floating-county-badge animate-float">
                <div className="floating-county-badge__avatar" aria-hidden="true">BH</div>
                <div>
                  <h4>Blessed Hearts</h4>
                  <p>Trusted Care in {displayLocation}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: About Home Care In County */}
      <section className="section" style={{ backgroundColor: "var(--white)" }}>
        <div className="container">
          <div className="about-county-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
            <div className="about-county-media">
              <div style={{ position: "relative", width: "100%", height: "400px", borderRadius: "32px", overflow: "hidden", boxShadow: "0 20px 45px rgba(0,0,0,0.05)" }}>
                <Image
                  src={data.aboutImage}
                  alt={`Care coordinator matching and guiding home care options in ${data.name}`}
                  fill
                  className="about-img"
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 64rem) 100vw, 45vw"
                />
              </div>
            </div>
            <div className="about-county-content">
              <span className="eyebrow-luxury-accent">ABOUT OUR AGENCY</span>
              <h2 className="section-title-luxury" style={{ textAlign: "left" }}>{data.aboutTitle}</h2>
              <p style={{ lineHeight: "1.7", color: "#555", marginBottom: "1.5rem" }}>
                {data.aboutText}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", color: "var(--plum)" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--pink)" }} /> Personalized Care
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", color: "var(--plum)" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--pink)" }} /> Companion Care
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", color: "var(--plum)" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--pink)" }} /> Respite Support
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", color: "var(--plum)" }}>
                  <CheckCircle2 size={16} style={{ color: "var(--pink)" }} /> Vet Coordination
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Services Available In County */}
      <section className="section" style={{ backgroundColor: "var(--gray-light)" }}>
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">OUR SERVICES</span>
            <h2 className="section-title-luxury">Services Available in {data.name}</h2>
            <p className="section-subtitle-luxury">
              We offer comprehensive non-medical home care options designed to support independence, comfort, and safety.
            </p>
            <div className="luxury-title-divider" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px", marginTop: "3rem" }}>
            {servicesList.map((svc, idx) => {
              const Icon = svc.icon;
              return (
                <div 
                  key={idx} 
                  className="why-local-card"
                  style={{ 
                    borderRadius: "32px", 
                    padding: "40px", 
                    backgroundColor: "var(--white)", 
                    boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    textAlign: "left"
                  }}
                >
                  <div style={{ backgroundColor: "var(--gradient-soft)", padding: "12px", borderRadius: "16px", color: "var(--pink)", marginBottom: "20px" }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: "750", color: "var(--plum)", marginBottom: "12px" }}>{svc.title}</h3>
                  <p style={{ color: "#666", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "20px", flexGrow: 1 }}>{svc.desc}</p>
                  <Link 
                    href="/services" 
                    className="btn-directory-cta btn-directory-cta--primary"
                    style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem", textDecoration: "none", alignSelf: "flex-start" }}
                  >
                    Learn More
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: Why Families Choose Blessed Hearts */}
      <section className="section" style={{ backgroundColor: "var(--white)" }}>
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">TRUST FACTORS</span>
            <h2 className="section-title-luxury">Why Families Choose Blessed Hearts</h2>
            <p className="section-subtitle-luxury">
              We focus on safety, rigorous credentials checking, and personalized matches for absolute peace of mind.
            </p>
            <div className="luxury-title-divider" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px", marginTop: "3rem" }}>
            {chooseUsReasons.map((item, idx) => (
              <div 
                key={idx} 
                className="why-local-card"
                style={{ 
                  borderRadius: "32px", 
                  padding: "40px", 
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <div style={{ backgroundColor: "rgba(255, 45, 122, 0.05)", padding: "14px", borderRadius: "50%", color: "var(--pink)", marginBottom: "20px" }}>
                  <ShieldCheck size={28} />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "750", color: "var(--plum)", marginBottom: "12px" }}>{item.title}</h3>
                <p style={{ color: "#666", fontSize: "0.95rem", lineHeight: "1.6" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Serving County (Location Cards) */}
      <section className="section" style={{ backgroundColor: "var(--gray-light)" }}>
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">LOCAL COVERAGE</span>
            <h2 className="section-title-luxury">Serving {data.name}</h2>
            <p className="section-subtitle-luxury">
              We proudly dispatch locally-stationed caregivers to serve clients within these cities, boroughs, and municipal centers.
            </p>
            <div className="luxury-title-divider" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px", marginTop: "3rem" }}>
            {data.cities.map((city, idx) => (
              <div 
                key={idx}
                className="why-local-card"
                style={{
                  backgroundColor: "var(--white)",
                  borderRadius: "24px",
                  padding: "30px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  textAlign: "left",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.02)"
                }}
              >
                <div style={{ backgroundColor: "rgba(255, 45, 122, 0.08)", padding: "8px", borderRadius: "50%", color: "var(--pink)", flexShrink: 0 }}>
                  <Check size={16} strokeWidth={3} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: "750", color: "var(--plum)", marginBottom: "6px" }}>{city.name}</h3>
                  <p style={{ color: "#666", fontSize: "0.88rem", lineHeight: "1.5" }}>{city.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Coverage Map */}
      <section className="section" style={{ backgroundColor: "var(--white)" }}>
        <div className="container">
          <div className="map-card" style={{ padding: "40px", borderRadius: "32px", boxShadow: "0 15px 40px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "50px", alignItems: "center" }}>
              <div>
                <span className="eyebrow-luxury-accent">COORDINATION MAP</span>
                <h2 style={{ fontSize: "2.1rem", fontWeight: "850", color: "var(--plum)", marginBottom: "1.5rem" }}>Service Area Coverage</h2>
                <p style={{ lineHeight: "1.7", color: "#555", marginBottom: "2rem" }}>
                  {data.mapText} Our caregivers are dispatched within optimized geographic clusters to guarantee reliability, punctuality, and community familiarity.
                </p>
                <button 
                  onClick={() => handleScrollToSection("local-consultation")}
                  className="btn-luxury-lg btn-luxury-lg--primary"
                >
                  Request Local Consultation
                </button>
              </div>
              <div style={{ position: "relative", width: "100%", height: "300px", borderRadius: "24px", overflow: "hidden" }}>
                <Image
                  src="/images/service-area-map.png"
                  alt={`Blessed Hearts Homecare service coverage map in ${data.name}`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 64rem) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Getting Started */}
      <section className="section" style={{ backgroundColor: "var(--gray-light)" }}>
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">GETTING STARTED</span>
            <h2 className="section-title-luxury">How Care Begins in {data.name}</h2>
            <p className="section-subtitle-luxury">
              Our streamlined onboarding process gets professional caregivers matched to your loved one safely and quickly.
            </p>
            <div className="luxury-title-divider" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "30px", marginTop: "3rem" }}>
            {timelineSteps.map((step, idx) => (
              <div 
                key={idx} 
                className="why-local-card"
                style={{ 
                  borderRadius: "32px", 
                  padding: "40px", 
                  backgroundColor: "var(--white)",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <div 
                  style={{ 
                    background: "var(--gradient)", 
                    width: "48px", 
                    height: "48px", 
                    borderRadius: "50%", 
                    display: "flex", 
                    alignItems: "center", 
                    justify: "center", 
                    color: "var(--white)", 
                    fontWeight: "800",
                    fontSize: "1.2rem",
                    marginBottom: "20px",
                    justifyContent: "center"
                  }}
                >
                  {step.num}
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: "750", color: "var(--plum)", marginBottom: "10px" }}>{step.title}</h3>
                <p style={{ color: "#666", fontSize: "0.88rem", lineHeight: "1.5" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: Google Reviews */}
      <section className="section" style={{ backgroundColor: "var(--white)" }} aria-label="Google Reviews">
        <div className="container">
          <GoogleReviews />
        </div>
      </section>

      {/* SECTION 10: Final CTA */}
      <section className="luxury-cta-banner-section" aria-label="Find Care Banner" style={{ paddingBottom: "100px" }}>
        <div className="container">
          <div className="luxury-cta-banner-card">
            <h2>Need compassionate care in {data.name}?</h2>
            <p>
              Connect with locally stationed care coordinators who understand your community. Let us match the perfect caregiver to support your independence.
            </p>
            <div className="luxury-cta-banner-actions">
              <button 
                onClick={() => handleScrollToSection("local-consultation")}
                className="btn-luxury-lg btn-cta-white"
              >
                Request Care Today
              </button>
              <a 
                href={site.phoneHref}
                className="btn-luxury-lg btn-cta-outline"
              >
                Call Today
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: Request Consultation Form */}
      <section className="consultation-split-section" id="local-consultation" aria-labelledby="consultation-heading" style={{ backgroundColor: "var(--gray-light)", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="container">
          <div className="consultation-split-grid">
            <div className="consultation-split-info">
              <span className="eyebrow-luxury-accent">CONFIRM SCHEDULING</span>
              <h2 id="consultation-heading">Schedule a Free Care Assessment</h2>
              <p className="lead">
                Fill out our secure request form to speak with a care coordinator locally stationed near you.
              </p>
              <div className="consultation-trust-stack">
                <div className="consultation-trust-row">
                  <div className="consultation-trust-icon-box" aria-hidden="true">
                    <UserCheck size={18} />
                  </div>
                  <div className="consultation-trust-text">
                    <h4>Local Care Coordinators</h4>
                    <p>We provide full face-to-face evaluations inside the comfort of home.</p>
                  </div>
                </div>
                <div className="consultation-trust-row">
                  <div className="consultation-trust-icon-box" aria-hidden="true">
                    <FileHeart size={18} />
                  </div>
                  <div className="consultation-trust-text">
                    <h4>PA Waiver Assistance</h4>
                    <p>Help matching authorized hours and processing state caseworkers.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-card-luxury" style={{ boxShadow: "0 20px 45px rgba(90, 26, 94, 0.04)" }}>
              {formSubmitted ? (
                <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
                  <CheckCircle2 size={48} style={{ color: "#28a745", marginBottom: "1rem" }} />
                  <h3 style={{ fontFamily: "var(--font-heading)", color: "var(--plum)", fontSize: "1.5rem", fontWeight: 800 }}>Request Submitted!</h3>
                  <p style={{ fontFamily: "var(--font-body)", color: "#666", fontSize: "0.95rem", marginTop: "0.5rem" }}>
                    We have received your details. A local care coordinator will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Honeypot field for bot protection */}
                  <input type="text" name="botField" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
                  <div className="form-grid-luxury" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    <div className="field-luxury" style={{ gridColumn: "1/2" }}>
                      <label htmlFor="firstName" className="required">First Name *</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        value={formData.firstName} 
                        onChange={handleInputChange} 
                        placeholder="John" 
                        className={errors.firstName ? "input-error" : ""}
                        required 
                      />
                      {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                    </div>

                    <div className="field-luxury" style={{ gridColumn: "2/3" }}>
                      <label htmlFor="lastName" className="required">Last Name *</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleInputChange} 
                        placeholder="Doe" 
                        className={errors.lastName ? "input-error" : ""}
                        required 
                      />
                      {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                    </div>

                    <div className="field-luxury" style={{ gridColumn: "1/2" }}>
                      <label htmlFor="phone" className="required">Phone Number *</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        placeholder="(223) 260-9042" 
                        className={errors.phone ? "input-error" : ""}
                        required 
                      />
                      {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>

                    <div className="field-luxury" style={{ gridColumn: "2/3" }}>
                      <label htmlFor="email" className="required">Email Address *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        placeholder="john@example.com" 
                        className={errors.email ? "input-error" : ""}
                        required 
                      />
                      {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="field-luxury" style={{ marginTop: "1.25rem" }}>
                    <label htmlFor="message">Your Care Request Details</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      rows={4} 
                      placeholder="Brief details about scheduling preferences, medical conditions, or waiver status..." 
                    />
                  </div>

                  {submitError && (
                    <div style={{ marginTop: "1rem", padding: "0.75rem 1rem", backgroundColor: "#fde8e8", color: "#c81e1e", borderRadius: "8px", fontSize: "0.95rem", textAlign: "center" }}>
                      {submitError}
                    </div>
                  )}

                  <div style={{ marginTop: "1.75rem" }}>
                    <button 
                      type="submit" 
                      className="btn-luxury-lg btn-luxury-lg--primary" 
                      style={{ width: "100%", justifyContent: "center", opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting Request..." : "Submit Request"}
                    </button>
                    <p className="form-privacy-notice" style={{ textAlign: "center", marginTop: "1rem" }}>
                      ✓ Your information is secure, private, and encrypted.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
