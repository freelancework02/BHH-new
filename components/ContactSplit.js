import { Phone, Printer, MapPin, Mail } from "lucide-react";
import ContactForm from "./ContactForm";
import { site } from "@/lib/site";

export default function ContactSplit() {
  return (
    <div className="contact-panel">
      <div className="contact-panel__form">
        <h2>Get in Touch</h2>
        <ContactForm />
      </div>
      <div className="contact-panel__info">
        <h2>Contact Us</h2>
        <ul style={{ display: "grid", gap: "1.25rem" }}>
          <li style={{ display: "flex", gap: "0.75rem" }}>
            <Phone aria-hidden="true" />
            <span>
              <a href={site.phoneHref} style={{ color: "var(--plum)", fontWeight: 700 }}>
                {site.phoneDisplay}
              </a>
            </span>
          </li>
          <li style={{ display: "flex", gap: "0.75rem" }}>
            <Printer aria-hidden="true" />
            <span>Fax: {site.faxDisplay}</span>
          </li>
          <li style={{ display: "flex", gap: "0.75rem" }}>
            <Mail aria-hidden="true" />
            <a href={`mailto:${site.email}`} style={{ color: "var(--plum)" }}>
              {site.email}
            </a>
          </li>
          <li style={{ display: "flex", gap: "0.75rem" }}>
            <MapPin aria-hidden="true" style={{ flexShrink: 0 }} />
            <span>
              <strong>York Office</strong>
              <br />
              {site.address.line1}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
