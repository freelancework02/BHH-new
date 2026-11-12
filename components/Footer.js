"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Printer, 
  ArrowRight,
  ShieldCheck,
  Heart
} from "lucide-react";
import Logo from "./Logo";
import { site } from "@/lib/site";
import { GoogleIconSVG } from "./GoogleReviews";

function FacebookIcon({ size = 16, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 16, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="footer-luxury-section">
      {/* Decorative ambient blobs */}
      <div className="footer-luxury-bg-blob" aria-hidden="true" />
      <div className="footer-luxury-bg-blob-2" aria-hidden="true" />

      {/* ====================================================
         2. MAIN FOOTER CONTENT
         ==================================================== */}
      <div className="footer-main-content">
        <div className="container">
          <div className="footer-grid">
            
            {/* Column 1: Brand & Socials */}
            <div className="footer-column footer-column--brand">
              <Logo variant="white" />
              <p className="footer-brand-story">
                Dedicated to enhancing the lives of seniors, veterans, and individuals with disabilities across PA with compassionate, professional in-home care.
              </p>
              
              {/* Social Media Circle Buttons */}
              <div className="footer-social-row">
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Facebook" title="Blessed Hearts on Facebook">
                  <FacebookIcon size={16} aria-hidden="true" />
                </a>
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Instagram" title="Blessed Hearts on Instagram">
                  <InstagramIcon size={16} aria-hidden="true" />
                </a>
                <a 
                  href={site.googleReviewUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-social-btn" 
                  aria-label="Google Business Profile & Reviews"
                  title="Google Business Profile & Reviews"
                >
                  <span style={{ width: 16, height: 16, display: "inline-flex", alignItems: "center", justifyContent: "center" }} aria-hidden="true">
                    <GoogleIconSVG />
                  </span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="footer-trust-badges">
                <span className="footer-trust-badge">
                  <ShieldCheck size={12} className="footer-trust-badge-check" aria-hidden="true" />
                  Licensed Agency
                </span>
                <span className="footer-trust-badge">
                  <ShieldCheck size={12} className="footer-trust-badge-check" aria-hidden="true" />
                  Fully Insured
                </span>
                <span className="footer-trust-badge">
                  <ShieldCheck size={12} className="footer-trust-badge-check" aria-hidden="true" />
                  Screened Caregivers
                </span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul className="footer-links-list">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/areas-we-serve">Areas We Serve</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/contact-us">Careers</Link></li>
                <li><Link href="/blogs">Blogs</Link></li>
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/terms-conditions">Terms & Conditions</Link></li>
                <li><Link href="/contact-us">Contact Us</Link></li>
              </ul>
            </div>

            {/* Column 3: Services */}
            <div className="footer-column">
              <h3>Our Services</h3>
              <ul className="footer-links-list">
                <li><Link href="/services#personal-care">Personal Care</Link></li>
                <li><Link href="/services#companion-care">Companion Care</Link></li>
                <li><Link href="/services#respite-care">Respite Care</Link></li>
                <li><Link href="/services#meal-prep">Meal Preparation</Link></li>
                <li><Link href="/services#transportation">Transportation</Link></li>
                <li><Link href="/services#housekeeping">Housekeeping Support</Link></li>
                <li><Link href="/services#dementia-care">Dementia Care</Link></li>
                <li><Link href="/services#veteran-care">Veteran Care</Link></li>
              </ul>
            </div>

            {/* Column 4: Contact Office (Reformatted as clean list matches Apple/Stripe layout) */}
            <div className="footer-column">
              <h3>Contact Office</h3>
              <ul className="footer-contact-list">
                <li>
                  <a href="https://maps.google.com/?q=1224+S+Queen+St+Suite+206+York+PA+17403" target="_blank" rel="noopener noreferrer" className="footer-contact-link-item">
                    <div className="footer-contact-icon">
                      <MapPin size={14} aria-hidden="true" />
                    </div>
                    <span>
                      1224 S Queen St, Suite 206<br />York, PA 17403
                    </span>
                  </a>
                </li>

                <li>
                  <a href={site.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="footer-contact-link-item">
                    <div className="footer-contact-icon">
                      <span style={{ width: 14, height: 14, display: "inline-flex", alignItems: "center", justifyContent: "center" }} aria-hidden="true">
                        <GoogleIconSVG />
                      </span>
                    </div>
                    <span>Google Reviews (4.9 ★)</span>
                  </a>
                </li>
                
                <li>
                  <a href="tel:+12232609042" className="footer-contact-link-item">
                    <div className="footer-contact-icon">
                      <Phone size={14} aria-hidden="true" />
                    </div>
                    <span>(223) 260-9042</span>
                  </a>
                </li>

                <li>
                  <div className="footer-contact-link-item">
                    <div className="footer-contact-icon">
                      <Printer size={14} aria-hidden="true" />
                    </div>
                    <span>Fax: (223) 210-3600</span>
                  </div>
                </li>

                <li>
                  <a href={`mailto:${site.email}`} className="footer-contact-link-item">
                    <div className="footer-contact-icon">
                      <Mail size={14} aria-hidden="true" />
                    </div>
                    <span className="footer-contact-email-text" style={{ wordBreak: "break-all", whiteSpace: "normal" }}>{site.email}</span>
                  </a>
                </li>

                <li>
                  <div className="footer-contact-link-item">
                    <div className="footer-contact-icon">
                      <Clock size={14} aria-hidden="true" />
                    </div>
                    <span>Mon - Fri: 9:00 AM - 5:00 PM</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 5: Service Areas */}
            <div className="footer-column">
              <h3>Service Areas</h3>
              <ul className="footer-links-list">
                <li><Link href="/areas-we-serve/york">York County</Link></li>
                <li><Link href="/areas-we-serve/adams">Adams County</Link></li>
                <li><Link href="/areas-we-serve/lancaster">Lancaster County</Link></li>
                <li><Link href="/areas-we-serve/dauphin">Dauphin County</Link></li>
                <li><Link href="/areas-we-serve/cumberland">Cumberland County</Link></li>
                <li><Link href="/areas-we-serve/lebanon">Lebanon County</Link></li>
                <li><Link href="/areas-we-serve/berks">Berks County</Link></li>
                <li><Link href="/areas-we-serve/lehigh">Lehigh County</Link></li>
              </ul>
              <Link href="/areas-we-serve" className="footer-view-all-link">
                View All Areas
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
         4. BOTTOM COPYRIGHT & LEGAL BAR
         ==================================================== */}
      <div className="footer-bottom-bar">
        <div className="container">
          <div className="footer-nondiscrimination">
            <p>
              Blessed Hearts Home Care Agency is an Equal Opportunity Employer and prohibits discrimination and harassment, of any kind, in all matters involving our patients and our employees. Blessed Hearts Home Care Agency does not condition, exclude or deny admission or treatment of any patient, nor assign personnel or facilities, based on race, color, age, religion, sexual orientation, political affiliations, national origin, citizenship status, creed, gender, marital status, medical condition, disability or handicap, or any other basis prohibited by federal, state or local law. Free language assistance and interpreter services are available for individuals with Limited English Proficiency (LEP). <Link href="/language-assistance" style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "3px" }}>Notice of Non-Discrimination &amp; Language Assistance</Link>.
            </p>
          </div>

          <div className="footer-bottom-flex">
            <div className="footer-copyright">
              <p>© {new Date().getFullYear()} {site.name}. All Rights Reserved.</p>
            </div>
            
            <div className="footer-legal-links">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <span className="footer-legal-dot" aria-hidden="true">•</span>
              <Link href="/terms-conditions">Terms & Conditions</Link>
              <span className="footer-legal-dot" aria-hidden="true">•</span>
              <Link href="/accessibility">Accessibility Statement</Link>
              <span className="footer-legal-dot" aria-hidden="true">•</span>
              <Link href="/language-assistance">Language Assistance (LEP)</Link>
              <span className="footer-legal-dot" aria-hidden="true">•</span>
              <button
                type="button"
                className="footer-cookie-btn"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("bhh-open-accessibility"));
                  }
                }}
                aria-label="Open Accessibility Toolbar and Settings"
              >
                Accessibility Tools
              </button>
              <span className="footer-legal-dot" aria-hidden="true">•</span>
              <button
                type="button"
                className="footer-cookie-btn"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("bhh-open-cookie-preferences"));
                  }
                }}
                aria-label="Cookie Preferences - Open Privacy Settings"
              >
                Cookie Preferences
              </button>
            </div>

            <div className="footer-signature">
              <p>Designed with <Heart size={10} className="footer-signature-heart animate-pulse" aria-hidden="true" /> by Blessed Hearts Homecare</p>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
