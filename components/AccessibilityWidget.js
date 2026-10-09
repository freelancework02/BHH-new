"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accessibility,
  Type,
  Contrast,
  RotateCcw,
  X,
  Check,
  MousePointer,
  Pause,
  Link2,
  BookOpen,
  AlignJustify,
  Heading,
  Ruler,
  Sun,
  Moon,
  Sparkles,
} from "lucide-react";
import styles from "./AccessibilityWidget.module.css";

const DEFAULT_SETTINGS = {
  fontSize: "normal", // "normal" | "medium" | "large" | "xlarge"
  contrast: "normal", // "normal" | "high" | "dark" | "grayscale"
  dyslexiaFont: false,
  highlightLinks: false,
  largeCursor: false,
  readingGuide: false,
  stopAnimations: false,
  lineHeight: false,
  bigTitles: false,
};

const STORAGE_KEY = "bhh_accessibility_settings";

export default function AccessibilityWidget() {
  const pathname = usePathname();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [announcement, setAnnouncement] = useState("");
  const [rulerY, setRulerY] = useState(150);

  const modalRef = useRef(null);
  const launcherRef = useRef(null);

  // 1. Calculate active options count
  const activeCount =
    (settings.fontSize !== "normal" ? 1 : 0) +
    (settings.contrast !== "normal" ? 1 : 0) +
    (settings.dyslexiaFont ? 1 : 0) +
    (settings.highlightLinks ? 1 : 0) +
    (settings.largeCursor ? 1 : 0) +
    (settings.readingGuide ? 1 : 0) +
    (settings.stopAnimations ? 1 : 0) +
    (settings.lineHeight ? 1 : 0) +
    (settings.bigTitles ? 1 : 0);

  // 2. Apply settings to the DOM html element
  const applySettingsToDOM = useCallback((current) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    if (current.fontSize && current.fontSize !== "normal") {
      root.setAttribute("data-a11y-font-size", current.fontSize);
    } else {
      root.removeAttribute("data-a11y-font-size");
    }

    if (current.contrast && current.contrast !== "normal") {
      root.setAttribute("data-a11y-contrast", current.contrast);
    } else {
      root.removeAttribute("data-a11y-contrast");
    }

    if (current.dyslexiaFont) {
      root.setAttribute("data-a11y-dyslexia", "true");
    } else {
      root.removeAttribute("data-a11y-dyslexia");
    }

    if (current.highlightLinks) {
      root.setAttribute("data-a11y-highlight-links", "true");
    } else {
      root.removeAttribute("data-a11y-highlight-links");
    }

    if (current.largeCursor) {
      root.setAttribute("data-a11y-large-cursor", "true");
    } else {
      root.removeAttribute("data-a11y-large-cursor");
    }

    if (current.readingGuide) {
      root.setAttribute("data-a11y-reading-guide", "true");
    } else {
      root.removeAttribute("data-a11y-reading-guide");
    }

    if (current.stopAnimations) {
      root.setAttribute("data-a11y-animations", "paused");
    } else {
      root.removeAttribute("data-a11y-animations");
    }

    if (current.lineHeight) {
      root.setAttribute("data-a11y-line-height", "loose");
    } else {
      root.removeAttribute("data-a11y-line-height");
    }

    if (current.bigTitles) {
      root.setAttribute("data-a11y-big-titles", "true");
    } else {
      root.removeAttribute("data-a11y-big-titles");
    }
  }, []);

  // 3. Mount: Read from localStorage & setup global listeners
  useEffect(() => {
    setHasLoaded(true);

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const merged = { ...DEFAULT_SETTINGS, ...parsed };
        setSettings(merged);
        applySettingsToDOM(merged);
      }
    } catch {
      // localStorage may fail in restricted/private contexts
    }

    // Global event listener to trigger widget from Footer, Header, or other links
    const handleOpenA11y = () => {
      setIsOpen(true);
    };
    window.addEventListener("bhh-open-accessibility", handleOpenA11y);

    // Global keyboard shortcut: Alt + A or Option + A
    const handleKeyDown = (e) => {
      if (e.altKey && (e.key === "a" || e.key === "A")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("bhh-open-accessibility", handleOpenA11y);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [applySettingsToDOM]);

  // 4. Update DOM and localStorage whenever settings change
  const updateSettings = (updater, announceText) => {
    setSettings((prev) => {
      const next = typeof updater === "function" ? updater(prev) : { ...prev, ...updater };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore quota/private mode errors
      }
      applySettingsToDOM(next);
      return next;
    });

    if (announceText) {
      setAnnouncement(announceText);
    }
  };

  // 5. Reset all settings
  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    applySettingsToDOM(DEFAULT_SETTINGS);
    setAnnouncement("All accessibility settings have been reset to default.");
  };

  // 6. Reading Guide Mouse Move tracker
  useEffect(() => {
    if (!settings.readingGuide) return;

    const handleMouseMove = (e) => {
      setRulerY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [settings.readingGuide]);

  // 7. Focus trap & Escape key handling when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        launcherRef.current?.focus();
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const displayActiveCount = hasLoaded ? activeCount : 0;

  return (
    <>
      {/* 1. Floating Launcher Button */}
      <div className={styles.widgetContainer} data-a11y-isolated="true">
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={styles.launcherBtn}
          aria-label="Accessibility Settings Menu - Customize text size, contrast, and reading display"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          title="Accessibility Menu (Alt + A)"
        >
          <div className={styles.launcherIconWrap}>
            <Accessibility size={20} aria-hidden="true" />
          </div>
          <span className={styles.launcherText}>Accessibility</span>
          {displayActiveCount > 0 && (
            <span
              className={styles.activeBadgeDot}
              aria-label={`${displayActiveCount} accessibility adjustment${displayActiveCount > 1 ? "s" : ""} active`}
              title={`${displayActiveCount} active settings`}
            >
              {displayActiveCount}
            </span>
          )}
        </button>
      </div>

      {/* 2. Reading Guide Ruler (Visual Guide) */}
      {settings.readingGuide && (
        <div
          className={styles.readingRuler}
          style={{ top: `${rulerY}px` }}
          aria-hidden="true"
        />
      )}

      {/* 3. Screen Reader Live Region for Announcements */}
      <div role="status" aria-live="polite" className={styles.srOnly}>
        {announcement}
      </div>

      {/* 4. Accessibility Modal Dialog */}
      {isOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false);
              launcherRef.current?.focus();
            }
          }}
          data-a11y-isolated="true"
        >
          <div
            ref={modalRef}
            className={styles.modalWindow}
            role="dialog"
            aria-modal="true"
            aria-labelledby="a11y-modal-title"
          >
            {/* Header */}
            <header className={styles.modalHeader}>
              <div className={styles.modalHeaderTitleWrap}>
                <div className={styles.modalHeaderIcon} aria-hidden="true">
                  <Accessibility size={20} />
                </div>
                <div>
                  <h2 id="a11y-modal-title" className={styles.modalTitle}>
                    Accessibility Tools
                  </h2>
                  <p className={styles.modalSubtitle}>
                    ADA & WCAG 2.1 Display Adjustments
                  </p>
                </div>
              </div>

              <div className={styles.modalHeaderActions}>
                <button
                  type="button"
                  onClick={handleReset}
                  className={styles.headerActionBtn}
                  aria-label="Reset all accessibility settings to default"
                  title="Reset all settings to default"
                >
                  <RotateCcw size={13} aria-hidden="true" />
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    launcherRef.current?.focus();
                  }}
                  className={styles.closeBtn}
                  aria-label="Close accessibility menu"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
            </header>

            {/* Scrollable Body Controls */}
            <div className={styles.modalBody}>
              {/* Category 1: Font Size */}
              <section className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionLabel}>Text Size (Zoom)</h3>
                </div>
                <div className={styles.segmentedGroup} role="group" aria-label="Text size options">
                  {[
                    { id: "normal", label: "100%", sub: "Default" },
                    { id: "medium", label: "115%", sub: "Medium" },
                    { id: "large", label: "130%", sub: "Large" },
                    { id: "xlarge", label: "145%", sub: "X-Large" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        updateSettings(
                          { fontSize: opt.id },
                          `Text size adjusted to ${opt.label} (${opt.sub})`
                        )
                      }
                      className={`${styles.segmentBtn} ${
                        settings.fontSize === opt.id ? styles.segmentBtnActive : ""
                      }`}
                      aria-pressed={settings.fontSize === opt.id}
                    >
                      <span>{opt.label}</span>
                      <span className={styles.segmentSub}>{opt.sub}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Category 2: Color & Contrast */}
              <section className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionLabel}>Color & Contrast</h3>
                </div>
                <div className={styles.contrastGrid} role="group" aria-label="Contrast options">
                  <button
                    type="button"
                    onClick={() => updateSettings({ contrast: "normal" }, "Default colors restored")}
                    className={`${styles.contrastBtn} ${
                      settings.contrast === "normal" ? styles.contrastBtnActive : ""
                    }`}
                    aria-pressed={settings.contrast === "normal"}
                  >
                    <div className={styles.contrastIcon}>
                      <Sun size={14} aria-hidden="true" />
                    </div>
                    <span>Default Colors</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => updateSettings({ contrast: "high" }, "High contrast mode enabled")}
                    className={`${styles.contrastBtn} ${
                      settings.contrast === "high" ? styles.contrastBtnActive : ""
                    }`}
                    aria-pressed={settings.contrast === "high"}
                  >
                    <div className={styles.contrastIcon}>
                      <Contrast size={14} aria-hidden="true" />
                    </div>
                    <span>High Contrast</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => updateSettings({ contrast: "dark" }, "Dark invert contrast enabled")}
                    className={`${styles.contrastBtn} ${
                      settings.contrast === "dark" ? styles.contrastBtnActive : ""
                    }`}
                    aria-pressed={settings.contrast === "dark"}
                  >
                    <div className={styles.contrastIcon}>
                      <Moon size={14} aria-hidden="true" />
                    </div>
                    <span>Dark / Invert</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => updateSettings({ contrast: "grayscale" }, "Monochrome grayscale mode enabled")}
                    className={`${styles.contrastBtn} ${
                      settings.contrast === "grayscale" ? styles.contrastBtnActive : ""
                    }`}
                    aria-pressed={settings.contrast === "grayscale"}
                  >
                    <div className={styles.contrastIcon}>
                      <Sparkles size={14} aria-hidden="true" />
                    </div>
                    <span>Monochrome</span>
                  </button>
                </div>
              </section>

              {/* Category 3: Readability & Dyslexia */}
              <section className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionLabel}>Typography & Content</h3>
                </div>
                <div className={styles.featureGrid}>
                  {/* Dyslexia Font */}
                  <button
                    type="button"
                    onClick={() =>
                      updateSettings(
                        (prev) => ({ dyslexiaFont: !prev.dyslexiaFont }),
                        !settings.dyslexiaFont ? "Dyslexia-friendly font enabled" : "Dyslexia font disabled"
                      )
                    }
                    className={`${styles.toggleCard} ${
                      settings.dyslexiaFont ? styles.toggleCardActive : ""
                    }`}
                    aria-pressed={settings.dyslexiaFont}
                  >
                    <div className={styles.toggleCardTop}>
                      <div className={styles.cardIconWrap}>
                        <BookOpen size={16} aria-hidden="true" />
                      </div>
                      <span className={styles.statusPill}>
                        {settings.dyslexiaFont ? "ON" : "OFF"}
                      </span>
                    </div>
                    <span className={styles.cardLabel}>Dyslexia Font</span>
                  </button>

                  {/* Highlight Links */}
                  <button
                    type="button"
                    onClick={() =>
                      updateSettings(
                        (prev) => ({ highlightLinks: !prev.highlightLinks }),
                        !settings.highlightLinks ? "Highlight links enabled" : "Highlight links disabled"
                      )
                    }
                    className={`${styles.toggleCard} ${
                      settings.highlightLinks ? styles.toggleCardActive : ""
                    }`}
                    aria-pressed={settings.highlightLinks}
                  >
                    <div className={styles.toggleCardTop}>
                      <div className={styles.cardIconWrap}>
                        <Link2 size={16} aria-hidden="true" />
                      </div>
                      <span className={styles.statusPill}>
                        {settings.highlightLinks ? "ON" : "OFF"}
                      </span>
                    </div>
                    <span className={styles.cardLabel}>Highlight Links</span>
                  </button>

                  {/* Increased Line Spacing */}
                  <button
                    type="button"
                    onClick={() =>
                      updateSettings(
                        (prev) => ({ lineHeight: !prev.lineHeight }),
                        !settings.lineHeight ? "Generous line spacing enabled" : "Line spacing restored"
                      )
                    }
                    className={`${styles.toggleCard} ${
                      settings.lineHeight ? styles.toggleCardActive : ""
                    }`}
                    aria-pressed={settings.lineHeight}
                  >
                    <div className={styles.toggleCardTop}>
                      <div className={styles.cardIconWrap}>
                        <AlignJustify size={16} aria-hidden="true" />
                      </div>
                      <span className={styles.statusPill}>
                        {settings.lineHeight ? "ON" : "OFF"}
                      </span>
                    </div>
                    <span className={styles.cardLabel}>Line Spacing</span>
                  </button>

                  {/* Enlarge Headings */}
                  <button
                    type="button"
                    onClick={() =>
                      updateSettings(
                        (prev) => ({ bigTitles: !prev.bigTitles }),
                        !settings.bigTitles ? "Enlarged headings enabled" : "Heading sizes restored"
                      )
                    }
                    className={`${styles.toggleCard} ${
                      settings.bigTitles ? styles.toggleCardActive : ""
                    }`}
                    aria-pressed={settings.bigTitles}
                  >
                    <div className={styles.toggleCardTop}>
                      <div className={styles.cardIconWrap}>
                        <Heading size={16} aria-hidden="true" />
                      </div>
                      <span className={styles.statusPill}>
                        {settings.bigTitles ? "ON" : "OFF"}
                      </span>
                    </div>
                    <span className={styles.cardLabel}>Big Headings</span>
                  </button>
                </div>
              </section>

              {/* Category 4: Focus & Assistive Tools */}
              <section className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionLabel}>Focus & Visual Aids</h3>
                </div>
                <div className={styles.featureGrid}>
                  {/* Reading Guide */}
                  <button
                    type="button"
                    onClick={() =>
                      updateSettings(
                        (prev) => ({ readingGuide: !prev.readingGuide }),
                        !settings.readingGuide ? "Reading guide ruler enabled" : "Reading guide ruler disabled"
                      )
                    }
                    className={`${styles.toggleCard} ${
                      settings.readingGuide ? styles.toggleCardActive : ""
                    }`}
                    aria-pressed={settings.readingGuide}
                  >
                    <div className={styles.toggleCardTop}>
                      <div className={styles.cardIconWrap}>
                        <Ruler size={16} aria-hidden="true" />
                      </div>
                      <span className={styles.statusPill}>
                        {settings.readingGuide ? "ON" : "OFF"}
                      </span>
                    </div>
                    <span className={styles.cardLabel}>Reading Guide</span>
                  </button>

                  {/* Large High-Visibility Cursor */}
                  <button
                    type="button"
                    onClick={() =>
                      updateSettings(
                        (prev) => ({ largeCursor: !prev.largeCursor }),
                        !settings.largeCursor ? "Large cursor enabled" : "Cursor size restored"
                      )
                    }
                    className={`${styles.toggleCard} ${
                      settings.largeCursor ? styles.toggleCardActive : ""
                    }`}
                    aria-pressed={settings.largeCursor}
                  >
                    <div className={styles.toggleCardTop}>
                      <div className={styles.cardIconWrap}>
                        <MousePointer size={16} aria-hidden="true" />
                      </div>
                      <span className={styles.statusPill}>
                        {settings.largeCursor ? "ON" : "OFF"}
                      </span>
                    </div>
                    <span className={styles.cardLabel}>Large Cursor</span>
                  </button>

                  {/* Stop Animations */}
                  <button
                    type="button"
                    onClick={() =>
                      updateSettings(
                        (prev) => ({ stopAnimations: !prev.stopAnimations }),
                        !settings.stopAnimations ? "Animations and motion paused" : "Animations resumed"
                      )
                    }
                    className={`${styles.toggleCard} ${
                      settings.stopAnimations ? styles.toggleCardActive : ""
                    }`}
                    aria-pressed={settings.stopAnimations}
                  >
                    <div className={styles.toggleCardTop}>
                      <div className={styles.cardIconWrap}>
                        <Pause size={16} aria-hidden="true" />
                      </div>
                      <span className={styles.statusPill}>
                        {settings.stopAnimations ? "ON" : "OFF"}
                      </span>
                    </div>
                    <span className={styles.cardLabel}>Pause Motion</span>
                  </button>

                  {/* Quick Reset Card */}
                  <button
                    type="button"
                    onClick={handleReset}
                    className={styles.toggleCard}
                    aria-label="Reset all preferences"
                  >
                    <div className={styles.toggleCardTop}>
                      <div className={styles.cardIconWrap}>
                        <RotateCcw size={16} aria-hidden="true" />
                      </div>
                      <span className={styles.statusPill}>RESET</span>
                    </div>
                    <span className={styles.cardLabel}>Reset All</span>
                  </button>
                </div>
              </section>
            </div>

            {/* Footer */}
            <footer className={styles.modalFooter}>
              <Link
                href="/accessibility"
                className={styles.footerStatementLink}
                onClick={() => setIsOpen(false)}
              >
                Accessibility Statement
              </Link>
              <div className={styles.footerShortcutNote}>
                <span>Shortcut:</span>
                <kbd className={styles.keyKbd}>Alt</kbd> + <kbd className={styles.keyKbd}>A</kbd>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
