"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Globe, ChevronDown, Check, Search, X } from "lucide-react";
import {
  supportedLanguages,
  googleTranslateIncludedLanguages,
  getLanguageByCode,
} from "@/lib/languagesData";
import styles from "./LanguageSwitcher.module.css";

const COOKIE_NAME = "googtrans";

// Helper to get cookie value
function getCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
  return match ? decodeURIComponent(match[3]) : null;
}

// Helper to set language cookie across root, hostname, and parent domain
function setLanguageCookies(lang) {
  if (typeof document === "undefined") return;

  const isEn = lang === "en";
  const cookieVal = isEn ? "" : `/en/${lang}`;
  const expires = isEn
    ? "Thu, 01 Jan 1970 00:00:00 UTC"
    : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();

  // Root path
  document.cookie = `${COOKIE_NAME}=${cookieVal}; path=/; expires=${expires};`;

  // Hostname
  const host = window.location.hostname;
  document.cookie = `${COOKIE_NAME}=${cookieVal}; path=/; domain=${host}; expires=${expires};`;

  if (!isEn) {
    document.cookie = `${COOKIE_NAME}=/auto/${lang}; path=/; expires=${expires};`;
  } else {
    document.cookie = `${COOKIE_NAME}=/en/en; path=/; expires=${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()};`;
  }

  // Parent domain if applicable
  if (host.includes(".") && !host.startsWith("localhost")) {
    const parts = host.split(".");
    if (parts.length > 2) {
      document.cookie = `${COOKIE_NAME}=${cookieVal}; path=/; domain=.${parts.slice(-2).join(".")}; expires=${expires};`;
    }
  }

  try {
    if (isEn) {
      localStorage.removeItem("bhh_language");
    } else {
      localStorage.setItem("bhh_language", lang);
    }
  } catch (e) {
    // Ignore storage quota/permission errors
  }
}

// Global script loader helper for Google Translate
function initGoogleTranslate() {
  if (typeof window === "undefined") return;

  // Ensure translation target div exists in DOM without display:none breaking initialization
  if (!document.getElementById("google_translate_element")) {
    const div = document.createElement("div");
    div.id = "google_translate_element";
    div.style.position = "absolute";
    div.style.top = "-9999px";
    div.style.left = "-9999px";
    div.style.width = "1px";
    div.style.height = "1px";
    div.style.overflow = "hidden";
    div.style.opacity = "0";
    div.style.pointerEvents = "none";
    document.body.appendChild(div);
  }

  if (window.__bhh_gt_initialized) return;
  window.__bhh_gt_initialized = true;

  window.googleTranslateElementInit = function () {
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: googleTranslateIncludedLanguages,
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
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }
}

