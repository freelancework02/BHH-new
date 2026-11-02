import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import Link from "next/link";
import LanguageAssistanceClient from "./LanguageAssistanceClient";
import { ShieldCheck, HeartHandshake, Phone, Mail, MapPin } from "lucide-react";

export const metadata = {
  title: "Notice of Non-Discrimination & Language Assistance Services (LEP)",
  description: `${site.name} provides free language assistance services and interpreters in over 19 languages for individuals with Limited English Proficiency (LEP) under PA MA Bulletins 99-17-11 and 99-25-01 and Section 1557 ACA.`,
  alternates: { canonical: "/language-assistance" },
};

export default function LanguageAssistancePage() {
  return (
    <>
      <PageHero
        title="Notice of Non-Discrimination & Language Assistance"
        description="Our commitment to equal access, free translation, and interpreter services for Limited English Proficiency (LEP) individuals."
        ctaLabel={null}
        mediaLabel="Illustration showing inclusive multilingual healthcare and accessibility communication"
      />

      <section className="section">
        <div className="container" style={{ maxWidth: "60rem" }}>
          <p>
            <em>Last updated: October 2026</em>
          </p>

          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#1e293b" }}>
            <strong>{site.name}</strong> complies with applicable Federal civil rights laws and does not discriminate on the basis of race, color, national origin, age, disability, or sex. {site.name} does not exclude people or treat them differently because of race, color, national origin, age, disability, or sex.
          </p>

          {/* Core Mandate Summary Card */}
          <div
            style={{
              margin: "2rem 0",
              padding: "1.75rem",
              background: "#fff9fb",
              border: "2px solid #ff2d7a",
              borderRadius: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <ShieldCheck size={24} color="#ff2d7a" />
              <h2 style={{ margin: 0, color: "#5a1a5e", fontSize: "1.25rem" }}>
                Free Language Assistance &amp; Auxiliary Communication Aids
              </h2>
            </div>

            <p style={{ margin: 0, fontSize: "0.98rem", lineHeight: 1.6 }}>
              In compliance with <strong>Section 1557 of the Affordable Care Act (45 CFR Part 92)</strong>, <strong>Title VI of the Civil Rights Act of 1964</strong>, and Pennsylvania Department of Human Services <strong>Medical Assistance (MA) Bulletins 99-17-11 and 99-25-01</strong>, {site.name}:
            </p>

            <ul style={{ margin: 0, paddingLeft: "1.25rem", lineHeight: 1.7, fontSize: "0.95rem" }}>
              <li>
                <strong>Provides free aids and services to people with disabilities</strong> to communicate effectively with our care coordinators and caregivers, such as:
                <ul style={{ marginTop: "0.25rem", marginBottom: "0.5rem" }}>
                  <li>Qualified sign language interpreters</li>
                  <li>Written information in accessible formats (large print, audio, accessible electronic formats)</li>
                  <li>Telecommunications Relay Service via <strong>TTY: 711</strong></li>
                </ul>
              </li>
              <li>
                <strong>Provides free language services to people whose primary language is not English</strong>, such as:
                <ul style={{ marginTop: "0.25rem" }}>
                  <li>Qualified oral interpreters (over the phone and during in-home care assessments)</li>
                  <li>Information and vital care documents written in other languages</li>
                  <li>Thoughtful matching with bilingual or multilingual caregivers whenever available</li>
                </ul>
              </li>
            </ul>

            <div style={{ paddingTop: "0.5rem" }}>
              <p style={{ margin: 0, fontSize: "0.95rem", fontWeight: 600, color: "#5a1a5e" }}>
                If you need these services, call our office at{" "}
                <a href={site.phoneHref} style={{ color: "#ff2d7a", textDecoration: "underline" }}>
                  {site.phoneDisplay}
                </a>{" "}
                or dial <strong>TTY: 711</strong>. Services are provided 100% free of charge.
              </p>
            </div>
          </div>

          {/* Interactive Client Component with 20 Language Selector & Searchable Tagline Cards */}
          <LanguageAssistanceClient />

          {/* Grievance Procedure Section */}
          <div
            style={{
              marginTop: "3.5rem",
              padding: "2rem",
              background: "#f8fafc",
              border: "1.5px solid #e2e8f0",
              borderRadius: "1rem",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#5a1a5e", fontSize: "1.25rem" }}>
              How to File a Grievance or Civil Rights Complaint
            </h2>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#334155" }}>
              If you believe that {site.name} has failed to provide these language assistance services or discriminated in another way on the basis of race, color, national origin, age, disability, or sex, you can file a grievance with our Civil Rights Compliance Coordinator:
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1rem",
                margin: "1.25rem 0",
                fontSize: "0.92rem",
                color: "#1e293b",
              }}
            >
              <div>
                <strong>Civil Rights Compliance Coordinator</strong>
                <br />
                {site.name}
                <br />
                {site.addressFull}
              </div>
              <div>
                <strong>Phone:</strong>{" "}
                <a href={site.phoneHref} style={{ color: "#ff2d7a" }}>
                  {site.phoneDisplay}
                </a>
                <br />
                <strong>Fax:</strong> {site.faxDisplay}
                <br />
                <strong>Email:</strong>{" "}
                <a href={`mailto:${site.email}`} style={{ color: "#ff2d7a" }}>
                  {site.email}
                </a>
              </div>
            </div>

            <p style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "#334155" }}>
              You can file a grievance in person, by mail, fax, or email. If you need help filing a grievance, our Compliance Coordinator is available to help you.
            </p>

            <h3 style={{ fontSize: "1.05rem", color: "#5a1a5e", marginTop: "1.5rem" }}>
              External Regulatory Agencies
            </h3>
            <p style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "#334155" }}>
              You can also file a civil rights complaint with:
            </p>
            <ul style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "#334155", paddingLeft: "1.25rem" }}>
              <li>
                <strong>U.S. Department of Health and Human Services (HHS), Office for Civil Rights (OCR):</strong>
                <br />
                Electronically through the Office for Civil Rights Complaint Portal at{" "}
                <a
                  href="https://ocrportal.hhs.gov/ocr/portal/lobby.jsf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#ff2d7a", textDecoration: "underline" }}
                >
                  https://ocrportal.hhs.gov/ocr/portal/lobby.jsf
                </a>
                , or by mail/phone at:
                <br />
                U.S. Department of Health and Human Services, 200 Independence Avenue, SW, Room 509F, HHH Building, Washington, D.C. 20201. Phone: 1-800-368-1019, 800-537-7697 (TDD). Complaint forms are available at{" "}
                <a
                  href="http://www.hhs.gov/ocr/office/file/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#ff2d7a", textDecoration: "underline" }}
                >
                  http://www.hhs.gov/ocr/office/file/index.html
                </a>
                .
              </li>
              <li style={{ marginTop: "0.75rem" }}>
                <strong>Pennsylvania Department of Human Services (DHS), Bureau of Equal Opportunity (BEO):</strong>
                <br />
                Health &amp; Welfare Building, 7th &amp; Forster Streets, Room 225, Harrisburg, PA 17120. Phone: (717) 787-1127.
              </li>
            </ul>
          </div>

          <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/" className="btn btn-secondary">
              ← Return to Home
            </Link>
            <Link href="/accessibility" className="btn btn-secondary">
              Digital Accessibility Statement
            </Link>
            <Link href="/contact-us" className="btn btn--gradient">
              Contact Care Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

