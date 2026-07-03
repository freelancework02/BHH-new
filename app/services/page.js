"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
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
  ArrowRight
} from "lucide-react";

const whyUsCards = [
  {
    icon: <Heart className="why-us-card__icon" />,
    title: "Compassionate Matches",
    desc: "We thoughtfully pair our clients with background-checked caregivers based on personality and specialized needs."
  },
  {
    icon: <ShieldCheck className="why-us-card__icon" />,
    title: "Licensed & Insured",
    desc: "Blessed Hearts Homecare is fully licensed by the Pennsylvania Department of Health, insured, and bonded."
  },
  {
    icon: <Clock className="why-us-card__icon" />,
    title: "24/7 Availability",
    desc: "Our local York, PA care coordinators are on call 24 hours a day, 7 days a week, to handle any schedule shifts."
  },
  {
    icon: <Sparkles className="why-us-card__icon" />,
    title: "Customized Care Plans",
    desc: "We build tailored plans that support safety, independence, and comfort, adjusting hours as needs evolve."
  }
];

const mainServices = [
  {
    title: "Personal Care",
    desc: "Respectful, professional assistance with daily activities to support dignity and safety at home. We help with bathing, grooming, dressing, toileting, and mobility support.",
    image: "/images/hero-caregiver.png",
    watermark: "PC"
  },
  {
    title: "Companion Care",
    desc: "Engaging conversations, mental exercises, and active companionship to combat isolation. We share stories, play board games, assist with hobbies, and accompany clients on walks.",
    image: "/images/caregiver-client-warm.png",
    watermark: "CC"
  },
  {
    title: "Light Housekeeping",
    desc: "Maintaining a tidy, hygienic home environment to reduce falls and improve wellness. We handle laundry, wash dishes, dust surfaces, take out trash, and organize living spaces.",
    image: "/images/caregiver-kitchen.png",
    watermark: "LH"
  },
  {
    title: "Meal Preparation",
    desc: "Nutritious and delicious home-cooked meals tailored to client dietary requirements. We plan recipes, prepare ingredients, cook warm dishes, and assist with grocery shopping lists.",
    image: "/images/caregiver-kitchen.png",
    watermark: "MP"
  },
  {
    title: "Medication Reminders",
    desc: "Peace of mind for families knowing medication schedules are followed accurately. Our caregivers provide timely verbal reminders and help verify clients take their doses safely.",
    image: "/images/caregiver-client-warm.png",
    watermark: "MR"
  },
  {
    title: "Transportation Support",
    desc: "Helping clients stay active in their York community. We provide safe accompanied rides to medical appointments, local grocery markets, pharmacies, and social visits.",
    image: "/images/caregiver-meeting.png",
    watermark: "TS"
  },
  {
    title: "Respite Care",
    desc: "Crucial temporary coverage for family caregivers, allowing them to rest, travel, or work. We step in with reliable care, giving you complete reassurance while you recharge.",
    image: "/images/caregiver-meeting.png",
    watermark: "RC"
  },
  {
    title: "Alzheimer's & Dementia Care",
    desc: "Specially-trained caregivers who provide a stable routine, sensory stimulation, memory games, and patient communication to help manage memory loss safely and calmly.",
    image: "/images/caregiver-client-warm.png",
    watermark: "AD"
  }
];

const specializedCare = [
  {
    title: "Veteran Care",
    desc: "Honoring our nation's heroes by providing dedicated in-home support funded through VA benefits and programs."
  },
  {
    title: "Disability Support",
    desc: "Helping adults and children with developmental or physical disabilities live confidently and independently."
  },
  {
    title: "24-Hour & Live-In Care",
    desc: "Continuous around-the-clock monitoring and support, ensuring someone is always present to guarantee client safety."
  },
  {
    title: "Hospice Support",
    desc: "Providing gentle, comfort-focused respite and personal care to complement your primary medical hospice teams."
  }
];

const counties = [
  { name: "York County", desc: "Our main headquarters serving York, Hanover, Red Lion, Dallastown, and Shrewsbury." },
  { name: "Lancaster County", desc: "Home care support serving Lancaster, Columbia, Millersville, and surrounding boroughs." },
  { name: "Adams County", desc: "Compassionate services serving Gettysburg, Littlestown, and East Berlin." },
  { name: "Cumberland County", desc: "Personal care serving Carlisle, Mechanicsburg, and Camp Hill." },
  { name: "Dauphin County", desc: "Dedicated caregivers serving Harrisburg, Hershey, and Middletown." }
];

