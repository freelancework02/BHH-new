"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { Globe, ChevronDown, Check } from "lucide-react";
import styles from "./LanguageSwitcher.module.css";

const COOKIE_NAME = "googtrans";

// Helper to get cookie value
function getCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
  return match ? decodeURIComponent(match[3]) : null;
}

// Helper to set cookie across paths and subdomains
function setLanguageCookies(lang) {
  if (typeof document === "undefined") return;
  const cookieVal = lang === "es" ? "/en/es" : "/en/en";
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();

  // Root path
  document.cookie = `${COOKIE_NAME}=${cookieVal}; path=/; expires=${expires};`;

  // Hostname
  const host = window.location.hostname;
  document.cookie = `${COOKIE_NAME}=${cookieVal}; path=/; domain=${host}; expires=${expires};`;

  // Parent domain if applicable
  if (host.includes(".") && !host.startsWith("localhost")) {
    const parts = host.split(".");
    if (parts.length > 2) {
      document.cookie = `${COOKIE_NAME}=${cookieVal}; path=/; domain=.${parts.slice(-2).join(".")}; expires=${expires};`;
    }
  }

  try {
    localStorage.setItem("bhh_language", lang);
  } catch (e) {
    // Ignore storage quota/permission errors
  }
}

// Global script loader helper
function initGoogleTranslate() {
  if (typeof window === "undefined") return;

  // Ensure translation target div exists in DOM
  if (!document.getElementById("google_translate_element")) {
    const div = document.createElement("div");
    div.id = "google_translate_element";
    div.style.display = "none";
    document.body.appendChild(div);
  }

  if (window.__bhh_gt_initialized) return;
  window.__bhh_gt_initialized = true;

  window.googleTranslateElementInit = function () {
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,es",
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    }
  };

  if (!document.getElementById("google-translate-script")) {
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }
}

export default function LanguageSwitcher({ variant = "header", onLanguageChange }) {
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState("en");
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Initialize language detection from cookie / localStorage / URL params
  useEffect(() => {
    initGoogleTranslate();

    // 1. Check URL query (?lang=es)
    let detected = "en";
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const queryLang = urlParams.get("lang");
      if (queryLang === "es" || queryLang === "en") {
        detected = queryLang;
      } else {
        // 2. Check Cookie
        const cookieVal = getCookie(COOKIE_NAME);
        if (cookieVal && cookieVal.includes("/es")) {
          detected = "es";
        } else {
          // 3. Check LocalStorage
          try {
            const saved = localStorage.getItem("bhh_language");
            if (saved === "es") detected = "es";
          } catch (e) {}
        }
      }
    }

    setCurrentLang(detected);
    if (detected === "es") {
      setLanguageCookies("es");
    }
  }, []);

  // When pathname changes, ensure Spanish translation remains active if selected
  useEffect(() => {
    if (currentLang === "es") {
      const timer = setTimeout(() => {
        const select = document.querySelector(".goog-te-combo");
        if (select && select.value !== "es") {
          select.value = "es";
          select.dispatchEvent(new Event("change"));
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [pathname, currentLang]);

  const handleSelectLanguage = useCallback(
    (lang) => {
      setIsOpen(false);
      if (lang === currentLang) return;

      setIsChanging(true);
      setCurrentLang(lang);
      setLanguageCookies(lang);

      if (onLanguageChange) {
        onLanguageChange(lang);
      }

      // Trigger Google Translate engine
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event("change"));

        if (lang === "en") {
          setTimeout(() => {
            window.location.reload();
          }, 300);
        } else {
          setTimeout(() => {
            setIsChanging(false);
          }, 600);
        }
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 150);
      }
    },
    [currentLang, onLanguageChange]
  );

  // Variant for Mobile Drawer Navigation
  if (variant === "drawer") {
    return (
      <div className={styles.drawerCard} aria-label="Preferred Language / Selección de idioma">
        <div className={styles.drawerCardHeader}>
          <div className={styles.drawerGlobeBadge} aria-hidden="true">
            <Globe size={14} />
          </div>
          <span className={styles.drawerTitle}>Preferred Language / Idioma</span>
        </div>
        <div className={styles.drawerList} role="listbox" aria-label="Select website language">
          <button
            type="button"
            role="option"
            aria-selected={currentLang === "en"}
            className={`${styles.drawerOption} ${currentLang === "en" ? styles.drawerOptionActive : ""}`}
            onClick={() => handleSelectLanguage("en")}
          >
            <div className={styles.drawerOptionContent}>
              <span className={styles.drawerOptionName}>English</span>
              <span className={styles.drawerOptionSub}>United States</span>
            </div>
            {currentLang === "en" && (
              <div className={styles.drawerCheckBadge} aria-hidden="true">
                <Check size={13} strokeWidth={3} />
              </div>
            )}
          </button>
          <button
            type="button"
            role="option"
            aria-selected={currentLang === "es"}
            className={`${styles.drawerOption} ${currentLang === "es" ? styles.drawerOptionActive : ""}`}
            onClick={() => handleSelectLanguage("es")}
          >
            <div className={styles.drawerOptionContent}>
              <span className={styles.drawerOptionName}>Español</span>
              <span className={styles.drawerOptionSub}>Spanish</span>
            </div>
            {currentLang === "es" && (
              <div className={styles.drawerCheckBadge} aria-hidden="true">
                <Check size={13} strokeWidth={3} />
              </div>
            )}
          </button>
        </div>
      </div>
    );
  }

  // Default Variant: Header Dropdown
  return (
    <div
      ref={containerRef}
      className={`${styles.wrapper} ${isChanging ? styles.loadingPulse : ""}`}
    >
      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.triggerActive : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Select Language. Current: ${currentLang === "en" ? "English" : "Español"}`}
        title="Select website language"
      >
        <div className={styles.iconBadge} aria-hidden="true">
          <Globe size={14} />
        </div>
        <span className={styles.labelDesktop}>
          {currentLang === "en" ? "English" : "Español"}
        </span>
        <span className={styles.labelMobile}>
          {currentLang.toUpperCase()}
        </span>
        <ChevronDown size={14} className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="listbox" aria-label="Select language">
          <div className={styles.dropdownHeader}>Select Language</div>
          <button
            type="button"
            role="option"
            aria-selected={currentLang === "en"}
            className={`${styles.option} ${currentLang === "en" ? styles.optionActive : ""}`}
            onClick={() => handleSelectLanguage("en")}
          >
            <span className={styles.optionText}>
              <strong className={styles.optionName}>English</strong>
              <span className={styles.optionSub}>United States</span>
            </span>
            {currentLang === "en" && (
              <div className={styles.checkBadge} aria-hidden="true">
                <Check size={12} strokeWidth={3} />
              </div>
            )}
          </button>

          <button
            type="button"
            role="option"
            aria-selected={currentLang === "es"}
            className={`${styles.option} ${currentLang === "es" ? styles.optionActive : ""}`}
            onClick={() => handleSelectLanguage("es")}
          >
            <span className={styles.optionText}>
              <strong className={styles.optionName}>Español</strong>
              <span className={styles.optionSub}>Spanish</span>
            </span>
            {currentLang === "es" && (
              <div className={styles.checkBadge} aria-hidden="true">
                <Check size={12} strokeWidth={3} />
              </div>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
