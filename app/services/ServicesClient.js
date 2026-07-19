"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Calendar, 
  CheckCircle, 
  FileText, 
  UserCheck, 
  ChevronRight, 
  Plus, 
  Minus, 
  Star, 
  ArrowRight,
  HelpCircle,
  Award,
  Users,
  Car,
  Home,
  UtensilsCrossed,
  Brain,
  Layers,
  UserRound,
  Shield,
  CheckCircle2,
  FileHeart,
  Briefcase
} from "lucide-react";
import ServiceAreasSearch from "@/components/ServiceAreasSearch";
import Testimonials from "@/components/Testimonials";
import "./services.css";

const servicesList = [
  {
    id: "personal-care",
    title: "Personal Care",
    icon: <Heart size={24} />,
    class: "row-personal",
    watermark: "PC",
    image: "https://images.pexels.com/photos/7345474/pexels-photo-7345474.jpeg?auto=compress&cs=tinysrgb&w=600",
    desc: "Respectful, professional assistance with daily activities to support dignity and safety at home. Our trained caregivers assist with personal routines like bathing, dressing, grooming, toileting, and safe mobility.",
    whoBenefits: "Seniors recovering from illness, living with limited mobility, or experiencing age-related physical decline.",
    benefits: "Dignity-first protocols, fall risk reduction, professional physical transfer techniques.",
    checklist: [
      "Grooming & bathing support",
      "Dressing & hygiene care",
      "Safe transfers & positioning",
      "Incontinence care",
      "Assistance with eating",
      "Mobility & walking aid"
    ],
    faqQuestion: "How do you handle personal privacy during bathing?",
    faqAnswer: "Our caregivers follow strict dignity protocols, keeping clients covered as much as possible, checking comfort levels, and ensuring absolute respect."
  },
  {
    id: "companion-care",
    title: "Companion Care",
    icon: <Users size={24} />,
    class: "row-companion",
    watermark: "CC",
    image: "https://plus.unsplash.com/premium_photo-1664475811964-75af7d90ee4b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SG9tZWNhcmV8ZW58MHx8MHx8fDA%3D",
    desc: "Active companionship and mental stimulation to combat social isolation. We share conversations, assist with hobbies, play board games, read books, and encourage positive daily interaction.",
    whoBenefits: "Seniors living alone who require light social engagement, companion ship, or cognitive exercises.",
    benefits: "Reduces isolation-related depression, encourages emotional wellness, keeps minds sharp.",
    checklist: [
      "Engaging conversation & visits",
      "Card & board games",
      "Reading aloud & book discussion",
      "Assisting with personal hobbies",
      "Accompanying on short walks",
      "Letter writing & scrapbooking"
    ],
    faqQuestion: "Can a caregiver take my parent to a local social center?",
    faqAnswer: "Yes! Social outings and visits to senior centers, parks, or community clubs are an active part of companion care."
  },
  {
    id: "meal-preparation",
    title: "Meal Preparation",
    icon: <UtensilsCrossed size={24} />,
    class: "row-mealprep",
    watermark: "MP",
    image: "https://images.pexels.com/photos/7446752/pexels-photo-7446752.jpeg?auto=compress&cs=tinysrgb&w=600",
    desc: "Nutritious, warm, home-cooked meals planned around your loved one's dietary guidelines. Caregivers handle grocery planning, prep, cooking, and kitchen cleanup.",
    whoBenefits: "Individuals with severe arthritis, diabetes, heart conditions, or difficulty standing to cook safely.",
    benefits: "Fresh nutrient intake, safe kitchen appliance operation, customized health diets.",
    checklist: [
      "Special diet cooking (low-sodium)",
      "Weekly menu planning",
      "Pantry & fridge organization",
      "Grocery list compilation",
      "Pots & pans washing",
      "Meal portioning & freezing"
    ],
    faqQuestion: "Can you prepare meals for specific diabetic or heart-healthy diets?",
    faqAnswer: "Yes, our caregivers coordinate with family guidelines and medical instructions to prepare low-sodium, diabetic-friendly, or soft food meals."
  },
  {
    id: "transportation",
    title: "Transportation Support",
    icon: <Car size={24} />,
    class: "row-transport",
    watermark: "TS",
    image: "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SG9tZWNhcmV8ZW58MHx8MHx8fDA%3D",
    desc: "Accompanied rides to keep clients active and engaged in their community. We drive to doctor appointments, local pharmacies, grocery stores, and family events.",
    whoBenefits: "Seniors who no longer drive and wish to maintain their weekly schedules independently.",
    benefits: "Safe transition in and out of vehicles, complete caregiver accompaniment during visits.",
    checklist: [
      "Doctor appointment escorts",
      "Pharmacy prescription pickups",
      "Grocery market shopping trips",
      "Visiting local family & friends",
      "Accompaniment to religious services",
      "Errand running support"
    ],
    faqQuestion: "Does the caregiver drive the client's car or their own?",
    faqAnswer: "Our caregivers are fully insured and can drive their own reliable vehicles or accompany clients in the family vehicle."
  },
  {
    id: "housekeeping",
    title: "Light Housekeeping",
    icon: <Home size={24} />,
    class: "row-housekeeping",
    watermark: "LH",
    image: "https://images.unsplash.com/photo-1765896387387-0538bc9f997e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8SG9tZWNhcmV8ZW58MHx8MHx8fDA%3D",
    desc: "Maintaining a clean, safe, and hazard-free home environment. We help with laundry, washing dishes, dusting, taking out the trash, and organizing walking pathways.",
    whoBenefits: "Individuals at risk of falling due to clutter, or those unable to manage daily heavy chores.",
    benefits: "Direct fall prevention, sanitary living spaces, organized home flow.",
    checklist: [
      "Laundry and linens washing",
      "Dishwashing & dry storage",
      "Emptying garbage bins",
      "Ironing & clothes folding",
      "Dusting key surfaces",
      "Organizing walking pathways"
    ],
    faqQuestion: "Do caregivers perform deep cleaning like window washing?",
    faqAnswer: "Our caregivers focus on light housekeeping to maintain safety and hygiene. We do not do deep industrial cleaning, carpet washing, or outdoor maintenance."
  },
  {
    id: "medication-reminders",
    title: "Medication Reminders",
    icon: <Clock size={24} />,
    class: "row-medication",
    watermark: "MR",
    image: "https://images.pexels.com/photos/7195187/pexels-photo-7195187.jpeg?auto=compress&cs=tinysrgb&w=600",
    desc: "Timely reminders to ensure your loved one adheres to their medication schedules. We help verify pill organizer usage, track dosage times, and log compliance.",
    whoBenefits: "Seniors taking multiple daily prescriptions who experience mild cognitive decline.",
    benefits: "Prevents missed doses, avoids accidental double-dosing, logs schedule compliance.",
    checklist: [
      "Timely verbal reminders",
      "Pill box opening support",
      "Tracking dosage times",
      "Fluid intake support",
      "Checking medication labels",
      "Logging compliance logs"
    ],
    faqQuestion: "Can caregivers administer injections or sort pill boxes?",
    faqAnswer: "Our caregivers provide verbal reminders and help open pre-filled boxes. Clinical sorting or injections must be managed by family members or licensed home health nurses."
  },
  {
    id: "alzheimers-care",
    title: "Alzheimer's Care",
    icon: <Brain size={24} />,
    class: "row-alzheimers",
    watermark: "AC",
    image: "https://images.pexels.com/photos/6939465/pexels-photo-6939465.jpeg?auto=compress&cs=tinysrgb&w=600",
    desc: "Dedicated memory support designed to manage confusion, prevent wandering, and maintain a comforting, stable home environment.",
    whoBenefits: "Seniors diagnosed with progressive Alzheimer's disease.",
    benefits: "De-escalation trained support, certified dementia care coordinators, wander prevention.",
    checklist: [
      "Sensory calming assistance",
      "Redirection techniques",
      "Wander prevention checks",
      "Routine stability management",
      "Memory trigger games",
      "Family status updates"
    ],
    faqQuestion: "How do you handle agitation or confusion?",
    faqAnswer: "Our caregivers are trained in gentle redirection techniques, sensory calming, and validation therapy to defuse moments of confusion."
  },
  {
    id: "dementia-care",
    title: "Dementia Care",
    icon: <Sparkles size={24} />,
    class: "row-dementia",
    watermark: "DC",
    image: "https://images.pexels.com/photos/18459247/pexels-photo-18459247.jpeg?auto=compress&cs=tinysrgb&w=600",
    desc: "Specialized, non-pharmaceutical home care focused on cognitive enrichment, sensory exercises, and patient communication to help manage progressive memory loss.",
    whoBenefits: "Seniors experiencing early-to-late stage general cognitive decline.",
    benefits: "Preserves daily independent habits, supports active memory retention, maintains comfort.",
    checklist: [
      "Sensory puzzle sheets",
      "Word games & recall tasks",
      "Validation communications",
      "Habit and mood tracking",
      "Reassuring companionship",
      "Safe exit alerts setup"
    ],
    faqQuestion: "Do you create a consistent caregiver routine?",
    faqAnswer: "Yes, consistency is key in dementia care. We strive to match a regular caregiver to maintain trust and build a familiar routine."
  },
  {
    id: "respite-care",
    title: "Respite Care",
    icon: <Layers size={24} />,
    class: "row-respite",
    watermark: "RC",
    image: "/images/image.jpg",
    desc: "Crucial temporary coverage for family caregivers. Take a break, travel, work, or rest while our professional caregivers provide reliable in-home care.",
    whoBenefits: "Family members who need relief from the daily physical and emotional demands of caregiving.",
    benefits: "Prevents caregiver burnout, maintains care quality, provides peace of mind.",
    checklist: [
      "Hourly care relief blocks",
      "Weekend coverage support",
      "Emergency backup care",
      "Overnight care blocks",
      "Client routine continuity",
      "Detailed caregiver handover"
    ],
    faqQuestion: "Can we book respite care on short notice?",
    faqAnswer: "We strive to accommodate short-notice requests, but scheduling a few days in advance guarantees matching the best caregiver."
  },
  {
    id: "disability-support",
    title: "Disability Support",
    icon: <UserRound size={24} />,
    class: "row-disability",
    watermark: "DS",
    image: "https://images.pexels.com/photos/18459192/pexels-photo-18459192.jpeg?auto=compress&cs=tinysrgb&w=600",
    desc: "Compassionate, custom assistance for adults and children with physical or developmental disabilities, supporting independence and active community participation.",
    whoBenefits: "Individuals of any age with physical paralysis, developmental delay, cerebral palsy, or autism.",
    benefits: "Medicaid Waiver approved, customized sensory integration, lifestyle support.",
    checklist: [
      "Daily hygiene coordination",
      "Community inclusion trips",
      "Transfer and lift assistance",
      "Minus safety protocols",
      "Sensory guidance tasks",
      "Independent living skills"
    ],
    faqQuestion: "Are your caregivers trained in transferring paraplegic clients?",
    faqAnswer: "Yes! Our team is trained in safe transfer protocols, slide boards, and mechanical lift assistance where required."
  },
  {
    id: "veteran-care",
    title: "Veteran Care",
    icon: <Award size={24} />,
    class: "row-veteran",
    watermark: "VC",
    image: "/images/image2.jpg",
    desc: "Honoring veterans and their surviving spouses with dedicated, non-medical home care. We help coordinate care programs funded through VA Aid & Attendance benefits.",
    whoBenefits: "Eligible military veterans and surviving spouses who require assistance with ADLs.",
    benefits: "VA Aid & Attendance specialist coordinators, zero out-of-pocket options.",
    checklist: [
      "ADL assistance blocks",
      "Companionship escorts",
      "Pill reminders & logs",
      "VA Aid & Attendance filings",
      "Routine reporting logs",
      "Pantry coordination"
    ],
    faqQuestion: "How do we check if we qualify for Aid & Attendance?",
    faqAnswer: "We work directly with veteran service officers to help you understand qualification criteria and coordinate the application paperwork."
  },
  {
    id: "24hour-care",
    title: "24-Hour Care",
    icon: <ShieldCheck size={24} />,
    class: "row-24hour",
    watermark: "24",
    image: "https://images.pexels.com/photos/9462621/pexels-photo-9462621.jpeg?auto=compress&cs=tinysrgb&w=600",
    desc: "Continuous around-the-clock monitoring and personal assistance to guarantee client safety, peace of mind, and emergency preparedness day or night.",
    whoBenefits: "Individuals with advanced neurological conditions, severe fall risks, or hospice patients.",
    benefits: "Certified wake-staff shifts, coordinator monitoring metrics, 24/7 standby support.",
    checklist: [
      "Nighttime transfer support",
      "Sleepover check-in logs",
      "Hospice support sync",
      "Continuous safety watches",
      "Structured day-to-night transitions",
      "Rotational team handovers"
    ],
    faqQuestion: "How do 24-hour shifts work?",
    faqAnswer: "We schedule teams of two or three caregivers in rotating 8-hour or 12-hour shifts to ensure caregivers remain alert, awake, and responsive at all times."
  },
  {
    id: "employment-services",
    title: "Employment Services",
    icon: <Briefcase size={24} />,
    class: "row-employment",
    watermark: "ES",
    image: "https://images.pexels.com/photos/9462761/pexels-photo-9462761.jpeg?auto=compress&cs=tinysrgb&w=600",
    desc: "Empowering individuals to achieve their career goals and gain independence. We offer comprehensive support to build skills, find suitable opportunities, and maintain meaningful employment.",
    whoBenefits: "Individuals seeking to enter or re-enter the workforce, develop professional skills, or receive coaching for job retention.",
    benefits: "Tailored career planning, job search assistance, skill enhancement, and ongoing coaching support.",
    checklist: [
      "Career Assessment",
      "Job Coaching",
      "Job Finding",
      "Employment Skills"
    ],
    faqQuestion: "How do you help clients prepare for job interviews?",
    faqAnswer: "We offer tailored mock interviews, resume writing assistance, and professional communication coaching to help clients build confidence and put their best foot forward."
  }
];