export default function LanguageSwitcher({ variant = "header", onLanguageChange }) {
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState("en");
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Active language object
  const activeLanguage = useMemo(
    () => getLanguageByCode(currentLang),
    [currentLang]
  );

  // Filtered languages based on search input
  const filteredLanguages = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return supportedLanguages;
    return supportedLanguages.filter((item) => {
      return (
        item.name.toLowerCase().includes(q) ||
        item.nativeName.toLowerCase().includes(q) ||
        item.sub.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  // Focus search input on dropdown open
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

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

  // Language selection callback
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

      // Fast clean reload so Google Translate initializes cleanly from the new cookie
      setTimeout(() => {
        window.location.reload();
      }, 100);
    },
    [currentLang, onLanguageChange]
  );

  // Initialize language detection from cookie / localStorage / URL params
  useEffect(() => {
    initGoogleTranslate();

    let detected = "en";
    if (typeof window !== "undefined") {
      // 1. Check URL query (?lang=es / ?lang=ru etc.)
      const urlParams = new URLSearchParams(window.location.search);
      const queryLang = urlParams.get("lang");
      if (queryLang && supportedLanguages.some((l) => l.code.toLowerCase() === queryLang.toLowerCase())) {
        detected = queryLang;
      } else {
        // 2. Check Cookie
        const cookieVal = getCookie(COOKIE_NAME);
        if (cookieVal) {
          const parts = cookieVal.split("/");
          const code = parts[parts.length - 1];
          const matched = supportedLanguages.find(
            (l) => l.code.toLowerCase() === code.toLowerCase()
          );
          if (matched) detected = matched.code;
        } else {
          // 3. Check LocalStorage
          try {
            const saved = localStorage.getItem("bhh_language");
            if (saved && supportedLanguages.some((l) => l.code === saved)) {
              detected = saved;
            }
          } catch (e) {}
        }
      }
    }

    setCurrentLang(detected);
    if (detected !== "en") {
      setLanguageCookies(detected);
    }
  }, []);

  // Listen for global custom event e.g. from /language-assistance page buttons
  useEffect(() => {
    function handleCustomSet(e) {
      if (e.detail && e.detail.code) {
        handleSelectLanguage(e.detail.code);
      }
    }

    window.addEventListener("bhh-set-language", handleCustomSet);
    return () => window.removeEventListener("bhh-set-language", handleCustomSet);
  }, [handleSelectLanguage]);

  // When pathname changes, ensure selected non-English translation remains active
  useEffect(() => {
    if (currentLang && currentLang !== "en") {
      const timer = setTimeout(() => {
        const select = document.querySelector(".goog-te-combo");
        if (select && select.value !== currentLang) {
          select.value = currentLang;
          select.dispatchEvent(new Event("change"));
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [pathname, currentLang]);

  // ====================================================
  // Variant for Mobile Drawer Navigation
  // ====================================================
  if (variant === "drawer") {
    return (
      <div className={`${styles.drawerCard} notranslate`} translate="no" aria-label="Preferred Language / Selección de idioma">
        <div className={styles.drawerCardHeader}>
          <div className={styles.drawerGlobeBadge} aria-hidden="true">
            <Globe size={14} />
          </div>
          <span className={styles.drawerTitle}>Preferred Language / Idioma</span>
          <span className={styles.drawerBadgeCount}>{supportedLanguages.length} Languages</span>
        </div>

        {/* Mobile Search Box */}
        <div className={styles.searchContainer}>
          <Search size={14} className={styles.searchIcon} aria-hidden="true" />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search language (e.g., Spanish, Nepali, Russian)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Filter languages"
          />
          {searchQuery && (
            <button
              type="button"
              className={styles.clearSearchBtn}
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Mobile Scrollable List */}
        <div className={styles.drawerList} role="listbox" aria-label="Select website language">
          {filteredLanguages.length === 0 ? (
            <div className={styles.noResults}>No language found for &quot;{searchQuery}&quot;</div>
          ) : (
            filteredLanguages.map((lang) => {
              const isSelected = currentLang.toLowerCase() === lang.code.toLowerCase();
              return (
                <button
                  key={lang.code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`${styles.drawerOption} ${isSelected ? styles.drawerOptionActive : ""}`}
                  onClick={() => handleSelectLanguage(lang.code)}
                >
                  <div className={styles.drawerOptionContent}>
                    <span className={styles.drawerOptionName}>{lang.nativeName}</span>
                    <span className={styles.drawerOptionSub}>
                      {lang.name} {lang.sub && lang.sub !== lang.name ? `• ${lang.sub}` : ""}
                    </span>
                  </div>
                  {isSelected && (
                    <div className={styles.drawerCheckBadge} aria-hidden="true">
                      <Check size={13} strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    );
  }

  // ====================================================
  // Default Variant: Desktop Header Dropdown
  // ====================================================
  return (
    <div
      ref={containerRef}
      className={`${styles.wrapper} notranslate ${isChanging ? styles.loadingPulse : ""}`}
      translate="no"
    >
      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.triggerActive : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Select Language. Current: ${activeLanguage.name} (${activeLanguage.nativeName})`}
        title={`Select website language (${activeLanguage.name})`}
      >
        <div className={styles.iconBadge} aria-hidden="true">
          <Globe size={14} />
        </div>
        <span className={styles.labelDesktop}>
          {activeLanguage.code === "en" ? "English" : activeLanguage.nativeName}
        </span>
        <span className={styles.labelMobile}>
          {activeLanguage.code.split("-")[0].toUpperCase()}
        </span>
        <ChevronDown
          size={14}
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="listbox" aria-label="Select language">
          <div className={styles.dropdownHeader}>
            <div className={styles.dropdownHeaderTitle}>
              <span>Select Language</span>
              <span className={styles.languageCountBadge}>{supportedLanguages.length} Languages</span>
            </div>
            
            {/* Search Input */}
            <div className={styles.searchContainer}>
              <Search size={13} className={styles.searchIcon} aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="text"
                className={styles.searchInput}
                placeholder="Search language..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search languages"
              />
              {searchQuery && (
                <button
                  type="button"
                  className={styles.clearSearchBtn}
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Scrollable list */}
          <div className={styles.dropdownList}>
            {filteredLanguages.length === 0 ? (
              <div className={styles.noResults}>No language matches &quot;{searchQuery}&quot;</div>
            ) : (
              filteredLanguages.map((lang) => {
                const isSelected = currentLang.toLowerCase() === lang.code.toLowerCase();
                return (
                  <button
                    key={lang.code}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={`${styles.option} ${isSelected ? styles.optionActive : ""}`}
                    onClick={() => handleSelectLanguage(lang.code)}
                  >
                    <span className={styles.optionText}>
                      <strong className={styles.optionName}>{lang.nativeName}</strong>
                      <span className={styles.optionSub}>
                        {lang.name}
                      </span>
                    </span>
                    {isSelected && (
                      <div className={styles.checkBadge} aria-hidden="true">
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
