"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  CheckCircle, 
  UserCheck, 
  MapPin, 
  ChevronRight, 
  Calendar,
  Layers,
  ArrowRight,
  Printer,
  Sparkles,
  Heart,
  Briefcase,
  Plus,
  Minus,
  MessageSquare
} from "lucide-react";
import { site } from "@/lib/site";
import GoogleReviews from "@/components/GoogleReviews";
import "./contact.css";

const contactChannels = [
  {
    id: "call-us",
    title: "Call Us",
    desc: "Speak with a live Care Coordinator immediately.",
    icon: Phone,
    actionText: "Call (223) 260-9042",
    actionLink: "tel:2232609042"
  },
  {
    id: "email-us",
    title: "Email Us",
    desc: "Send your inquiries, we respond within 1 business day.",
    icon: Mail,
    actionText: "Email Support",
    actionLink: `mailto:${site.email}`
  },
  {
    id: "schedule-consult",
    title: "Book Consultation",
    desc: "Schedule a free, in-home care assessment with us.",
    icon: Calendar,
    actionText: "Request Assessment",
    actionLink: "#contact-form"
  },
  {
    id: "careers",
    title: "Careers",
    desc: "Apply to become a licensed, local caregiver.",
    icon: Briefcase,
    actionText: "Apply Today",
    actionLink: "mailto:blessedheartshca1@gmail.com?subject=Caregiver Application Request"
  }
];

const whyContactUs = [
  {
    title: "Free Consultation",
    desc: "We perform full face-to-face evaluations inside the comfort of your home at no charge.",
    icon: Sparkles
  },
  {
    title: "Fast Response",
    desc: "Our team typically answers inquiries and matches caregivers within 24 to 48 hours.",
    icon: Clock
  },
  {
    title: "Personalized Care Plans",
    desc: "We customize tasks, schedules, and matches directly to your medical needs and preferences.",
    icon: Heart
  },
  {
    title: "Compassionate Local Team",
    desc: "Our caregivers are background-checked, insured, and reside in the townships they serve.",
    icon: UserCheck
  }
];

const careCoordinators = [
  {
    name: "Abessan Kamara",
    role: "Lead Care Coordinator",
    quote: "My goal is to make sure every family feels heard, supported, and matched with the perfect caregiver.",
    img: "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SG9tZWNhcmV8ZW58MHx8MHx8fDA%3D"
  },
  {
    name: "Sarah Jenkins",
    role: "Medicaid Waiver Specialist",
    quote: "I guide families step-by-step through state programs to maximize their authorized care hours.",
    img: "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SG9tZWNhcmV8ZW58MHx8MHx8fDA%3D"
  },
  {
    name: "David Vance",
    role: "Scheduling Director",
    quote: "We work 24/7 to coordinate reliable care schedules that match your family's exact routine.",
    img: "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SG9tZWNhcmV8ZW58MHx8MHx8fDA%3D"
  }
];

const timelineSteps = [
  {
    num: "01",
    title: "Contact Us",
    desc: "Give us a call or submit our consultation form. A local coordinator will review your needs immediately."
  },
  {
    num: "02",
    title: "Free Consultation",
    desc: "We visit you in person to talk through goals, medical needs, schedules, and funding options."
  },
  {
    num: "03",
    title: "Care Assessment",
    desc: "Our lead coordinator conducts a clinical safety assessment to establish the official customized care plan."
  },
  {
    num: "04",
    title: "Caregiver Match",
    desc: "We introduce you to a background-checked caregiver whose credentials and personality match yours."
  },
  {
    num: "05",
    title: "Care Begins",
    desc: "Services launch smoothly. We continue to perform regular check-ins to verify safety and happiness."
  }
];