const differenceSteps = [
  {
    title: "Background Checked",
    desc: "Every caregiver undergoes rigorous screening, including state-mandated criminal background checks, references, and credentials checks."
  },
  {
    title: "Licensed & Accredited",
    desc: "Fully licensed by the Pennsylvania Department of Health to support Medicaid Waiver programs and private-pay clients."
  },
  {
    title: "Personalized Care",
    desc: "No cookie-cutter plans. We map schedules, habits, and caregiver matches to fit your family's dynamic."
  },
  {
    title: "Family Communication",
    desc: "Keep the circle of care transparent. Real-time updates and direct lines to local PA care coordinators."
  },
  {
    title: "Emergency Support",
    desc: "Standard operating protocols for power outages, weather delays, and personal health emergencies."
  },
  {
    title: "24/7 Availability",
    desc: "A live local coordinator answers the phone 24 hours a day, 7 days a week, resolving schedule changes instantly."
  }
];

const faqs = [
  {
    q: "How quickly can care start after I contact you?",
    a: "We understand that family needs can be urgent. After our free in-home consultation, we work quickly to compile the care plan, assign a caregiver match, and care can often begin within 48 to 72 hours."
  },
  {
    q: "Do you accept Medicaid Waiver programs in Pennsylvania?",
    a: "Yes. Blessed Hearts Homecare is approved to participate in PA Medicaid Waiver programs. We work closely with CHC plans and service coordinators to schedule authorized hours seamlessly."
  },
  {
    q: "How do you screen and select your caregivers?",
    a: "Every caregiver undergoes a rigorous screening process, including state-mandated criminal background checks, license verification, personal and professional reference checks, and a comprehensive orientation assessment."
  },
  {
    q: "Can we adjust the care schedule or services?",
    a: "Absolutely. Care schedules are highly flexible. If your loved one's needs change or doctors adjust recommendations, simply contact our coordinator and we will update the care plan."
  }
];

