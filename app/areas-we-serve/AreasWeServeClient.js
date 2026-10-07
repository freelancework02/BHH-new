"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Search, 
  Map, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  CheckCircle, 
  UserCheck, 
  HelpCircle, 
  ChevronRight,
  Star,
  Plus,
  Minus,
  Phone,
  Mail,
  FileHeart,
  Users,
  Compass
} from "lucide-react";
import Script from "next/script";
import { site } from "@/lib/site";
import GoogleReviews from "@/components/GoogleReviews";
import "./areas.css";

const countyMunicipalities = [
  {
    id: "york",
    name: "York County",
    badge: "Immediate Care Available",
    communities: "18 Communities",
    distance: "0 miles (Headquarters)",
    caregivers: "45+ Local Caregivers",
    cities: ["York City", "Hanover", "Red Lion", "Dallastown", "Shrewsbury", "West York", "Wrightsville", "Springettsbury", "Penn", "Manchester", "Dillsburg"],
    status: "Primary Hub",
    notes: "Home of our regional office. Caregivers stationed across all boroughs for fast response."
  },
  {
    id: "lancaster",
    name: "Lancaster County",
    badge: "Immediate Care Available",
    communities: "15 Communities",
    distance: "24 miles from HQ",
    caregivers: "30+ Local Caregivers",
    cities: ["Lancaster City", "Columbia", "Millersville", "Lititz", "Mount Joy", "Elizabethtown", "Ephrata", "Manheim", "East Petersburg", "Willow Street"],
    status: "Active Coverage",
    notes: "Full daily coverage across Lancaster metro and surrounding farming communities."
  },
  {
    id: "adams",
    name: "Adams County",
    badge: "Active Standby",
    communities: "12 Communities",
    distance: "32 miles from HQ",
    caregivers: "20+ Local Caregivers",
    cities: ["Gettysburg", "Littlestown", "East Berlin", "McSherrystown", "New Oxford", "Carroll Valley", "Abbottstown", "Arendtsville"],
    status: "Active Coverage",
    notes: "Dedicated caregivers serving historic Gettysburg and rural Adams communities."
  },
  {
    id: "cumberland",
    name: "Cumberland County",
    badge: "Immediate Care Available",
    communities: "14 Communities",
    distance: "28 miles from HQ",
    caregivers: "25+ Local Caregivers",
    cities: ["Carlisle", "Mechanicsburg", "Camp Hill", "Shiremanstown", "Enola", "Lemoyne", "New Cumberland", "Wormleysburg", "West Fairview"],
    status: "Active Coverage",
    notes: "Serving families across the West Shore and Carlisle municipalities."
  },
  {
    id: "dauphin",
    name: "Dauphin County",
    badge: "Active Standby",
    communities: "13 Communities",
    distance: "26 miles from HQ",
    caregivers: "22+ Local Caregivers",
    cities: ["Harrisburg", "Hershey", "Middletown", "Lower Paxton", "Steelton", "Hummelstown", "Penbrook", "Paxtang", "Highspire"],
    status: "Active Coverage",
    notes: "Active care service network covering the state capital and surrounding boroughs."
  },
  {
    id: "lebanon",
    name: "Lebanon County",
    badge: "Active Standby",
    communities: "10 Communities",
    distance: "34 miles from HQ",
    caregivers: "18+ Local Caregivers",
    cities: ["Lebanon City", "Palmyra", "Annville", "Myerstown", "Cornwall", "Campbelltown", "Cleona", "Jonestown"],
    status: "Active Coverage",
    notes: "Active coverage supporting seniors and families throughout Lebanon and Palmyra."
  },
  {
    id: "perry",
    name: "Perry County",
    badge: "Active Standby",
    communities: "8 Communities",
    distance: "38 miles from HQ",
    caregivers: "15+ Local Caregivers",
    cities: ["Bloomfield", "Newport", "Marysville", "Duncannon", "Landisburg", "Liverpool", "Millerstown", "New Buffalo"],
    status: "Active Coverage",
    notes: "Reliable caregiver matching for Perry County residential and rural areas."
  },
  {
    id: "berks",
    name: "Berks County",
    badge: "Immediate Care Available",
    communities: "16 Communities",
    distance: "40 miles from HQ",
    caregivers: "28+ Local Caregivers",
    cities: ["Reading", "Wyomissing", "Kutztown", "Boyertown", "Hamburg", "Birdsboro", "West Reading", "Shillington"],
    status: "Active Coverage",
    notes: "Serving families throughout Reading, Wyomissing, and surrounding Berks boroughs."
  },
  {
    id: "lehigh",
    name: "Lehigh County",
    badge: "Immediate Care Available",
    communities: "14 Communities",
    distance: "55 miles from HQ",
    caregivers: "25+ Local Caregivers",
    cities: ["Allentown", "Bethlehem", "Emmaus", "Whitehall", "Macungie", "Catasauqua", "Coplay", "Slatington"],
    status: "Active Coverage",
    notes: "Top-tier home care coordination serving Allentown and the Lehigh Valley."
  },
  {
    id: "northampton",
    name: "Northampton County",
    badge: "Immediate Care Available",
    communities: "12 Communities",
    distance: "58 miles from HQ",
    caregivers: "20+ Local Caregivers",
    cities: ["Bethlehem", "Easton", "Nazareth", "Bangor", "Northampton", "Hellertown", "Wind Gap", "Pen Argyl"],
    status: "Active Coverage",
    notes: "Professional non-medical companion and personal care in Easton, Bethlehem, and Nazareth."
  }
];

