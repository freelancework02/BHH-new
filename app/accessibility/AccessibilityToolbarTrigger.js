"use client";

import { Accessibility } from "lucide-react";

export default function AccessibilityToolbarTrigger() {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("bhh-open-accessibility"));
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="btn btn-primary"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        cursor: "pointer",
        padding: "0.75rem 1.35rem",
        borderRadius: "9999px",
        fontWeight: 600,
      }}
      aria-label="Open Accessibility Toolbar"
    >
      <Accessibility size={18} aria-hidden="true" />
      <span>Open Accessibility Toolbar</span>
    </button>
  );
}