const timelineSteps = [
  {
    num: "01",
    icon: <Calendar className="timeline-step__icon" />,
    title: "Contact Us",
    body: "Call our local care team or submit our online form to schedule your initial consultation."
  },
  {
    num: "02",
    icon: <FileText className="timeline-step__icon" />,
    title: "Free In-Home Assessment",
    body: "A care coordinator visits your home to assess routines, environment, and specific care goals."
  },
  {
    num: "03",
    icon: <UserCheck className="timeline-step__icon" />,
    title: "Personalized Care Plan",
    body: "We customize a care plan mapping out caregiver schedules, task priorities, and nursing requirements."
  },
  {
    num: "04",
    icon: <CheckCircle className="timeline-step__icon" />,
    title: "Care Begins",
    body: "We introduce you to your matched caregiver and initiate care, checking in regularly for quality assurance."
  }
];

const googleReviews = [
  {
    author: "Sarah J.",
    location: "York, PA",
    stars: 5,
    body: "Blessed Hearts has been a lifesaver for my mother. The caregivers are professional, gentle, and treat her like family. Highly recommend them."
  },
  {
    author: "Robert M.",
    location: "Hanover, PA",
    stars: 5,
    body: "The 24/7 on-call coordinator was so helpful when my father's discharge schedule changed. The caregiver was on time, very caring, and well-trained."
  },
  {
    author: "Emily D.",
    location: "Red Lion, PA",
    stars: 5,
    body: "Extremely reliable respite care. It gives me complete peace of mind to run errands knowing my husband is safe and comfortable."
  }
];