export default function ServicesClient({ initialService }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", county: "York", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setFormData({ name: "", phone: "", email: "", county: "York", message: "" });
  };

  // Smooth scroll handler
  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Effect to handle initial scroll to service
  useEffect(() => {
    if (initialService) {
      const el = document.getElementById(initialService);
      if (el) {
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [initialService]);

  // Framer Motion variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  return (
    <>
      {/* SECTION 1: Premium Hero */}
      <section className="services-hero-section" aria-label="Home Care Services Hero">
        <div className="container">
          <div className="services-hero-grid">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="services-hero-content"
            >
              <div className="services-hero-badge">
                <Sparkles size={12} /> HOME CARE SOLUTIONS
              </div>
              <h1 className="services-hero-title">
                Compassionate Home Care Services Designed Around Your Family
              </h1>
              <p className="services-hero-desc">
                Blessed Hearts Homecare provides professional, licensed in-home care, companion services, and memory care designed to help seniors live safely, comfortably, and independently.
              </p>
              <div className="services-hero-actions">
                <button 
                  onClick={() => handleScrollToSection("request-care")}
                  className="btn-luxury-lg btn-luxury-lg--primary"
                >
                  Request Care <ArrowRight size={16} />
                </button>
                <Link 
                  href="tel:2232609042"
                  className="btn-luxury-lg btn-luxury-lg--secondary"
                >
                  Call Today
                </Link>
              </div>
              <div className="services-hero-trust">
                <div className="services-hero-trust-item">
                  <ShieldCheck size={18} />
                  <span>Licensed &amp; Bonded</span>
                </div>
                <div className="services-hero-trust-item">
                  <Heart size={18} />
                  <span>Background Checked Caregivers</span>
                </div>
                <div className="services-hero-trust-item">
                  <Clock size={18} />
                  <span>24/7 Local Support</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="services-hero-media"
            >
              <div className="services-hero-image-wrapper">
                <Image
                  src="https://plus.unsplash.com/premium_photo-1681996583708-b7fca2e8ed2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZWNhcmV8ZW58MHwxfDB8fHww"
                  alt="Friendly caregiver smiling and supporting a senior client in a bright, modern living room"
                  fill
                  priority
                  className="services-hero-img"
                  sizes="(max-width: 64rem) 100vw, 45vw"
                />
              </div>

              {/* Floating review badge */}
              <div className="floating-review-badge animate-float">
                <div className="floating-review-badge__avatar" aria-hidden="true">BH</div>
                <div>
                  <div className="floating-review-badge__stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} fill="#FF7A1A" stroke="#FF7A1A" />
                    ))}
                  </div>
                  <h4 className="floating-review-badge__title">Client Trust Score</h4>
                  <p className="floating-review-badge__sub">5-Star Licensed Care</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Quick Service Navigation */}
      <section className="services-nav-section" aria-labelledby="nav-grid-heading">
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">SERVICE DIRECTORY</span>
            <h2 id="nav-grid-heading" className="section-title-luxury">Quick Service Navigation</h2>
            <p className="section-subtitle-luxury">
              Immediately discover our care offerings. Click any card below to scroll directly to the corresponding program details.
            </p>
            <div className="luxury-title-divider" />
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="services-nav-grid"
          >
            {servicesList.map((srv) => (
              <motion.button
                key={srv.id}
                variants={fadeInUp}
                onClick={() => handleScrollToSection(srv.id)}
                className="services-nav-card"
                aria-label={`Scroll to ${srv.title} details`}
              >
                <div className="services-nav-icon-circle">
                  {srv.icon}
                </div>
                <span>{srv.title}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Core Services */}
      <section className="core-services-section" aria-labelledby="core-heading">
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">COMPREHENSIVE CARE ARCHITECTURE</span>
            <h2 id="core-heading" className="section-title-luxury">Our Core Care Offerings</h2>
            <p className="section-subtitle-luxury">
              Every home care solution is carefully customized to match your family's routine, preferences, and clinical safety needs.
            </p>
            <div className="luxury-title-divider" />
          </div>

          <div className="core-services-list">
            {servicesList.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={service.id}
                  id={service.id}
                  className={`core-services-row ${isEven ? "" : "core-services-row--reversed"} ${service.class}`}
                >
                  {/* Left Column: Image wrapper with zoom */}
                  <div className="core-services-media">
                    <div className="core-services-image-box">
                      <Image
                        src={service.image}
                        alt={`Blessed Hearts Homecare caregiver delivering ${service.title}`}
                        fill
                        loading="lazy"
                        className="core-services-img"
                        sizes="(max-width: 64rem) 100vw, 45vw"
                      />
                    </div>
                    <div className="core-services-watermark" aria-hidden="true">
                      {service.watermark}
                    </div>
                  </div>

                  {/* Right Column: Content */}
                  <div className="core-services-content">
                    <div className="core-services-header-group">
                      <div className="core-services-icon-circle">
                        {service.icon}
                      </div>
                      <h3>{service.title}</h3>
                    </div>

                    <p className="core-services-desc">
                      {service.desc}
                    </p>

                    {/* Metadata blocks */}
                    <div className="core-services-meta-blocks">
                      <div className="core-meta-block">
                        <h4>Who Benefits</h4>
                        <p>{service.whoBenefits}</p>
                      </div>
                      <div className="core-meta-block core-meta-block--secondary">
                        <h4>Why Families Choose This</h4>
                        <p>{service.benefits}</p>
                      </div>
                    </div>

                    {/* Checklist group */}
                    <div className="core-checklist-group">
                      <h4 className="core-checklist-title">What's Included</h4>
                      <ul className="core-checklist">
                        {service.checklist.map((item, checklistIndex) => (
                          <li key={checklistIndex} className="core-checklist-item">
                            <CheckCircle2 size={14} aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Local micro-FAQ */}
                    <div className="core-micro-faq">
                      <h4 className="core-micro-faq-title">
                        <HelpCircle size={14} aria-hidden="true" /> {service.faqQuestion}
                      </h4>
                      <p className="core-micro-faq-desc">
                        {service.faqAnswer}
                      </p>
                    </div>

                    {/* CTA Actions */}
                    <div className="core-services-actions">
                      <button 
                        onClick={() => handleScrollToSection("request-care")}
                        className="btn-luxury-primary btn-luxury-cta"
                        style={{ padding: "0.85rem 2rem", fontSize: "0.9rem" }}
                      >
                        Request Care <ArrowRight size={14} />
                      </button>
                      <Link 
                        href="tel:2232609042"
                        className="btn-luxury-secondary btn-luxury-cta-sec"
                        style={{ padding: "0.85rem 2rem", fontSize: "0.9rem" }}
                      >
                        Call (223) 260-9042
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: Why Blessed Hearts is Different (Timeline) */}
      <section className="different-section" aria-labelledby="diff-heading">
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">OUR STANDARD OF EXCELLENCE</span>
            <h2 id="diff-heading" className="section-title-luxury">Why Blessed Hearts is Different</h2>
            <p className="section-subtitle-luxury">
              We coordinate care at a higher tier of accountability, safety assurance, and caregiver compliance.
            </p>
            <div className="luxury-title-divider" />
          </div>

          <div className="different-timeline">
            <div className="different-timeline-line" aria-hidden="true" />
            
            {differenceSteps.map((step, index) => (
              <div key={index} className="different-timeline-item">
                <div className="different-timeline-icon-circle" aria-hidden="true">
                  <ShieldCheck size={20} />
                </div>
                <div className="different-timeline-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Service Areas county Grid */}
      <ServiceAreasSearch />

      {/* SECTION 10: Google Reviews */}
      <Testimonials />

      {/* SECTION 9: Frequently Asked Questions */}
      <section className="section faq-section-luxury section--alt" aria-labelledby="faq-heading">
        <div className="container grid grid--2" style={{ gap: "4rem", alignItems: "center" }}>
          <div>
            <div className="section-heading-luxury" style={{ textAlign: "left", alignItems: "flex-start" }}>
              <span className="eyebrow-luxury-accent">QUESTIONS ANSWERED</span>
              <h2 id="faq-heading" className="section-title-luxury" style={{ marginLeft: 0 }}>Frequently Asked Questions</h2>
              <div className="luxury-title-divider" style={{ margin: "1rem 0 1.5rem 0" }} />
            </div>

            <div className="faq-accordions-luxury">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className={`faq-item-luxury ${isOpen ? "faq-item-luxury--open" : ""}`}>
                    <button 
                      className="faq-item-luxury__trigger" 
                      onClick={() => toggleFaq(i)}
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

          {/* Right Caregiver Image with backdrop blobs */}
          <div className="faq-media-luxury-container">
            <div className="faq-media-luxury">
              <div className="faq-media-luxury__blob" aria-hidden="true" />
              <div className="faq-media-luxury__image-wrapper">
                <Image
                  src="https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SG9tZWNhcmV8ZW58MHx8MHx8fDA%3D"
                  alt="Care coordinator smiling while consulting with senior client in a warm home"
                  fill
                  sizes="(max-width: 56rem) 100vw, 45vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: Schedule Consultation Split Form */}
      <section className="consultation-split-section" id="request-care" aria-labelledby="form-heading">
        <div className="container">
          <div className="consultation-split-grid">
            
            {/* Left: Brand Trust Indicators */}
            <div className="consultation-split-info">
              <span className="eyebrow-luxury-accent">SECURE PEACE OF MIND</span>
              <h2 id="form-heading">Schedule a Free Care Assessment</h2>
              <p className="lead">
                No obligations, no pressure. Our local PA Care Coordinator will contact you within 24 hours to clarify scheduling and match caregivers to your routines.
              </p>

              <div className="consultation-trust-stack">
                <div className="consultation-trust-row">
                  <div className="consultation-trust-icon-box" aria-hidden="true">
                    <CheckCircle size={18} />
                  </div>
                  <div className="consultation-trust-text">
                    <h4>No Obligation Consult</h4>
                    <p>We review health habits and evaluate fall risks in the home for free.</p>
                  </div>
                </div>

                <div className="consultation-trust-row">
                  <div className="consultation-trust-icon-box" aria-hidden="true">
                    <UserCheck size={18} />
                  </div>
                  <div className="consultation-trust-text">
                    <h4>Local Coordinators</h4>
                    <p>Talk to local professionals based directly in South Central Pennsylvania.</p>
                  </div>
                </div>

                <div className="consultation-trust-row">
                  <div className="consultation-trust-icon-box" aria-hidden="true">
                    <FileHeart size={18} />
                  </div>
                  <div className="consultation-trust-text">
                    <h4>Medicaid Waiver Approved</h4>
                    <p>We help match authorized hours to CHC programs seamlessly.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: The Form Card */}
            <div className="form-card-luxury" style={{ boxShadow: "0 20px 45px rgba(90, 26, 94, 0.05)" }}>
              {formSubmitted ? (
                <div className="form-success-luxury" style={{ padding: "4rem 2rem", textAlign: "center" }}>
                  <CheckCircle size={48} className="form-success__icon" style={{ color: "#28a745", marginBottom: "1rem" }} />
                  <h3 style={{ fontFamily: "var(--font-heading)", color: "var(--plum)", fontSize: "1.5rem", fontWeight: 750 }}>Assessment Scheduled!</h3>
                  <p style={{ fontFamily: "var(--font-body)", color: "#666", fontSize: "0.95rem", marginTop: "0.5rem" }}>
                    Thank you. We have received your details. Our local care coordinator will phone you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="appointment-form-luxury" noValidate>
                  <div className="form-grid-luxury">
                    <div className="field-luxury">
                      <label htmlFor="form-name" className="required">Full Name</label>
                      <input 
                        type="text" 
                        id="form-name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        placeholder="John Doe" 
                        required 
                      />
                    </div>

                    <div className="field-luxury">
                      <label htmlFor="form-phone" className="required">Phone Number</label>
                      <input 
                        type="tel" 
                        id="form-phone" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        placeholder="(555) 000-0000" 
                        required 
                      />
                    </div>

                    <div className="field-luxury">
                      <label htmlFor="form-email" className="required">Email Address</label>
                      <input 
                        type="email" 
                        id="form-email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        placeholder="name@example.com" 
                        required 
                      />
                    </div>

                    <div className="field-luxury">
                      <label htmlFor="form-county" className="required">County of Residence</label>
                      <select 
                        id="form-county" 
                        name="county" 
                        value={formData.county} 
                        onChange={handleInputChange}
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
                    </div>
                  </div>

                  <div className="field-luxury" style={{ marginTop: "1.25rem" }}>
                    <label htmlFor="form-message">Describe Your Loved One's Care Needs</label>
                    <textarea 
                      id="form-message" 
                      name="message" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      rows={4} 
                      placeholder="Provide any details about schedules, specific needs, or preferred timing..." 
                    />
                  </div>

                  <div className="form-footer-luxury" style={{ marginTop: "1.75rem" }}>
                    <button type="submit" className="btn-luxury-primary form-submit-btn" style={{ width: "100%" }}>
                      Schedule Free Consultation
                    </button>
                    <p className="form-privacy-notice" style={{ textAlign: "center", marginTop: "1rem" }}>
                      ✓ Your information is private, encrypted, and kept strictly confidential.
                    </p>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>


    </>
  );
}
