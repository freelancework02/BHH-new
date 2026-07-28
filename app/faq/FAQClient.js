"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Phone, Plus } from "lucide-react";

function LinkedAnswer({ faq }) {
  if (!faq.link) {
    return <p>{faq.a}</p>;
  }

  const [before, after = ""] = faq.a.split(faq.link.text);

  return (
    <p>
      {before}
      <a href={faq.link.href} target="_blank" rel="noopener noreferrer">
        {faq.link.text}
      </a>
      {after}
    </p>
  );
}

export default function FAQClient({ faqGroups, site }) {
  const [openItem, setOpenItem] = useState("cost-payment-0");

  return (
    <div className="faq-page">
      <section className="faq-page-hero" aria-labelledby="faq-page-title">
        <div className="container faq-page-hero__inner">
          <div className="faq-page-hero__content">
            <span className="eyebrow-luxury-accent">HOME CARE FAQ</span>
            <h1 id="faq-page-title">Home Care Questions, Answered Clearly</h1>
            <p>
              Practical answers about costs, Medicaid and CHC, caregiver screening, care schedules,
              services, and local licensing for families comparing home care in Pennsylvania.
            </p>
            <div className="faq-page-hero__actions">
              <a href={site.phoneHref} className="btn-luxury-lg btn-luxury-lg--primary">
                <Phone size={16} aria-hidden="true" />
                Call {site.phoneDisplay}
              </a>
              <Link href="/contact-us" className="btn-luxury-lg btn-luxury-lg--secondary">
                Request Care
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-page-content" aria-labelledby="faq-content-heading">
        <div className="container">
          <div className="section-heading-luxury">
            <span className="eyebrow-luxury-accent">QUESTIONS ANSWERED</span>
            <h2 id="faq-content-heading" className="section-title-luxury">
              Frequently Asked Questions
            </h2>
            <p className="section-subtitle-luxury">
              Browse by topic or open the questions that match your family&apos;s next decision.
            </p>
            <div className="luxury-title-divider" />
          </div>

          <div className="faq-page-grid">
            {faqGroups.map((group) => {
              const groupId = group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

              return (
                <section key={group.title} className="faq-page-group" aria-labelledby={`${groupId}-heading`}>
                  <h3 id={`${groupId}-heading`}>{group.title}</h3>
                  <div className="faq-accordions-luxury">
                    {group.items.map((faq, index) => {
                      const itemId = `${groupId}-${index}`;
                      const panelId = `${itemId}-panel`;
                      const isOpen = openItem === itemId;

                      return (
                        <div key={faq.q} className={`faq-item-luxury ${isOpen ? "faq-item-luxury--open" : ""}`}>
                          <button
                            type="button"
                            className="faq-item-luxury__trigger"
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            onClick={() => setOpenItem(isOpen ? null : itemId)}
                          >
                            <span>{faq.q}</span>
                            {isOpen ? <Minus size={18} className="faq-icon" /> : <Plus size={18} className="faq-icon" />}
                          </button>
                          <div id={panelId} className="faq-item-luxury__panel">
                            <LinkedAnswer faq={faq} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="faq-page-cta" aria-label="Request a free care consultation">
        <div className="container">
          <div className="faq-page-cta__inner">
            <div>
              <span className="eyebrow-luxury-accent">NEXT STEP</span>
              <h2>Still Comparing Home Care Options?</h2>
              <p>
                Speak with a local Blessed Hearts coordinator about care hours, Medicaid Waiver
                support, caregiver matching, and what would help your loved one most at home.
              </p>
            </div>
            <div className="faq-page-cta__actions">
              <a href={site.phoneHref} className="btn-luxury-lg btn-luxury-lg--primary">
                Call {site.phoneDisplay}
              </a>
              <Link href="/contact-us" className="btn-luxury-lg btn-luxury-lg--secondary">
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
