"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  Sliders,
  Check,
  X,
  Lock,
  BarChart3,
  Sparkles,
  Share2,
  ExternalLink,
} from "lucide-react";
import {
  telemetry,
  getSavedConsent,
  saveConsent,
} from "@/lib/telemetry";
import styles from "./CookieConsent.module.css";

export default function CookieConsent() {
  const pathname = usePathname();

  // Don't display cookie consent on admin dashboard
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const [hasLoaded, setHasLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  // Categories state
  const [categories, setCategories] = useState({
    necessary: true, // Always locked
    analytics: true,
    functional: true,
    marketing: false, // Default opt-out for US privacy (CCPA/CPRA)
  });
  const [doNotSellOptOut, setDoNotSellOptOut] = useState(false);

  const bannerRef = useRef(null);
  const modalRef = useRef(null);
  const triggerRef = useRef(null);

  // 1. Initialize Telemetry and Check Existing Consent on Client Mount
  useEffect(() => {
    setHasLoaded(true);
    telemetry.init();

    const saved = getSavedConsent();
    if (!saved) {
      // First visit: show consent banner
      setIsVisible(true);
    } else {
      setCategories({
        necessary: true,
        analytics: Boolean(saved.categories?.analytics),
        functional: Boolean(saved.categories?.functional),
        marketing: Boolean(saved.categories?.marketing),
      });
      setDoNotSellOptOut(Boolean(saved.doNotSellOptOut));
    }

    // Listen for custom open event (e.g. from Footer "Cookie Preferences" link)
    const handleOpenPref = () => {
      setIsModalOpen(true);
    };
    window.addEventListener("bhh-open-cookie-preferences", handleOpenPref);

    return () => {
      window.removeEventListener("bhh-open-cookie-preferences", handleOpenPref);
    };
  }, []);

  // 2. Track Page Changes
  useEffect(() => {
    if (pathname && typeof document !== "undefined") {
      telemetry.recordPageView(pathname, document.title);
    }
  }, [pathname]);

  // 3. Coordinate Dynamic Offset for Zero Overlap with Chatbot
  const updateChatbotOffset = useCallback(() => {
    if (typeof window === "undefined") return;

    // Only apply offset on screens <= 768px where banner docks at the bottom
    if (isVisible && window.innerWidth <= 768 && bannerRef.current) {
      const bannerHeight = bannerRef.current.offsetHeight || 165;
      document.documentElement.style.setProperty("--bhh-cookie-offset", `${bannerHeight + 12}px`);
    } else {
      document.documentElement.style.setProperty("--bhh-cookie-offset", "0px");
    }
  }, [isVisible]);

  useEffect(() => {
    updateChatbotOffset();

    const handleResize = () => {
      updateChatbotOffset();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (typeof document !== "undefined") {
        document.documentElement.style.setProperty("--bhh-cookie-offset", "0px");
      }
    };
  }, [updateChatbotOffset]);

  // 4. ADA Compliance: Focus Trap & Escape Key Listener for Preferences Modal
  useEffect(() => {
    if (!isModalOpen) return;

    const modalEl = modalRef.current;
    if (!modalEl) return;

    // Find all focusable elements inside modal
    const focusableElements = modalEl.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (firstElement) {
      firstElement.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsModalOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  // Actions
  const handleAcceptAll = () => {
    const updated = {
      status: "accepted",
      categories: { necessary: true, analytics: true, functional: true, marketing: true },
      doNotSellOptOut: false,
    };
    telemetry.updateConsent(updated);
    setCategories(updated.categories);
    setDoNotSellOptOut(false);
    setIsVisible(false);
    setIsModalOpen(false);
    setAnnouncement("All cookies and analytics accepted.");
  };

  const handleDeclineNonEssential = () => {
    const updated = {
      status: "declined",
      categories: { necessary: true, analytics: false, functional: false, marketing: false },
      doNotSellOptOut: true,
    };
    telemetry.updateConsent(updated);
    setCategories(updated.categories);
    setDoNotSellOptOut(true);
    setIsVisible(false);
    setIsModalOpen(false);
    setAnnouncement("Non-essential cookies declined. Strictly necessary cookies remain active.");
  };

  const handleOpenCustomize = (e) => {
    triggerRef.current = e?.currentTarget;
    setIsModalOpen(true);
  };

  const handleDoNotSellClick = (e) => {
    triggerRef.current = e?.currentTarget;
    setCategories((prev) => ({ ...prev, marketing: false }));
    setDoNotSellOptOut(true);
    setIsModalOpen(true);
  };

  const handleSaveCustomPreferences = () => {
    const updated = {
      status: "customized",
      categories: {
        necessary: true,
        analytics: Boolean(categories.analytics),
        functional: Boolean(categories.functional),
        marketing: Boolean(categories.marketing),
      },
      doNotSellOptOut: Boolean(doNotSellOptOut),
    };
    telemetry.updateConsent(updated);
    setIsVisible(false);
    setIsModalOpen(false);
    setAnnouncement("Your cookie preferences have been successfully saved.");
    triggerRef.current?.focus();
  };

  if (!hasLoaded) return null;

  return (
    <>
      {/* ADA Screen Reader Announcement Region */}
      <div className={styles.srOnly} aria-live="polite" role="status">
        {announcement}
      </div>

      {/* ====================================================
          1. PRIMARY COOKIE CONSENT BANNER (U.S. Law & ADA Compliant)
          ==================================================== */}
      {isVisible && (
        <aside
          ref={bannerRef}
          className={styles.bannerContainer}
          role="region"
          aria-label="Cookie consent and privacy notice"
          aria-describedby="bhh-cookie-description"
        >
          <div className={styles.bannerHeader}>
            <div className={styles.shieldIconWrap} aria-hidden="true">
              <Shield size={18} />
            </div>
            <h2 className={styles.bannerTitle}>Your Privacy Choices</h2>
          </div>

          <p id="bhh-cookie-description" className={styles.bannerText}>
            Blessed Hearts Homecare uses cookies and privacy-respecting analytics to evaluate website
            traffic and provide personalized care resources across Pennsylvania.
          </p>

          <div className={styles.bannerHighlights}>
            <span className={styles.highlightList}>Data Collected:</span> Pages visited, clicks,
            device/browser, approximate location & referral source (stored in secure analytics to understand traffic).
          </div>

          <div className={styles.legalRow}>
            <Link href="/privacy-policy" className={styles.legalLink}>
              Privacy Policy
            </Link>
            <span className={styles.dotSeparator} aria-hidden="true">•</span>
            <Link href="/terms-conditions" className={styles.legalLink}>
              Terms
            </Link>
            <span className={styles.dotSeparator} aria-hidden="true">•</span>
            <button
              type="button"
              className={styles.optOutButton}
              onClick={handleDoNotSellClick}
              aria-label="Do Not Sell or Share My Personal Info"
            >
              Do Not Sell or Share My Personal Info
            </button>
          </div>

          <div className={styles.actionButtons}>
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={handleAcceptAll}
              aria-label="Accept all cookies and analytics"
            >
              <Check size={16} aria-hidden="true" />
              Accept All
            </button>

            <button
              type="button"
              className={styles.btnSecondary}
              onClick={handleDeclineNonEssential}
              aria-label="Decline non-essential cookies and analytics"
            >
              <X size={16} aria-hidden="true" />
              Decline
            </button>

            <button
              type="button"
              className={styles.btnCustomize}
              onClick={handleOpenCustomize}
              aria-label="Customize Preferences - Manage Cookies"
            >
              <Sliders size={14} aria-hidden="true" />
              Customize Preferences
            </button>
          </div>
        </aside>
      )}

      {/* ====================================================
          2. PERSISTENT RE-OPEN BADGE (After banner dismissed)
          ==================================================== */}
      {!isVisible && (
        <button
          type="button"
          className={styles.reopenBadge}
          onClick={handleOpenCustomize}
          aria-label="Open Cookie and Privacy Preferences settings"
          title="Privacy Choices & Cookie Settings"
        >
          <Shield size={14} aria-hidden="true" />
          <span>Privacy Choices</span>
        </button>
      )}

      {/* ====================================================
          3. ADA & U.S. LAW COMPLIANT PREFERENCE MODAL
          ==================================================== */}
      {isModalOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsModalOpen(false);
              triggerRef.current?.focus();
            }
          }}
        >
          <div
            ref={modalRef}
            className={styles.modalCard}
            role="dialog"
            aria-modal="true"
            aria-labelledby="bhh-cookie-modal-title"
            aria-describedby="bhh-cookie-modal-desc"
          >
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleGroup}>
                <div className={styles.shieldIconWrap} aria-hidden="true">
                  <Shield size={20} />
                </div>
                <h2 id="bhh-cookie-modal-title" className={styles.modalTitle}>
                  Privacy & Cookie Settings
                </h2>
              </div>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => {
                  setIsModalOpen(false);
                  triggerRef.current?.focus();
                }}
                aria-label="Close cookie settings dialog"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Modal Body */}
            <div className={styles.modalBody}>
              <p id="bhh-cookie-modal-desc" className={styles.modalIntro}>
                Manage your preferences below. Blessed Hearts Homecare respects your right to privacy in
                compliance with the California Consumer Privacy Act (CCPA/CPRA), Virginia VCDPA, and federal standards.
              </p>

              <div className={styles.categoriesList}>
                {/* Category 1: Strictly Necessary */}
                <div className={styles.categoryCard}>
                  <div className={styles.categoryHeader}>
                    <div className={styles.categoryTitleWrap}>
                      <Lock size={16} color="#059669" aria-hidden="true" />
                      <h3 className={styles.categoryName}>Strictly Necessary Cookies</h3>
                    </div>
                    <span className={styles.alwaysActiveBadge}>Always Active</span>
                  </div>
                  <p className={styles.categoryDesc}>
                    Essential for secure website navigation, ADA accessibility compliance, inquiry form submission,
                    and core service functionality. These cookies cannot be turned off.
                  </p>
                </div>

                {/* Category 2: Analytics & Traffic Telemetry */}
                <div className={styles.categoryCard}>
                  <div className={styles.categoryHeader}>
                    <div className={styles.categoryTitleWrap}>
                      <BarChart3 size={16} color="#ff2d7a" aria-hidden="true" />
                      <h3 className={styles.categoryName}>Analytics & Traffic Insights</h3>
                    </div>
                    <label className={styles.switchWrap}>
                      <input
                        type="checkbox"
                        className={styles.switchInput}
                        checked={categories.analytics}
                        onChange={(e) =>
                          setCategories((prev) => ({ ...prev, analytics: e.target.checked }))
                        }
                        aria-label="Toggle Analytics and Traffic Insights"
                      />
                      <span className={styles.switchSlider} aria-hidden="true" />
                    </label>
                  </div>
                  <p className={styles.categoryDesc}>
                    Enables Blessed Hearts to understand how visitors engage with care services. Collects telemetry
                    including pages visited, click events, device specifications, referral sources, and approximate
                    regional location (PA counties).
                  </p>
                  <span className={styles.collectedDataPill}>
                    Stored in: BHH-cookie-consent database collection
                  </span>
                </div>

                {/* Category 3: Functional & Experience */}
                <div className={styles.categoryCard}>
                  <div className={styles.categoryHeader}>
                    <div className={styles.categoryTitleWrap}>
                      <Sparkles size={16} color="#ff7a1a" aria-hidden="true" />
                      <h3 className={styles.categoryName}>Functional & Experience</h3>
                    </div>
                    <label className={styles.switchWrap}>
                      <input
                        type="checkbox"
                        className={styles.switchInput}
                        checked={categories.functional}
                        onChange={(e) =>
                          setCategories((prev) => ({ ...prev, functional: e.target.checked }))
                        }
                        aria-label="Toggle Functional and Experience cookies"
                      />
                      <span className={styles.switchSlider} aria-hidden="true" />
                    </label>
                  </div>
                  <p className={styles.categoryDesc}>
                    Remembers your preferred county, contact preferences, and provides seamless continuity during
                    in-home care consultations.
                  </p>
                </div>

                {/* Category 4: Cross-Context Advertising / Do Not Sell */}
                <div className={styles.categoryCard}>
                  <div className={styles.categoryHeader}>
                    <div className={styles.categoryTitleWrap}>
                      <Share2 size={16} color="#5a1a5e" aria-hidden="true" />
                      <h3 className={styles.categoryName}>Marketing & Data Sharing (Do Not Sell)</h3>
                    </div>
                    <label className={styles.switchWrap}>
                      <input
                        type="checkbox"
                        className={styles.switchInput}
                        checked={categories.marketing && !doNotSellOptOut}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setCategories((prev) => ({ ...prev, marketing: checked }));
                          setDoNotSellOptOut(!checked);
                        }}
                        aria-label="Toggle Marketing and Data Sharing"
                      />
                      <span className={styles.switchSlider} aria-hidden="true" />
                    </label>
                  </div>
                  <p className={styles.categoryDesc}>
                    Controls third-party advertising cookies. Turning this OFF exercises your statutory right under
                    the California CCPA/CPRA to <strong>opt out of the sale or sharing</strong> of your personal data.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className={styles.modalFooter}>
              <Link href="/privacy-policy" className={styles.legalLink} target="_blank">
                Read our full Privacy Policy
                <ExternalLink size={12} style={{ display: "inline", marginLeft: 4 }} aria-hidden="true" />
              </Link>

              <div className={styles.modalFooterButtons}>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={handleDeclineNonEssential}
                  aria-label="Reject all non-essential cookies"
                >
                  Reject All
                </button>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={handleAcceptAll}
                  aria-label="Accept all categories"
                >
                  Accept All
                </button>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={handleSaveCustomPreferences}
                  aria-label="Save custom cookie preferences"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