const whyChooseLocal = [
  {
    title: "97% client satisfaction",
    desc: "Peace of mind you can feel"
  },
  {
    title: "Daily care experts",
    desc: "For seniors who want to age in place"
  },
  {
    title: "Available 24/7",
    desc: "We’re always here when you need us"
  },
  {
    title: "Highly trained caregivers",
    desc: "Only 1 in 25 applicants make our team"
  },
  {
    title: "Flexible, affordable care",
    desc: "No long-term contracts"
  },
  {
    title: "Mental & physical support",
    desc: "A balanced, compassionate approach"
  }
];

const timelineSteps = [
  {
    num: "01",
    title: "Contact Us",
    desc: "Call or submit an online request. A local PA coordinator will confirm coverage options in your borough."
  },
  {
    num: "02",
    title: "Confirm Address",
    desc: "We verify your zip code against our nearby caregiver routes to ensure absolute scheduling reliability."
  },
  {
    num: "03",
    title: "Free Assessment",
    desc: "Our local care representative conducts a complimentary, in-home care assessment to details goals."
  },
  {
    num: "04",
    title: "Caregiver Match",
    desc: "We match a local caregiver based on specialized needs, personality, and geographic proximity."
  },
  {
    num: "05",
    title: "Care Begins",
    desc: "We introduce your matched caregiver in person, launching transparent, regular check-in schedules."
  }
];

const faqsList = [
  {
    q: "How quickly can care start in my area?",
    a: "Because we have caregiver teams stationed across South Central Pennsylvania, we can typically match a caregiver and start care within 48 to 72 hours of your initial inquiry and home assessment."
  },
  {
    q: "Do caregivers travel to rural townships or just major boroughs?",
    a: "Our caregivers travel directly to families living in both municipal city hubs and rural townships throughout York, Lancaster, Adams, Cumberland, and Dauphin counties. We coordinate travel to ensure punctuality."
  },
  {
    q: "Are the caregivers locally based in my county?",
    a: "Yes! We intentionally hire background-checked caregivers who reside directly in the communities they serve. This ensures reliable attendance, community knowledge, and fast dispatching during emergencies."
  },
  {
    q: "How does the matching process work for local care?",
    a: "During our free in-home consultation, our local PA Care Coordinator evaluates health needs, personal routines, and social preferences. We then match you with a caregiver who has relevant experience and lives nearby."
  }
];

