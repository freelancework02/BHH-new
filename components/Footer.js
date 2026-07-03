"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin } from "lucide-react";
import Logo from "./Logo";
import styles from "./Footer.module.css";
import { site, footerLinks } from "@/lib/site";

export default function Footer() {
  return (
    <>
      <section className={styles.newsletter} aria-labelledby="newsletter-heading">
        <div className={`container ${styles.newsletterInner}`}>
          <h2 id="newsletter-heading" style={{ color: "#fff", margin: 0, fontSize: "1.15rem" }}>
            Stay up to date with {site.shortName}. Sign up for our monthly newsletter.
          </h2>
          <form
            className={styles.newsletterForm}
            aria-label="Newsletter signup"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="newsletter-name" className="visually-hidden">
              Name
            </label>
            <input id="newsletter-name" name="name" type="text" placeholder="Name" required />
            <label htmlFor="newsletter-email" className="visually-hidden">
              Email
            </label>
            <input id="newsletter-email" name="email" type="email" placeholder="Email" required />
            <button type="submit" className="btn btn--gradient">
              Submit
            </button>
          </form>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.grid}>
            <div>
              <h3>Our Office</h3>
              <p style={{ display: "flex", gap: "0.5rem" }}>
                <MapPin size={18} aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </span>
              </p>
            </div>
            <div>
              <h3>Quick Links</h3>
              <ul>
                {footerLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Contact</h3>
              <ul>
                <li>
                  <a href={site.phoneHref}>{site.phoneDisplay}</a>
                </li>
                <li>Fax: {site.faxDisplay}</li>
                <li>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
              </ul>
            </div>
            <div>
              <h3>We Serve</h3>
              <ul>
                {site.serviceAreas.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.bottom}>
            <Logo variant="white" />
            <p style={{ margin: 0 }}>
              © {new Date().getFullYear()} {site.name}. All Rights Reserved.{" "}
              <Link href="/privacy-policy">Privacy Policy</Link>
            </p>
            <nav className={styles.social} aria-label="Social media">
              <a href="#" aria-label="Facebook">
                <Facebook size={18} aria-hidden="true" />
              </a>
              <a href="#" aria-label="Twitter / X">
                <Twitter size={18} aria-hidden="true" />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram size={18} aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