const faqsList = [
  {
    q: "How quickly can you start home care services?",
    a: "We can typically launch services within 48 to 72 hours of your initial request and home assessment. In urgent situations, we work diligently to match caregivers even faster."
  },
  {
    q: "Do you accept Medicaid Waiver and state programs?",
    a: "Yes! Blessed Hearts Homecare is an approved provider for PA Medicaid Waivers, including the CHC (Community HealthChoices) waiver. We interface directly with your service coordinators."
  },
  {
    q: "Are your caregivers insured and background-checked?",
    a: "Absolutely. Every caregiver on our team undergoes a rigorous, multi-layered background check, reference checks, and training. They are also fully insured and bonded."
  },
  {
    q: "Can I adjust the care schedule if our needs change?",
    a: "Yes. Our coordinators are available 24/7 to adjust schedule hours, modify care plans, or arrange temporary respite schedules as your health needs evolve."
  }
];

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    zip: "",
    reasonForContact: "",
    preferredContact: "Phone",
    preferredTime: "Morning",
    message: "",
    privacyConsent: false
  });
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else {
      const digits = formData.phone.replace(/\D/g, "");
      if (digits.length < 10) {
        newErrors.phone = "Please enter a valid 10-digit phone number.";
      }
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }
    if (!formData.zip.trim()) {
      newErrors.zip = "ZIP code is required.";
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zip.trim())) {
      newErrors.zip = "Please enter a valid ZIP code.";
    }
    if (!formData.reasonForContact) {
      newErrors.reasonForContact = "Please select a reason for contact.";
    }
    if (!formData.privacyConsent) {
      newErrors.privacyConsent = "You must agree to the terms and conditions.";
    }

    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;
    if (!isValid) {
      const firstErrorKey = Object.keys(newErrors)[0];
      const errorEl = document.getElementById(firstErrorKey);
      if (errorEl) {
        errorEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // 1. Submit directly to Web3Forms from the browser (no Cloudflare bot blocks)
      const formPayload = new FormData();
      formPayload.append("access_key", "ae29ff25-607e-4eb5-a6df-e30885a1b4a5");
      formPayload.append("subject", `New Consultation Request from ${formData.firstName} ${formData.lastName}`);
      formPayload.append("from_name", "Blessed Hearts Website Lead");
      formPayload.append("name", `${formData.firstName} ${formData.lastName}`);
      formPayload.append("email", formData.email);
      formPayload.append("phone", formData.phone);
      formPayload.append("city", formData.city);
      formPayload.append("zip", formData.zip);
      formPayload.append("service", formData.reasonForContact || "Care Inquiry");
      formPayload.append("preferred_contact", `${formData.preferredContact} (${formData.preferredTime})`);
      formPayload.append("message", formData.message || "N/A");
      formPayload.append("source", "Contact Us Page");

      const web3Res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });

      const web3Data = await web3Res.json();
      if (!web3Data.success) {
        throw new Error(web3Data.message || "Unable to send your request. Please try again.");
      }

      // 2. Save lead into Firebase Firestore via server route
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "Contact Us Page",
        }),
      }).catch((e) => console.warn("Firestore save error:", e));

      setFormSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        zip: "",
        reasonForContact: "",
        preferredContact: "Phone",
        preferredTime: "Morning",
        message: "",
        privacyConsent: false
      });
      setErrors({});
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please call us at (223) 260-9042.");
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
    <div className="contact-page-wrapper">
      {/* Decorative Blobs */}
      <div className="contact-bg-blob contact-bg-blob--1" aria-hidden="true" />
      <div className="contact-bg-blob contact-bg-blob--2" aria-hidden="true" />
      <div className="contact-bg-blob contact-bg-blob--3" aria-hidden="true" />

      {/* SECTION 1: Premium Hero */}
      <section className="contact-hero-section" aria-label="Care Consultation Center Hero">
        <div className="container">
          <div className="contact-hero-grid">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="contact-hero-content"
            >
              <div className="contact-hero-badge">
                <Sparkles size={12} fill="currentColor" /> Guided Consultations
              </div>
              <h1 className="contact-hero-title">
                Let's Talk About Your <span>Loved One's Care</span>
              </h1>
              <p className="contact-hero-desc">
                Our compassionate care coordinators are here to answer your questions, schedule assessments, and help families find the perfect licensed home care solution in South Central Pennsylvania.
              </p>
              
              <div className="contact-hero-actions">
                <button 
                  onClick={() => handleScrollToSection("contact-form")}
                  className="btn-luxury-lg btn-luxury-lg--primary"
                >
                  Request Care <ArrowRight size={16} />
                </button>
                <a 
                  href="tel:2232609042"
                  className="btn-luxury-lg btn-luxury-lg--secondary"
                  style={{ textDecoration: "none" }}
                >
                  Call (223) 260-9042
                </a>
              </div>

              <div className="contact-hero-trust">
                <div className="contact-hero-trust-item">
                  <ShieldCheck size={18} />
                  <span>Licensed Agency</span>
                </div>
                <div className="contact-hero-trust-item">
                  <UserCheck size={18} />
                  <span>Certified Caregivers</span>
                </div>
                <div className="contact-hero-trust-item">
                  <Clock size={18} />
                  <span>24/7 Family Support</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="contact-hero-media"
            >
              <div className="contact-hero-image-wrapper">
                <Image
                  src="https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SG9tZWNhcmV8ZW58MHx8MHx8fDA%3D"
                  alt="A friendly care coordinator speaking and consulting with an elderly senior client inside a living room"
                  fill
                  priority
                  className="contact-hero-img"
                  sizes="(max-width: 64rem) 100vw, 40vw"
                />
              </div>

              {/* Floating Badge */}
              <div className="floating-county-badge animate-float" style={{ bottom: "2rem", right: "auto", left: "-1.5rem" }}>
                <div className="floating-county-badge__avatar" aria-hidden="true">BH</div>
                <div>
                  <h4>Care Consultation</h4>
                  <p>Speak with a specialist today</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Choose Channels */}
      <section className="channels-section" aria-labelledby="channels-heading">
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">COMMUNICATION CHANNELS</span>
            <h2 id="channels-heading" className="section-title-luxury">Choose How You'd Like to Contact Us</h2>
            <p className="section-subtitle-luxury">
              We provide multiple contact routes to make reaching our coordinators as straightforward and anxiety-free as possible.
            </p>
            <div className="luxury-title-divider" />
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="channels-grid"
          >
            {contactChannels.map((channel) => {
              const IconComp = channel.icon;
              return (
                <motion.div 
                  key={channel.id}
                  variants={fadeInUp}
                  className="channel-card"
                  onClick={() => {
                    if (channel.actionLink.startsWith("#")) {
                      handleScrollToSection(channel.actionLink.substring(1));
                    } else {
                      window.location.href = channel.actionLink;
                    }
                  }}
                >
                  <div className="channel-icon-box" aria-hidden="true">
                    <IconComp size={20} />
                  </div>
                  <h3>{channel.title}</h3>
                  <p>{channel.desc}</p>
                  <span className="channel-card-btn">
                    {channel.actionText} <ChevronRight size={14} />
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Guided Contact Form Card */}
      <section className="form-section" id="contact-form" aria-labelledby="form-heading">
        <div className="container">
          <div className="contact-luxury-card">
            
            <div className="progressive-form-header">
              <span className="eyebrow-luxury-accent">CONSULTATION SCHEDULER</span>
              <h2 id="form-heading">Request a Free Care Consultation</h2>
              <p>Please share a few details about your family's needs, and our coordinators will reach out shortly.</p>
              <div className="luxury-title-divider" style={{ margin: "1.5rem auto 0 auto" }} />
            </div>

            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ padding: "4rem 2rem", textAlign: "center" }}
              >
                <CheckCircle size={64} style={{ color: "#28a745", margin: "0 auto 1.5rem auto" }} />
                <h3 style={{ fontFamily: "var(--font-heading)", color: "var(--plum)", fontSize: "1.85rem", fontWeight: 850 }}>Consultation Request Received</h3>
                <p style={{ fontFamily: "var(--font-body)", color: "#555", fontSize: "1.05rem", marginTop: "0.75rem", lineHeight: "1.6" }}>
                  Thank you for contacting Blessed Hearts Homecare. A certified care coordinator has received your details and will call or email you within one business day.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot field for bot protection */}
                <input type="text" name="botField" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
                <div className="form-grid-luxury">
                  
                  {/* First Name field */}
                  <div className="floating-group">
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      placeholder=" "
                      value={formData.firstName} 
                      onChange={handleInputChange} 
                      className={`floating-input ${errors.firstName ? 'input-error' : ''}`}
                      required 
                    />
                    <label htmlFor="firstName" className="floating-label">
                      First Name <span className="error-star" aria-hidden="true">*</span>
                    </label>
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>

                  {/* Last Name field */}
                  <div className="floating-group">
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      placeholder=" "
                      value={formData.lastName} 
                      onChange={handleInputChange} 
                      className={`floating-input ${errors.lastName ? 'input-error' : ''}`}
                      required 
                    />
                    <label htmlFor="lastName" className="floating-label">
                      Last Name <span className="error-star" aria-hidden="true">*</span>
                    </label>
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>

                  {/* Email field */}
                  <div className="floating-group">
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder=" "
                      value={formData.email} 
                      onChange={handleInputChange} 
                      className={`floating-input ${errors.email ? 'input-error' : ''}`}
                      required 
                    />
                    <label htmlFor="email" className="floating-label">
                      Email Address <span className="error-star" aria-hidden="true">*</span>
                    </label>
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  {/* Phone field */}
                  <div className="floating-group">
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      placeholder=" "
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      className={`floating-input ${errors.phone ? 'input-error' : ''}`}
                      required 
                    />
                    <label htmlFor="phone" className="floating-label">
                      Phone Number <span className="error-star" aria-hidden="true">*</span>
                    </label>
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>

                  {/* City field */}
                  <div className="floating-group">
                    <input 
                      type="text" 
                      id="city" 
                      name="city" 
                      placeholder=" "
                      value={formData.city} 
                      onChange={handleInputChange} 
                      className={`floating-input ${errors.city ? 'input-error' : ''}`}
                      required 
                    />
                    <label htmlFor="city" className="floating-label">
                      City <span className="error-star" aria-hidden="true">*</span>
                    </label>
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>

                  {/* Zip code field */}
                  <div className="floating-group">
                    <input 
                      type="text" 
                      id="zip" 
                      name="zip" 
                      placeholder=" "
                      value={formData.zip} 
                      onChange={handleInputChange} 
                      className={`floating-input ${errors.zip ? 'input-error' : ''}`}
                      required 
                    />
                    <label htmlFor="zip" className="floating-label">
                      ZIP Code <span className="error-star" aria-hidden="true">*</span>
                    </label>
                    {errors.zip && <span className="error-message">{errors.zip}</span>}
                  </div>

                  {/* Reason for Contact dropdown */}
                  <div className="floating-group">
                    <select 
                      id="reasonForContact" 
                      name="reasonForContact" 
                      value={formData.reasonForContact} 
                      onChange={handleInputChange}
                      className={`floating-select ${errors.reasonForContact ? 'input-error' : ''}`}
                      style={{ height: "100%" }}
                      required
                    >
                      <option value="" disabled>Please Select</option>
                      <option value="I need home care services">I need home care services</option>
                      <option value="I'd like to transfer/not happy with my current agency">I'd like to transfer/not happy with my current agency</option>
                      <option value="I'm looking for a job">I'm looking for a job</option>
                    </select>
                    <label htmlFor="reasonForContact" className="floating-label floating-label--floated">
                      Reason for Contact <span className="error-star" aria-hidden="true">*</span>
                    </label>
                    {errors.reasonForContact && <span className="error-message">{errors.reasonForContact}</span>}
                  </div>

                  {/* Preferred Contact Method */}
                  <div className="floating-group">
                    <select 
                      id="preferredContact" 
                      name="preferredContact" 
                      value={formData.preferredContact} 
                      onChange={handleInputChange}
                      className="floating-select"
                      style={{ height: "100%" }}
                    >
                      <option value="Phone">Preferred: Phone Call</option>
                      <option value="Email">Preferred: Email</option>
                      <option value="Text">Preferred: Text Message</option>
                    </select>
                  </div>

                  {/* Preferred Time */}
                  <div className="floating-group">
                    <select 
                      id="preferredTime" 
                      name="preferredTime" 
                      value={formData.preferredTime} 
                      onChange={handleInputChange}
                      className="floating-select"
                      style={{ height: "100%" }}
                    >
                      <option value="Morning">Best Time: Morning (9am - 12pm)</option>
                      <option value="Afternoon">Best Time: Afternoon (12pm - 5pm)</option>
                      <option value="Evening">Best Time: Evening (5pm - 8pm)</option>
                    </select>
                  </div>

                  {/* Message field */}
                  <div className="floating-group floating-group--full">
                    <textarea 
                      id="message" 
                      name="message" 
                      placeholder=" "
                      value={formData.message} 
                      onChange={handleInputChange} 
                      className="floating-textarea"
                    />
                    <label htmlFor="message" className="floating-label">Tell us about schedules, health conditions, or waiver status...</label>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="form-privacy-row">
                    <input 
                      type="checkbox" 
                      id="privacyConsent" 
                      name="privacyConsent"
                      checked={formData.privacyConsent}
                      onChange={handleCheckboxChange}
                      className={errors.privacyConsent ? "input-error" : ""}
                      required 
                    />
                    <label htmlFor="privacyConsent">
                      By checking this box, texting START to <a href="tel:2232609042" style={{ color: "var(--pink)", fontWeight: "bold" }}>223-260-9042</a>, or providing verbal consent, you agree to receive informational text messages (appointment reminders, scheduling updates, service notifications, and account information) from Blessed Hearts Homecare. Msg frequency varies. Msg &amp; data rates may apply. Mobile information will not be shared with third parties/affiliates for marketing/promotional purposes. Reply HELP for help or email <a href={`mailto:${site.email}`} style={{ color: "var(--pink)", fontWeight: "bold" }}>{site.email}</a> for support. Reply STOP to opt out at any time. Privacy Policy: <Link href="/privacy-policy" style={{ color: "var(--pink)", fontWeight: "bold" }}>www.blessedheartshca.com/privacy-policy</Link> <span className="error-star" aria-hidden="true">*</span>
                    </label>
                  </div>
                  {errors.privacyConsent && (
                    <div style={{ gridColumn: "1 / -1", marginTop: "-15px" }}>
                      <span className="error-message">{errors.privacyConsent}</span>
                    </div>
                  )}

                  {/* Submit Error feedback if any */}
                  {submitError && (
                    <div style={{ gridColumn: "1 / -1", padding: "0.75rem 1rem", backgroundColor: "#fde8e8", color: "#c81e1e", borderRadius: "8px", fontSize: "0.95rem", textAlign: "center" }}>
                      {submitError}
                    </div>
                  )}

                  {/* Submit button */}
                  <div className="form-submit-row">
                    <button 
                      type="submit" 
                      className="btn-luxury-lg btn-luxury-lg--primary"
                      style={{ minWidth: "18rem", justifyContent: "center", opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting Care Request..." : "Submit Care Request"}
                    </button>
                    <span className="form-reassurance">
                      ✓ We typically respond within one business day.
                    </span>
                  </div>

                </div>
              </form>
            )}

          </div>
        </div>
      </section>

      {/* SECTION 4: Why Families Contact Us */}
      <section className="why-contact-section" aria-labelledby="why-contact-heading">
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">TRUST FACTORS</span>
            <h2 id="why-contact-heading" className="section-title-luxury">Why Families Reassure with Us</h2>
            <p className="section-subtitle-luxury">
              Connecting with Blessed Hearts secures qualified help, transparent assistance, and immediate coordinate responses.
            </p>
            <div className="luxury-title-divider" />
          </div>

          <div className="why-contact-grid">
            {whyContactUs.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="why-contact-card">
                  <div className="why-contact-icon-box" aria-hidden="true">
                    <IconComp size={18} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: Meet Our Care Coordinators */}
      <section className="coordinators-section" aria-labelledby="coordinators-heading">
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">YOUR SUPPORT TEAM</span>
            <h2 id="coordinators-heading" className="section-title-luxury">Meet Our Care Coordinators</h2>
            <p className="section-subtitle-luxury">
              We reside and support families directly inside York and neighboring PA boroughs.
            </p>
            <div className="luxury-title-divider" />
          </div>

          <div className="coordinators-grid">
            {careCoordinators.map((c, idx) => (
              <div key={idx} className="coordinator-card">
                <div className="coordinator-img-wrapper">
                  <Image
                    src={c.img}
                    alt={c.name}
                    fill
                    loading="lazy"
                    className="coordinator-img"
                    sizes="(max-width: 64rem) 100vw, 25vw"
                  />
                </div>
                <div className="coordinator-body">
                  <h3>{c.name}</h3>
                  <span className="coordinator-role">{c.role}</span>
                  <p className="coordinator-quote">
                    &ldquo;{c.quote}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Office Details & Embedded Map Grid */}
      <section className="office-info-section" aria-labelledby="office-heading">
        <div className="container">
          <div className="office-info-grid">
            
            <div className="office-info-content">
              <span className="eyebrow-luxury-accent">LOCAL PHYSICAL HEADQUARTERS</span>
              <h2 id="office-heading">Our York Office Location</h2>
              <div className="office-address-block">
                {site.address.line1}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </div>
              
              <div className="office-contact-stack">
                <div className="office-contact-row">
                  <Phone size={16} aria-hidden="true" />
                  <span>
                    <strong>Phone Number:</strong> <a href={site.phoneHref}>{site.phoneDisplay}</a>
                  </span>
                </div>
                <div className="office-contact-row">
                  <Printer size={16} aria-hidden="true" />
                  <span>
                    <strong>Office Fax:</strong> {site.faxDisplay}
                  </span>
                </div>
                <div className="office-contact-row">
                  <Mail size={16} aria-hidden="true" />
                  <span>
                    <strong>Email Inquiries:</strong> <a href={`mailto:${site.email}`}>{site.email}</a>
                  </span>
                </div>
                <div className="office-contact-row">
                  <Clock size={16} aria-hidden="true" />
                  <span>
                    <strong>Office Hours:</strong> Mon - Fri, 9:00 AM - 5:00 PM
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px" }}>
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=1224+S+Queen+St+Suite+206+York+PA+17403"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury-lg btn-luxury-lg--primary"
                  style={{ textDecoration: "none" }}
                >
                  Get Directions <ArrowRight size={16} />
                </a>
                <a 
                  href="tel:2232609042"
                  className="btn-luxury-lg btn-luxury-lg--secondary"
                  style={{ textDecoration: "none" }}
                >
                  Call Office
                </a>
              </div>
            </div>

            <div className="office-map-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3056.8839077222384!2d-76.71960292398436!3d39.943960071519965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c88ede53eb5183%3A0xc3f8e65814bfb2b1!2s1224%20S%20Queen%20St%20%23206%2C%20York%2C%20PA%2017403!5e0!3m2!1sen!2sus!4v1719999999999!5m2!1sen!2sus"
                className="office-map-iframe"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Blessed Hearts Homecare York HQ Physical Office Location map"
              />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: How the Care Process Works Onboarding Timeline */}
      <section className="process-timeline-section" aria-labelledby="timeline-heading">
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">THE CAREPATH PATHWAY</span>
            <h2 id="timeline-heading" className="section-title-luxury">What Happens Next?</h2>
            <p className="section-subtitle-luxury">
              Five simple coordination milestones from your first contact to starting daily care.
            </p>
            <div className="luxury-title-divider" />
          </div>

          <div className="process-timeline-flow">
            <div className="process-timeline-line" aria-hidden="true" />
            
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="process-timeline-step">
                <div className="process-timeline-node" aria-hidden="true">
                  {idx + 1}
                </div>
                <div className="process-timeline-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: Emergency Support Notice Card */}
      <section className="emergency-section" aria-labelledby="emergency-heading">
        <div className="container">
          <div className="emergency-card">
            <div className="contact-hero-badge" style={{ margin: "0 auto 1.5rem auto" }}>
              <Clock size={12} /> Immediate Response
            </div>
            <h2 id="emergency-heading" style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 850, color: "var(--plum)", marginBottom: "1rem" }}>
              Need Urgent Assistance?
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "#555", maxWidth: "600px", margin: "0 auto 2.5rem auto", lineHeight: "1.6" }}>
              If your family is dealing with a sudden hospital discharge, critical medication change, or emergency care schedule gaps, do not wait for the form response. Speak directly to an on-call manager.
            </p>
            
            <a href="tel:2232609042" className="emergency-pulse-btn">
              <Phone size={18} fill="currentColor" /> Call Emergency Line: (223) 260-9042
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 9: Premium Careers Recruitment Banner */}
      <section className="careers-cta-section" aria-labelledby="careers-heading">
        <div className="container">
          <div className="careers-cta-card">
            <div className="careers-cta-grid">
              
              <div className="careers-cta-content">
                <span className="eyebrow-luxury-accent">JOIN BLESSED HEARTS</span>
                <h2 id="careers-heading">Join Our Local Caregiver Team</h2>
                <p>
                  Are you a caring individual located in York, Lancaster, or Adams counties? We offer structured skills development, consistent assignments, and a family-oriented coordinate workspace.
                </p>

                <div className="careers-benefits-grid">
                  <div className="careers-benefit-item">
                    <CheckCircle size={16} aria-hidden="true" />
                    <span>Competitive Pay</span>
                  </div>
                  <div className="careers-benefit-item">
                    <CheckCircle size={16} aria-hidden="true" />
                    <span>Paid Training</span>
                  </div>
                  <div className="careers-benefit-item">
                    <CheckCircle size={16} aria-hidden="true" />
                    <span>Flexible Shifts</span>
                  </div>
                  <div className="careers-benefit-item">
                    <CheckCircle size={16} aria-hidden="true" />
                    <span>Career Advancement</span>
                  </div>
                </div>

                <a 
                  href="mailto:blessedheartshca1@gmail.com?subject=Caregiver Application Request"
                  className="btn-luxury-lg btn-luxury-lg--primary"
                  style={{ textDecoration: "none" }}
                >
                  Apply Today <ArrowRight size={16} />
                </a>
              </div>

              <div className="careers-cta-media">
                <Image
                  src="https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SG9tZWNhcmV8ZW58MHx8MHx8fDA%3D"
                  alt="Blessed Hearts Homecare caregiver laughing and assisting an senior client with daily hobbies"
                  fill
                  loading="lazy"
                  className="blog-featured-img"
                  sizes="(max-width: 64rem) 100vw, 40vw"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: FAQ Accordions */}
      <section className="faq-section-contact" aria-labelledby="faq-title-heading">
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">FAQ</span>
            <h2 id="faq-title-heading" className="section-title-luxury">Frequently Asked Questions</h2>
            <p className="section-subtitle-luxury">
              Have questions about billing, schedules, or matching caregiver coordinators?
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
                        <p style={{ padding: "0 2rem 1.5rem 2rem", margin: 0, color: "#555", fontSize: "0.95rem", lineHeight: "1.6" }}>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 11: Google Reviews (CUSTOM CLONE) */}
      <section className="section" aria-label="Google Reviews" style={{ padding: "80px 0", backgroundColor: "var(--white)" }}>
        <div className="container">
          <GoogleReviews />
        </div>
      </section>

      {/* SECTION 13: Large Final CTA */}
      <section className="luxury-cta-banner-section" aria-label="Need Help Choosing Care">
        <div className="container">
          <div className="luxury-cta-banner-card">
            <h2>Need Help Choosing the Right Care?</h2>
            <p>
              Connect with our certified care coordinators in York. Let us match the perfect caregiver to support your independence and bring peace of mind.
            </p>
            
            <div className="luxury-cta-banner-actions">
              <button 
                onClick={() => handleScrollToSection("contact-form")}
                className="btn-luxury-lg btn-cta-white"
              >
                Request Care Consultation
              </button>
              <a 
                href="tel:2232609042"
                className="btn-luxury-lg btn-cta-outline"
                style={{ textDecoration: "none" }}
              >
                Call (223) 260-9042
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