const faqs = [
  {
    q: "How quickly can care start after I contact you?",
    a: "We understand that family needs can be urgent. After our free in-home consultation, we work quickly to compile the care plan, assign a caregiver match, and care can often begin within 48 to 72 hours."
  },
  {
    q: "Do you accept Medicaid Waiver programs in Pennsylvania?",
    a: "Yes. Blessed Hearts Homecare is approved to participate in PA Medicaid Waiver programs. We work closely with caseworkers to make sure authorized hours are scheduled seamlessly."
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

export default function ServicesPage() {
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

  return (
    <>
      <PageHero
        variant="services"
        eyebrow="HOME CARE SOLUTIONS"
        title="Home Care Services Designed Around Your Family"
        description="Blessed Hearts Homecare provides professional, compassionate non-medical home care services, companion care, and respite care designed to help seniors live safely and independently at home."
        mediaLabel="A friendly caregiver interacting with a senior client in a modern home"
        imageSrc="/images/hero-caregiver.png"
      />

      {/* Section 2: Why Families Choose Us */}
      <section className="section why-us-luxury" aria-labelledby="why-us-heading">
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">THE BLESSED HEARTS PROMISE</span>
            <h2 id="why-us-heading" className="section-title-luxury">Why Families Choose Us</h2>
          </div>

          <div className="why-us-grid-luxury">
            {whyUsCards.map((card, i) => (
              <div key={i} className="why-us-card-luxury">
                <div className="why-us-card__icon-wrapper">
                  {card.icon}
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Signature How We Help Alternating List */}
      <section className="section services-alternating" aria-labelledby="alternating-heading">
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">OUR COMPREHENSIVE SOLUTIONS</span>
            <h2 id="alternating-heading" className="section-title-luxury">How We Help You Live Well At Home</h2>
            <p className="section-subtitle-luxury">
              Every home care plan is custom-designed around your daily routines, hobbies, and personal health goals.
            </p>
          </div>

          <div className="alternating-list-luxury">
            {mainServices.map((service, i) => {
              const isEven = i % 2 === 0;
              return (
                <div 
                  key={i} 
                  className={`service-row-luxury ${isEven ? "" : "service-row-luxury--reversed"}`}
                >
                  {/* Left Column: Image wrapper with zoom & shadow */}
                  <div className="service-row-luxury__media">
                    <div className="service-row-luxury__image-container">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 56rem) 100vw, 45vw"
                        className="service-row-luxury__img"
                      />
                    </div>
                  </div>

                  {/* Right Column: Content card with watermark & custom badges */}
                  <div className="service-row-luxury__content">
                    <div className="service-row-luxury__card">
                      <div className="service-row-luxury__watermark" aria-hidden="true">
                        {service.watermark}
                      </div>
                      <h3>{service.title}</h3>
                      <p>{service.desc}</p>
                      
                      <div className="service-row-luxury__buttons">
                        <Link href="/contact-us" className="btn-luxury-primary-small">
                          Request Care
                          <ArrowRight size={14} className="service-btn-arrow" />
                        </Link>
                        <Link href="/about" className="btn-luxury-secondary-small">
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid: Specialized Care Programs */}
      <section className="section specialized-grid-section section--alt" aria-labelledby="specialized-heading">
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">TAILORED SUPPORT PLANS</span>
            <h2 id="specialized-heading" className="section-title-luxury">Specialized Care Programs</h2>
          </div>

          <div className="specialized-grid-luxury">
            {specializedCare.map((care, i) => (
              <div key={i} className="specialized-card-luxury">
                <div className="specialized-card__badge" aria-hidden="true">Specialty</div>
                <h3>{care.title}</h3>
                <p>{care.desc}</p>
                <Link href="/contact-us" className="specialized-card__link">
                  Consult a Specialist <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Service Areas county Grid */}
      <section className="section service-areas-luxury" aria-labelledby="areas-heading">
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">OUR PENNSYLVANIA REACH</span>
            <h2 id="areas-heading" className="section-title-luxury">Service Areas We Support</h2>
            <p className="section-subtitle-luxury">
              Providing licensed in-home care services across South Central Pennsylvania.
            </p>
          </div>

          <div className="areas-grid-luxury">
            {counties.map((county, i) => (
              <div key={i} className="area-card-luxury">
                <div className="area-card__pin" aria-hidden="true">PA</div>
                <h3>{county.name}</h3>
                <p>{county.desc}</p>
                <Link href="/areas-we-serve" className="area-card__link">
                  View Service Coverage <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Simple Process Timeline */}
      <section className="section timeline-section-luxury section--alt" aria-labelledby="process-heading">
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">FOUR STEP ROUTE</span>
            <h2 id="process-heading" className="section-title-luxury">Getting Started Is Simple</h2>
          </div>

          <div className="timeline-wrapper-luxury">
            <div className="timeline-line-luxury" aria-hidden="true" />
            <div className="timeline-grid-luxury">
              {timelineSteps.map((step, i) => (
                <div key={i} className="timeline-step-luxury">
                  <div className="timeline-step__badge">
                    <span className="timeline-step__number">{step.num}</span>
                    {step.icon}
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Testimonials Google style reviews */}
      <section className="section reviews-section-luxury" aria-labelledby="reviews-heading">
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">VERIFIED RECOMMENDATIONS</span>
            <h2 id="reviews-heading" className="section-title-luxury">Customer Reviews</h2>
          </div>

          <div className="reviews-carousel-luxury">
            {googleReviews.map((rev, i) => (
              <div key={i} className="review-card-luxury">
                <div className="review-card__header">
                  <div className="review-card__avatar" aria-hidden="true">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <h4>{rev.author}</h4>
                    <p>{rev.location}</p>
                  </div>
                </div>
                <div className="review-card__stars">
                  {[...Array(rev.stars)].map((_, starIndex) => (
                    <Star key={starIndex} size={14} fill="#FF7A1A" stroke="#FF7A1A" />
                  ))}
                </div>
                <p className="review-card__body">"{rev.body}"</p>
                <div className="review-card__badge" aria-hidden="true">Verified Google Review</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Frequently Asked Questions accordions */}
      <section className="section faq-section-luxury section--alt" aria-labelledby="faq-heading">
        <div className="container grid grid--2" style={{ gap: "4rem", alignItems: "center" }}>
          <div>
            <div className="section-heading-luxury" style={{ textAlign: "left", alignItems: "flex-start" }}>
              <span className="eyebrow-luxury-accent">QUESTIONS ANSWERED</span>
              <h2 id="faq-heading" className="section-title-luxury" style={{ marginLeft: 0 }}>Frequently Asked Questions</h2>
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
                    <div className="faq-item-luxury__panel">
                      <p>{faq.a}</p>
                    </div>
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
                  src="/images/caregiver-meeting.png"
                  alt="Care coordinator smiling while consulting with senior client"
                  fill
                  sizes="(max-width: 56rem) 100vw, 45vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Contact appointment form */}
      <section className="section contact-form-section-luxury" id="request-care" aria-labelledby="form-heading">
        <div className="container" style={{ maxWidth: "56rem" }}>
          <div className="form-card-luxury">
            <div className="section-heading-luxury">
              <span className="eyebrow-luxury-accent">START INDEPENDENCE TODAY</span>
              <h2 id="form-heading" className="section-title-luxury">Schedule an Appointment</h2>
              <p className="section-subtitle-luxury">
                Submit your contact information and our Care Coordinator will call you within 24 hours to schedule your free consultation.
              </p>
            </div>

            {formSubmitted ? (
              <div className="form-success-luxury">
                <CheckCircle size={48} className="form-success__icon" />
                <h3>Thank You!</h3>
                <p>Your request has been received. Our Care Coordinator will call you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="appointment-form-luxury">
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
                    placeholder="Provide any details about schedule preferences, medical support needed, or timing..." 
                  />
                </div>

                <div className="form-footer-luxury">
                  <button type="submit" className="btn-luxury-primary form-submit-btn">
                    Schedule Free Consultation
                  </button>
                  <p className="form-privacy-notice">
                    ✓ By submitting, you agree to our privacy policy. Your data is kept strictly confidential.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
