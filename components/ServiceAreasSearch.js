"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Search, Heart, Navigation } from "lucide-react";

const counties = [
  { name: "York County", status: "Primary Hub" },
  { name: "Lancaster County", status: "Active Coverage" },
  { name: "Adams County", status: "Active Coverage" },
  { name: "Cumberland County", status: "Active Coverage" },
  { name: "Dauphin County", status: "Active Coverage" },
];

export default function ServiceAreasSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCounties = counties.filter((county) =>
    county.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="areas-luxury-section" aria-labelledby="areas-serve-heading">
      {/* Background shapes */}
      <div className="areas-luxury-bg-blob" aria-hidden="true" />
      <div className="areas-luxury-bg-blob-2" aria-hidden="true" />

      <div className="container">
        {/* Section Header */}
        <div className="areas-luxury-header">
          <div className="areas-luxury-badge-wrapper">
            <span className="areas-luxury-badge">AREAS WE SERVE</span>
          </div>
          <h2 id="areas-serve-heading" className="areas-luxury-title">
            Compassionate Home Care<br />Across Pennsylvania
          </h2>
          <p className="areas-luxury-intro">
            Blessed Hearts Homecare proudly serves families throughout York County and neighboring PA communities with licensed, compassionate in-home care services.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="areas-luxury-grid-container">

          {/* Left Column (45% width): Search, list, CTA */}
          <div className="areas-luxury-search-col">
            <div className="areas-search-wrapper">
              <Search className="areas-search-icon" size={20} aria-hidden="true" />
              <input
                type="text"
                placeholder="Search your county..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="areas-luxury-search-input"
                aria-label="Search your county to check coverage"
              />
            </div>

            <div className="areas-cards-list" role="region" aria-label="County coverage status list">
              {filteredCounties.length > 0 ? (
                filteredCounties.map((county, index) => (
                  <div key={index} className="areas-county-pill-card">
                    <div className="areas-county-icon-circle">
                      <MapPin size={18} aria-hidden="true" />
                    </div>
                    <span className="areas-county-name">{county.name}</span>
                    <span className="areas-county-status-badge">
                      <span className="areas-county-status-check" aria-hidden="true">✓</span>
                      {county.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="areas-no-results">
                  <p>We don&apos;t currently list coverage in this area.</p>
                  <p className="areas-no-results__sub">Please contact us directly to discuss custom arrangements.</p>
                </div>
              )}
            </div>

            {/* Call To Action Buttons */}
            <div className="areas-luxury-actions">
              <Link href="/contact-us" className="btn-luxury-primary btn-luxury-cta" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                <Heart size={16} aria-hidden="true" />
                Request Care
              </Link>
              <Link href="/contact-us" className="btn-luxury-secondary btn-luxury-cta-sec" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                <Navigation size={16} aria-hidden="true" />
                Check Availability
              </Link>
            </div>
          </div>

          {/* Right Column (55% width): Styled map and statistics */}
          <div className="areas-luxury-map-col">
            {/* Organic blurred gradient blob behind map */}
            <div className="areas-luxury-map-blob" aria-hidden="true" />

            <div className="areas-luxury-map-card">
              <div className="areas-luxury-map-image-wrapper">
                <Image
                  src="/images/service-area-map.png"
                  alt="Pennsylvania regional map highlighting York, Adams, Lancaster, Cumberland, and Dauphin counties"
                  fill
                  sizes="(max-width: 56rem) 100vw, 55vw"
                  className="areas-luxury-map-img"
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Floating information badges */}
              <div className="areas-floating-badge areas-floating-badge--1 animate-float">
                <span className="areas-floating-badge__icon" aria-hidden="true">❤️</span>
                <span>Serving 5+ Counties</span>
              </div>

            </div>




          </div>

        </div>
      </div>
    </section>
  );
}