export default function AreasPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", county: "York", message: "" });
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
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
    if (!formData.name.trim()) tempErrors.name = "Full name is required.";
    
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

    if (!formData.county) {
      tempErrors.county = "County is required.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!handleValidation()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const formPayload = new FormData();
      formPayload.append("access_key", "ae29ff25-607e-4eb5-a6df-e30885a1b4a5");
      formPayload.append("subject", `New Consultation Request from ${formData.name} (${formData.county})`);
      formPayload.append("from_name", "Blessed Hearts Website Lead");
      formPayload.append("name", formData.name);
      formPayload.append("email", formData.email);
      formPayload.append("phone", formData.phone);
      formPayload.append("county", formData.county);
      formPayload.append("message", formData.message || "N/A");
      formPayload.append("source", "Areas We Serve Consultation Form");

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
          source: "Areas We Serve Consultation Form",
        }),
      }).catch((e) => console.warn("Firestore save error:", e));

      setFormSubmitted(true);
      setFormData({ name: "", phone: "", email: "", county: "York", message: "" });
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

  // Filter logic
  const filteredCounties = countyMunicipalities.filter((county) => {
    const matchesCounty = county.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCities = county.cities.some((city) => 
      city.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesCounty || matchesCities;
  });

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
      {/* Background blobs */}
      <div className="areas-bg-blob areas-bg-blob--1" aria-hidden="true" />
      <div className="areas-bg-blob areas-bg-blob--2" aria-hidden="true" />
      <div className="areas-bg-blob areas-bg-blob--3" aria-hidden="true" />

      {/* SECTION 1: Premium Hero */}
      <section className="areas-hero-section" aria-label="Regional Coverage Hero">
        <div className="container">
          <div className="areas-hero-grid">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="areas-hero-content"
            >
              <div className="areas-hero-badge">
                <Compass size={12} /> Regional Network
              </div>
              <h1 className="areas-hero-title">
                Compassionate Home Care Across South Central Pennsylvania
              </h1>
              <p className="areas-hero-desc">
                Supporting families throughout York County and neighboring communities. Our dedicated caregivers travel directly to your home, delivering licensed personal care and companion support you can rely on.
              </p>
              <div className="areas-hero-actions">
                <button 
                  onClick={() => handleScrollToSection("request-consultation")}
                  className="btn-luxury-lg btn-luxury-lg--primary"
                >
                  Request Care <ArrowRight size={16} />
                </button>
                <button 
                  onClick={() => handleScrollToSection("county-finder")}
                  className="btn-luxury-lg btn-luxury-lg--secondary"
                >
                  Check Your Coverage
                </button>
              </div>
              <div className="areas-hero-trust">
                <div className="areas-hero-trust-item">
                  <ShieldCheck size={18} />
                  <span>Licensed Agency</span>
                </div>
                <div className="areas-hero-trust-item">
                  <Users size={18} />
                  <span>Local PA Caregivers</span>
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
                  src="/images/image.webp"
                  alt="Blessed Hearts Homecare caregiver smiling and checking in on an elderly couple in their living room"
                  fill
                  priority
                  className="areas-hero-img"
                  sizes="(max-width: 64rem) 100vw, 45vw"
                />
              </div>

              {/* Floating Trust Badge */}
              <div className="floating-county-badge animate-float">
                <div className="floating-county-badge__avatar" aria-hidden="true">PA</div>
                <div>
                  <h4>Serving Families</h4>
                  <p>Across 5 South Central PA Counties</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Find Care Near You (County Finder) */}
      <section className="finder-section" id="county-finder" aria-labelledby="finder-heading">
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">COUNTY FINDER</span>
            <h2 id="finder-heading" className="section-title-luxury">Find Care Near You</h2>
            <p className="section-subtitle-luxury">
              Search by your city, borough, or township below to immediately confirm caregiver availability in your county.
            </p>
            <div className="luxury-title-divider" />
          </div>

          {/* Search box */}
          <div className="finder-search-box">
            <div className="finder-input-wrapper">
              <Search size={20} className="finder-search-icon" aria-hidden="true" />
              <input 
                type="text" 
                className="finder-search-input" 
                placeholder="Search your city or county (e.g. Hanover, Hershey, York)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search city or county for coverage check"
              />
            </div>
          </div>

          {/* County grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="finder-grid"
          >
            {filteredCounties.length > 0 ? (
              filteredCounties.map((county) => (
                <motion.button
                  key={county.id}
                  variants={fadeInUp}
                  onClick={() => handleScrollToSection(county.id)}
                  className="finder-card"
                  aria-label={`View coverage details for ${county.name}`}
                >
                  <div className="finder-card-badge">{county.badge}</div>
                  <h3>{county.name}</h3>
                  <span className="finder-card-communities">{county.communities}</span>
                  <div className="finder-card-btn">
                    <span>View Coverage</span>
                    <ChevronRight size={14} className="finder-card-btn-arrow" />
                  </div>
                </motion.button>
              ))
            ) : (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem", color: "#666" }}>
                <p>No coverage match found for your search. We are expanding soon! Feel free to contact our York office.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Service Directory Details */}
      <section className="directory-section" aria-labelledby="directory-heading">
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">SERVICE AREAS</span>
            <h2 id="directory-heading" className="section-title-luxury">Our Service Directory</h2>
            <p className="section-subtitle-luxury">
              We provide licensed, custom in-home care across the following local boroughs, cities, and surrounding municipal centers.
            </p>
            <div className="luxury-title-divider" />
          </div>

          <div className="directory-grid">
            {countyMunicipalities.map((county) => (
              <div key={county.id} id={county.id} className="directory-card">
                <div className="directory-card-header">
                  <h3>{county.name}</h3>
                  <span className="directory-card-header-badge">{county.status}</span>
                </div>
                
                <div className="directory-card-body">
                  <div className="directory-card-meta">
                    <div className="directory-meta-item">
                      <MapPin size={14} aria-hidden="true" />
                      <span>{county.distance}</span>
                    </div>
                    <div className="directory-meta-item">
                      <Users size={14} aria-hidden="true" />
                      <span>{county.caregivers}</span>
                    </div>
                  </div>

                  <h4 className="directory-cities-title">Boroughs &amp; Cities Covered</h4>
                  <ul className="directory-cities-list">
                    {county.cities.map((city, idx) => (
                      <li key={idx} className="directory-cities-item">
                        <span>{city}</span>
                      </li>
                    ))}
                  </ul>

                  <p style={{ fontSize: "0.85rem", color: "#777", lineHeight: "1.5", margin: "0 0 1.75rem 0", fontStyle: "italic" }}>
                    {county.notes}
                  </p>

                  <div className="directory-card-actions">
                    <button 
                      onClick={() => handleScrollToSection("request-consultation")}
                      className="btn-directory-cta btn-directory-cta--primary"
                    >
                      Request Care
                    </button>
                    <Link 
                      href="tel:2232609042" 
                      className="btn-directory-cta btn-directory-cta--secondary"
                    >
                      Call Office
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Interactive Coverage Map Card */}
      <section className="map-section" aria-labelledby="map-heading">
        <div className="container">
          <div className="map-card">
            <div className="map-card-grid">
              
              <div className="map-media-wrapper">
                <div className="map-image-container">
                  <Image
                    src="/images/service-area-map.webp"
                    alt="Blessed Hearts Homecare service region map showing York, Lancaster, Adams, Cumberland, and Dauphin counties"
                    fill
                    loading="lazy"
                    className="map-img"
                    sizes="(max-width: 64rem) 100vw, 40vw"
                  />
                </div>

                {/* Floating Map Badges */}
                <div className="map-float-badge map-float-badge--1 animate-float">
                  <ShieldCheck size={16} />
                  <span>Licensed Caregivers</span>
                </div>
                <div className="map-float-badge map-float-badge--2 animate-float" style={{ animationDelay: "1s" }}>
                  <Clock size={16} />
                  <span>24/7 Support Network</span>
                </div>
              </div>

              <div className="map-info-content">
                <span className="eyebrow-luxury-accent">PA SERVICE REGION</span>
                <h2 id="map-heading">South Central PA Coverage Map</h2>
                <p>
                  Blessed Hearts Homecare bridges care gaps throughout South Central Pennsylvania. Our regional care footprint spans historic city centers, residential suburbs, and rural boroughs to ensure your family receives timely, licensed companion support.
                </p>
                <div className="map-trust-list">
                  <div className="map-trust-item">
                    <CheckCircle size={16} aria-hidden="true" />
                    <span>Approved Medicaid Waiver Provider</span>
                  </div>
                  <div className="map-trust-item">
                    <CheckCircle size={16} aria-hidden="true" />
                    <span>Serving Lancaster, York, Adams, Cumberland, &amp; Dauphin Counties</span>
                  </div>
                  <div className="map-trust-item">
                    <CheckCircle size={16} aria-hidden="true" />
                    <span>Caregivers Stationed in Your Zip Code</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleScrollToSection("request-consultation")}
                  className="btn-luxury-lg btn-luxury-lg--primary"
                  style={{ padding: "0.95rem 2rem", fontSize: "0.9rem" }}
                >
                  Request Regional Consultation
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Our York Office */}
      <section className="office-section" aria-labelledby="office-heading">
        <div className="container">
          <div className="office-grid">
            
            <div className="office-info">
              <span className="eyebrow-luxury-accent">REGIONAL OFFICE HEADQUARTERS</span>
              <h2 id="office-heading">Visit Our York Office</h2>
              <div className="office-address-block">
                {site.address.line1}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </div>
              <p className="office-description">
                Our main office coordinates schedules, conducts caregiver credentials checks, and interfaces directly with county caseworkers and Medicaid coordinators. We maintain active compliance metrics to deliver seamless non-medical home care.
              </p>

              <div className="office-contact-stack">
                <div className="office-contact-row">
                  <Phone size={16} aria-hidden="true" />
                  <span>
                    <strong>Phone:</strong> <a href={site.phoneHref}>{site.phoneDisplay}</a>
                  </span>
                </div>
                <div className="office-contact-row">
                  <Mail size={16} aria-hidden="true" />
                  <span>
                    <strong>Email:</strong> <a href={`mailto:${site.email}`}>{site.email}</a>
                  </span>
                </div>
                <div className="office-contact-row">
                  <Clock size={16} aria-hidden="true" />
                  <span>
                    <strong>Hours:</strong> Mon - Fri, 9:00 AM - 5:00 PM (Emergency Coordinators on-call 24/7)
                  </span>
                </div>
              </div>

              <div className="office-actions">
                <Link 
                  href="https://www.google.com/maps/dir/?api=1&destination=1224+S+Queen+St+Suite+206+York+PA+17403"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury-lg btn-luxury-lg--primary"
                >
                  Get Directions <ArrowRight size={16} />
                </Link>
                <Link 
                  href="tel:2232609042"
                  className="btn-luxury-lg btn-luxury-lg--secondary"
                >
                  Call Office
                </Link>
              </div>
            </div>

            <div className="office-map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3056.8839077222384!2d-76.71960292398436!3d39.943960071519965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c88ede53eb5183%3A0xc3f8e65814bfb2b1!2s1224%20S%20Queen%20St%20%23206%2C%20York%2C%20PA%2017403!5e0!3m2!1sen!2sus!4v1719999999999!5m2!1sen!2sus"
                className="office-map-iframe"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Blessed Hearts Homecare York HQ Office Location Map"
              />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: Why Families Trust Blessed Hearts */}
      <section className="why-local-section" aria-labelledby="why-local-heading">
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">OUR TRUST GUARANTEE</span>
            <h2 id="why-local-heading" className="section-title-luxury">Why Families Trust Blessed Hearts</h2>
            <p className="section-subtitle-luxury">
              We maintain absolute compliance, certified care coordinators, and highly matched caregiver relationships across South Central PA.
            </p>
            <div className="luxury-title-divider" />
          </div>

          <div className="why-local-grid">
            {whyChooseLocal.map((item, index) => (
              <div key={index} className="why-local-card">
                <div className="why-local-icon-box" aria-hidden="true">
                  <ShieldCheck size={20} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Coverage Process (Timeline) */}
      <section className="timeline-section" aria-labelledby="timeline-heading">
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">ONBOARDING PATHWAY</span>
            <h2 id="timeline-heading" className="section-title-luxury">How Care Starts in Your Area</h2>
            <p className="section-subtitle-luxury">
              Five simple steps to confirm scheduling, assess in-home safety, and pair your loved one with a local caregiver.
            </p>
            <div className="luxury-title-divider" />
          </div>

          <div className="timeline-flow">
            <div className="timeline-line" aria-hidden="true" />
            
            {timelineSteps.map((step, index) => (
              <div key={index} className="timeline-step">
                <div className="timeline-node" aria-hidden="true">
                  {step.num}
                </div>
                <div className="timeline-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: Areas Growing Soon */}
      <section className="expansion-section" aria-label="Service Expansion Waitlist">
        <div className="container">
          <div className="expansion-card">
            <h2>Areas Growing Soon</h2>
            <p>
              Don't see your specific borough or county listed? We are actively expanding caregiver networks across South Central PA. Join our waitlist to be notified when care routes open.
            </p>
            <button 
              onClick={() => handleScrollToSection("request-consultation")}
              className="btn-luxury-lg btn-luxury-lg--primary btn-cta-white"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 9: Frequently Asked Questions */}
      <section className="faq-section-areas" aria-labelledby="faq-title-heading">
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">COVERAGE CLEARITY</span>
            <h2 id="faq-title-heading" className="section-title-luxury">Frequently Asked Questions</h2>
            <p className="section-subtitle-luxury">
              Have questions about receiving non-medical care within our regional network? Find immediate answers below.
            </p>
            <div className="luxury-title-divider" />
          </div>

          <div className="faq-accordions-luxury" style={{ maxWidth: "800px", margin: "0 auto" }}>
            {faqsList.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`faq-item-luxury ${isOpen ? "faq-item-luxury--open" : ""}`}>
                  <button 
                    className="faq-item-luxury__trigger" 
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <Minus size={18} className="faq-icon" /> : <Plus size={18} className="faq-icon" />}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1, transition: { duration: 0.3 } }}
                        exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
                        className="faq-item-luxury__panel"
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 10: Google Reviews (CUSTOM CLONE) */}
      <section className="section" aria-label="Google Reviews">
        <div className="container">
          <GoogleReviews />
        </div>
      </section>

      {/* SECTION 11: Schedule Consultation Split Form */}
      <section className="consultation-split-section" id="request-consultation" aria-labelledby="consultation-heading">
        <div className="container">
          <div className="consultation-split-grid">
            
            <div className="consultation-split-info">
              <span className="eyebrow-luxury-accent">CONFIRM SCHEDULING</span>
              <h2 id="consultation-heading">Schedule a Free Care Assessment</h2>
              <p className="lead">
                Ready to secure peace of mind? Fill out our form to connect with our local York office coordinator within 24 hours.
              </p>

              <div className="consultation-trust-stack">
                <div className="consultation-trust-row">
                  <div className="consultation-trust-icon-box" aria-hidden="true">
                    <UserCheck size={18} />
                  </div>
                  <div className="consultation-trust-text">
                    <h4>Local Assessment Coordindators</h4>
                    <p>We perform full face-to-face evaluations inside the comfort of home.</p>
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

            {/* Form */}
            <div className="form-card-luxury" style={{ boxShadow: "0 20px 45px rgba(90, 26, 94, 0.04)" }}>
              {formSubmitted ? (
                <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
                  <CheckCircle size={48} style={{ color: "#28a745", marginBottom: "1rem" }} />
                  <h3 style={{ fontFamily: "var(--font-heading)", color: "var(--plum)", fontSize: "1.5rem", fontWeight: 800 }}>Consultation Scheduled!</h3>
                  <p style={{ fontFamily: "var(--font-body)", color: "#666", fontSize: "0.95rem", marginTop: "0.5rem" }}>
                    We have received your details. A local care coordinator will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Honeypot field for bot protection */}
                  <input type="text" name="botField" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
                  <div className="form-grid-luxury">
                    <div className="field-luxury">
                      <label htmlFor="name" className="required">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        placeholder="John Doe" 
                        className={errors.name ? "input-error" : ""}
                        required 
                      />
                      {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>

                    <div className="field-luxury">
                      <label htmlFor="phone" className="required">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        placeholder="(555) 000-0000" 
                        className={errors.phone ? "input-error" : ""}
                        required 
                      />
                      {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>

                    <div className="field-luxury">
                      <label htmlFor="email" className="required">Email Address</label>
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

                    <div className="field-luxury">
                      <label htmlFor="county" className="required">County</label>
                      <select 
                        id="county" 
                        name="county" 
                        value={formData.county} 
                        onChange={handleInputChange}
                        className={errors.county ? "input-error" : ""}
                      >
                        <option value="York">York County</option>
                        <option value="Lancaster">Lancaster County</option>
                        <option value="Adams">Adams County</option>
                        <option value="Cumberland">Cumberland County</option>
                        <option value="Dauphin">Dauphin County</option>
                        <option value="Lebanon">Lebanon County</option>
                        <option value="Perry">Perry County</option>
                        <option value="Berks">Berks County</option>
                        <option value="Lehigh">Lehigh County</option>
                        <option value="Northampton">Northampton County</option>
                      </select>
                      {errors.county && <span className="error-message">{errors.county}</span>}
                    </div>
                  </div>

                  <div className="field-luxury" style={{ marginTop: "1.25rem" }}>
                    <label htmlFor="message">Your Care Request details</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      rows={4} 
                      placeholder="Brief details about schedule preferences, conditions, or waiver status..." 
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

      {/* SECTION 13: Large CTA Banner */}
      <section className="luxury-cta-banner-section" aria-label="Find Care Banner">
        <div className="container">
          <div className="luxury-cta-banner-card">
            <h2>Ready to Find Care in Your Area?</h2>
            <p>
              Connect with locally stationed care coordinators who understand South Central Pennsylvania. Let us match the perfect caregiver to support your independence.
            </p>
            <div className="luxury-cta-banner-actions">
              <button 
                onClick={() => handleScrollToSection("request-consultation")}
                className="btn-luxury-lg btn-cta-white"
              >
                Request Care Today
              </button>
              <Link 
                href="tel:2232609042"
                className="btn-luxury-lg btn-cta-outline"
              >
                Call Office (223) 260-9042
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
