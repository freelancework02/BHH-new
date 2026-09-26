import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import Placeholder from "./Placeholder";
import { site } from "@/lib/site";

export default function PageHero({
  variant = "standard",
  eyebrow,
  title,
  description,
  ctaLabel = "Request Care",
  ctaHref = "/contact-us",
  mediaLabel = "Caregiver supporting a client at home",
  imageSrc,
}) {
  const isLuxury = variant === "luxury";
  const isServices = variant === "services";
  const isLight = isLuxury || isServices;

  return (
    <section className={`hero ${isLuxury ? "hero--luxury" : ""} ${isServices ? "hero--services" : ""}`}>
      {/* Background Decor (Light variants only) */}
      {isLight && (
        <div className="hero__decorations-luxury" aria-hidden="true">
          <div className="hero__bg-circle hero__bg-circle--1" />
          <div className="hero__bg-circle hero__bg-circle--2" />
          <div className="hero__bg-circle hero__bg-circle--3" />
          <div className="hero__bg-dots" />
        </div>
      )}

      {!isLight && <div className="hero__blob" aria-hidden="true" />}

      <div className={`container ${isLight ? "hero__inner-luxury" : "hero__inner"}`}>
        <div className={isLight ? "hero__content-luxury" : "hero__content"}>
          {isLight ? (
            <>
              {/* Uppercase Small Label */}
              {eyebrow ? (
                <span className="hero__eyebrow-luxury">{eyebrow}</span>
              ) : (
                <span className="hero__eyebrow-luxury">YORK, PA &amp; SURROUNDING COUNTIES</span>
              )}
              
              {/* Huge Deep Plum Heading */}
              <h1 className="hero__title-luxury">{title}</h1>
              
              {/* Open Sans Description */}
              <p className="hero__desc-luxury">{description}</p>
              
              {/* Custom Buttons */}
              <div className="hero__actions-luxury">
                <Link href={ctaHref} className="btn-luxury-primary">
                  {ctaLabel}
                  <svg className="btn-luxury-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 18, height: 18 }}>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
                {isLuxury && (
                  <a href={site.phoneHref} className="btn-luxury-secondary">
                    <Phone size={18} aria-hidden="true" />
                    Call Now: {site.phoneDisplay}
                  </a>
                )}
              </div>

              {/* Trust Indicators Cards (Luxury/Home page only) */}
              {isLuxury && (
                <div className="hero__trust-badges-luxury">
                  <div className="trust-badge-luxury">
                    <span className="trust-badge-check" aria-hidden="true">✓</span>
                    <span>Licensed Caregivers</span>
                  </div>
                  <div className="trust-badge-luxury">
                    <span className="trust-badge-check" aria-hidden="true">✓</span>
                    <span>Background Checked</span>
                  </div>
                  <div className="trust-badge-luxury">
                    <span className="trust-badge-check" aria-hidden="true">✓</span>
                    <span>Personalized Care Plans</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {eyebrow && <span className="eyebrow hero__eyebrow-standard">{eyebrow}</span>}
              <h1 className="hero__title">{title}</h1>
              {description && <p className="hero__desc">{description}</p>}
              {ctaLabel && (
                <Link href={ctaHref} className="btn btn--gradient hero__cta">
                  {ctaLabel}
                </Link>
              )}
            </>
          )}
        </div>

        {isLight ? (
          <div className="hero__media-container-luxury">
            <div className={`hero__media-luxury ${isServices ? "hero__media-services" : ""}`}>
              {/* Organic Gradient Circle Backdrop */}
              <div className="hero__circle-bg-luxury" aria-hidden="true" />
              
              {/* Behind Blurs */}
              <div className="hero__blur-blob-luxury" aria-hidden="true" />
              <div className="hero__blur-blob-luxury-2" aria-hidden="true" />
              
              {/* Floating dots matrix (Luxury/Home page only) */}
              {isLuxury && (
                <div className="hero__dot-grid-luxury" aria-hidden="true">
                  {[...Array(16)].map((_, i) => (
                    <span key={i} className="hero__dot-luxury" />
                  ))}
                </div>
              )}

              {/* Main Visual Image */}
              <div className={`hero__image-wrapper-luxury ${isServices ? "hero__image-wrapper-services" : ""}`}>
                <Image
                  src={imageSrc}
                  alt={mediaLabel}
                  fill
                  sizes="(max-width: 56rem) 100vw, 55vw"
                  priority
                  unoptimized={imageSrc ? (imageSrc.startsWith("/") || !imageSrc.includes("unsplash")) : false}
                  style={{ objectFit: "cover" }}
                  className={`animate-levitate ${isServices ? "hero__img-services" : "hero__img-luxury"}`}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="hero__media-container">
            <div className="hero__media animate-scale-up">
              {imageSrc ? (
                <div className="hero__image-wrapper">
                  <Image
                    src={imageSrc}
                    alt={mediaLabel}
                    fill
                    sizes="(max-width: 56rem) 100vw, 50vw"
                    priority
                    unoptimized={imageSrc ? (imageSrc.startsWith("/") || !imageSrc.includes("unsplash")) : false}
                    style={{ objectFit: "cover" }}
                    className="hero__img"
                  />
                </div>
              ) : (
                <Placeholder label={mediaLabel} />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
