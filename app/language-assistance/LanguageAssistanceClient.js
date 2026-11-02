"use client";

import { useState, useMemo } from "react";
import { Phone, PhoneCall, Globe, Check, Search, ShieldCheck, HeartHandshake, Languages, ArrowRight } from "lucide-react";
import { supportedLanguages, taglineLanguages } from "@/lib/languagesData";
import { site } from "@/lib/site";
import Link from "next/link";

export default function LanguageAssistanceClient() {
  const [activeCode, setActiveCode] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCode, setCopiedCode] = useState(null);

  const handleTranslate = (code) => {
    setActiveCode(code);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("bhh-set-language", { detail: { code } }));
    }
  };

  const filteredTaglines = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return supportedLanguages;
    return supportedLanguages.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.nativeName.toLowerCase().includes(q) ||
        l.sub.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {/* 1. Quick Translate Banner & One-Click Language Pills */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(255, 45, 122, 0.06) 0%, rgba(255, 122, 26, 0.04) 100%)",
          border: "2px solid rgba(255, 45, 122, 0.25)",
          borderRadius: "1.25rem",
          padding: "1.75rem",
          boxShadow: "0 8px 30px rgba(90, 26, 94, 0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "var(--gradient, linear-gradient(90deg, #ff2d7a 0%, #ff5a3c 100%))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              flexShrink: 0,
            }}
          >
            <Languages size={20} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.25rem", color: "var(--plum, #5a1a5e)" }}>
              One-Click Website Translation
            </h2>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#64748b" }}>
              Select your preferred language below to immediately translate this entire website:
            </p>
          </div>
        </div>

        {/* 20 Language Selector Pills */}
        <div
          className="notranslate"
          translate="no"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: "0.6rem",
            marginTop: "1.25rem",
          }}
        >
          {supportedLanguages.map((lang) => {
            const isSelected = activeCode.toLowerCase() === lang.code.toLowerCase();
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleTranslate(lang.code)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0.55rem 0.85rem",
                  borderRadius: "10px",
                  border: isSelected ? "2px solid var(--pink, #ff2d7a)" : "1.5px solid rgba(90, 26, 94, 0.12)",
                  background: isSelected ? "linear-gradient(135deg, rgba(255, 45, 122, 0.12) 0%, rgba(255, 122, 26, 0.08) 100%)" : "#ffffff",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                  fontFamily: "var(--font-cta, sans-serif)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.85rem", color: isSelected ? "var(--pink, #ff2d7a)" : "var(--plum, #5a1a5e)" }}>
                    {lang.nativeName}
                  </span>
                  {isSelected && <Check size={14} color="var(--pink, #ff2d7a)" strokeWidth={3} />}
                </div>
                <span style={{ fontSize: "0.7rem", color: "#64748b", marginTop: 2 }}>{lang.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Direct Phone Assistance Highlight */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.25rem",
          padding: "1.5rem 1.75rem",
          background: "linear-gradient(135deg, #5a1a5e 0%, #3e0e41 100%)",
          borderRadius: "1.25rem",
          color: "#ffffff",
        }}
      >
        <div style={{ maxWidth: "34rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", background: "rgba(255, 255, 255, 0.15)", padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.78rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            <PhoneCall size={12} /> Free Over-the-Phone Interpreter Services
          </div>
          <h3 style={{ margin: "0 0 0.35rem 0", fontSize: "1.2rem", color: "#ffffff" }}>
            Need an interpreter right now?
          </h3>
          <p style={{ margin: 0, fontSize: "0.92rem", color: "#fce7f3", lineHeight: 1.5 }}>
            Call us free of charge. Tell our coordinator what language you speak, and we will connect a qualified interpreter immediately.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-start" }}>
          <a
            href={site.phoneHref}
            className="btn btn--gradient"
            style={{
              padding: "0.75rem 1.4rem",
              fontSize: "1rem",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
            }}
          >
            <Phone size={18} />
            {site.phoneDisplay}
          </a>
          <span style={{ fontSize: "0.82rem", color: "#fce7f3", paddingLeft: "0.35rem" }}>
            Hearing/Speech Impaired: Dial <strong>TTY: 711</strong>
          </span>
        </div>
      </div>

      {/* 3. Search Bar for Official Taglines */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
          <div>
            <h2 style={{ margin: "0 0 0.25rem 0", fontSize: "1.35rem", color: "var(--plum, #5a1a5e)" }}>
              Pennsylvania Top Non-English Language Taglines
            </h2>
            <p style={{ margin: 0, fontSize: "0.92rem", color: "#64748b" }}>
              In compliance with PA Medical Assistance (MA) Bulletins 99-17-11 &amp; 99-25-01, Section 1557 ACA, and Title VI of the Civil Rights Act:
            </p>
          </div>

          <div style={{ position: "relative", minWidth: 260 }}>
            <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
            <input
              type="text"
              placeholder="Search language taglines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.6rem 1rem 0.6rem 2.2rem",
                borderRadius: "999px",
                border: "1.5px solid rgba(90, 26, 94, 0.18)",
                fontSize: "0.88rem",
                outline: "none",
                fontFamily: "var(--font-cta, sans-serif)",
              }}
            />
          </div>
        </div>

        {/* Tagline Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.2rem",
          }}
        >
          {filteredTaglines.map((lang) => {
            const isEnglish = lang.code === "en";
            return (
              <div
                key={lang.code}
                style={{
                  background: isEnglish ? "#fff8fa" : "#ffffff",
                  border: isEnglish ? "2px solid var(--pink, #ff2d7a)" : "1.5px solid rgba(90, 26, 94, 0.12)",
                  borderRadius: "1rem",
                  padding: "1.35rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 18px rgba(90, 26, 94, 0.04)",
                  transition: "all 0.2s ease",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.65rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span
                        style={{
                          background: isEnglish ? "var(--plum, #5a1a5e)" : "rgba(255, 45, 122, 0.1)",
                          color: isEnglish ? "#ffffff" : "var(--pink, #ff2d7a)",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          padding: "0.15rem 0.55rem",
                          borderRadius: "999px",
                        }}
                      >
                        {lang.bulletinNumber ? `#${lang.bulletinNumber}` : "Base"}
                      </span>
                      <strong style={{ fontSize: "1.05rem", color: "var(--plum, #5a1a5e)" }}>
                        {lang.nativeName}
                      </strong>
                    </div>
                    <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>
                      {lang.name}
                    </span>
                  </div>

                  <p
                    className="notranslate"
                    translate="no"
                    style={{
                      margin: "0 0 1rem 0",
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                      color: "#1e293b",
                    }}
                    lang={lang.code}
                  >
                    {lang.tagline}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "0.75rem",
                    borderTop: "1px solid rgba(90, 26, 94, 0.08)",
                    gap: "0.5rem",
                  }}
                >
                  <a
                    href={site.phoneHref}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "var(--pink, #ff2d7a)",
                      textDecoration: "none",
                    }}
                  >
                    <Phone size={14} /> (223) 260-9042
                  </a>

                  <button
                    type="button"
                    onClick={() => handleTranslate(lang.code)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      background: "rgba(90, 26, 94, 0.06)",
                      border: "1px solid rgba(90, 26, 94, 0.12)",
                      padding: "0.3rem 0.65rem",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--plum, #5a1a5e)",
                      cursor: "pointer",
                      fontFamily: "var(--font-cta, sans-serif)",
                    }}
                    title={`Translate site into ${lang.name}`}
                  >
                    <Globe size={12} />
                    Translate Site
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

