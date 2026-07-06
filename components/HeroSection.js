"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Phone,
  ArrowRight,
  Heart,
  ShieldCheck,
  Clock,
  Award,
  Home,
  Users,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { site } from "@/lib/site";

/* ─────────────────────────────────────────────
   Animation helpers
───────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut", delay },
});

const slideRight = (delay = 0) => ({
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
});

/* ─────────────────────────────────────────────
   Trust floating cards data
───────────────────────────────────────────── */
const TRUST_CARDS = [
  {
    id: "trusted-families",
    position: "top-right",
    icon: <Heart size={18} aria-hidden="true" />,
    title: "Trusted by Families",
    subtitle: "Serving South Central Pennsylvania",
    extra: "★★★★★",
    extraClass: "bhh-hero__card-stars",
  },
  {
    id: "support-247",
    position: "bottom-right",
    icon: <Clock size={18} aria-hidden="true" />,
    title: "24/7 Support",
    subtitle: "We\u2019re here whenever your family needs us.",
  },
  {
    id: "licensed-agency",
    position: "bottom-left",
    icon: <ShieldCheck size={18} aria-hidden="true" />,
    title: "Licensed Agency",
    subtitle: "Background Checked Caregivers",
  },
];

/* ─────────────────────────────────────────────
   Trust badge pills
───────────────────────────────────────────── */
const TRUST_BADGES = [
  { id: "tb-licensed", icon: <CheckCircle2 size={14} />, label: "Licensed Caregivers" },
  { id: "tb-bg", icon: <CheckCircle2 size={14} />, label: "Background Checked" },
  { id: "tb-plans", icon: <CheckCircle2 size={14} />, label: "Personalized Care Plans" },
  { id: "tb-medicaid", icon: <CheckCircle2 size={14} />, label: "Medicaid Accepted" },
  { id: "tb-insured", icon: <CheckCircle2 size={14} />, label: "Fully Insured" },
];

/* ─────────────────────────────────────────────
   Feature strip cards
───────────────────────────────────────────── */
const FEATURES = [
  {
    id: "feat-home",
    emoji: "🏠",
    title: "Stay at Home",
    desc: "Comfort of home with professional care.",
  },
  {
    id: "feat-compassion",
    emoji: "❤️",
    title: "Compassion First",
    desc: "Every visit centered around dignity and kindness.",
  },
  {
    id: "feat-personalized",
    emoji: "👥",
    title: "Personalized Care",
    desc: "Care plans tailored to every individual.",
  },
  {
    id: "feat-safety",
    emoji: "🛡",
    title: "Safety & Trust",
    desc: "Licensed, insured, and background checked.",
  },
];

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const motion_v = prefersReducedMotion
    ? { initial: {}, animate: {}, transition: {} }
    : undefined;

  return (
    <section
      className="bhh-hero"
      aria-label="Blessed Hearts Homecare — Compassionate In-Home Care"
    >
      {/* ── Layered Background ── */}
      <div className="bhh-hero__bg" aria-hidden="true">
        {/* Radial gradient orbs */}
        <div className="bhh-hero__bg-orb bhh-hero__bg-orb--pink" />
        <div className="bhh-hero__bg-orb bhh-hero__bg-orb--peach" />
        <div className="bhh-hero__bg-orb bhh-hero__bg-orb--plum" />
        <div className="bhh-hero__bg-orb bhh-hero__bg-orb--coral" />

        {/* Dot grid pattern */}
        <div className="bhh-hero__bg-dots" />

        {/* Subtle heart watermark */}
        <div className="bhh-hero__bg-hearts" aria-hidden="true">
          {[...Array(9)].map((_, i) => (
            <span key={i} className="bhh-hero__bg-heart" aria-hidden="true">
              ♡
            </span>
          ))}
        </div>

        {/* Decorative lines */}
        <div className="bhh-hero__bg-line bhh-hero__bg-line--1" />
        <div className="bhh-hero__bg-line bhh-hero__bg-line--2" />
      </div>

      {/* ── Main Content Grid ── */}
      <div className="bhh-hero__container">
        <div className="bhh-hero__grid">
          {/* ════════════════════════════
              LEFT — Content Column
          ════════════════════════════ */}
          <div className="bhh-hero__content">
            {/* Eyebrow */}
            <motion.div
              className="bhh-hero__eyebrow"
              {...(prefersReducedMotion ? {} : fadeUp(0.05))}
            >
              <MapPin size={14} className="bhh-hero__eyebrow-icon" aria-hidden="true" />
              <span>
                Serving York, Lancaster, Adams, Cumberland &amp; Surrounding Counties
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="bhh-hero__heading"
              {...(prefersReducedMotion ? {} : fadeUp(0.18))}
            >
              Compassionate
              <br />
              In-Home Care,
              <br />
              <span className="bhh-hero__heading-highlight">
                Designed Around
                <br />
                Your Family
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="bhh-hero__desc"
              {...(prefersReducedMotion ? {} : fadeUp(0.32))}
            >
              Blessed Hearts Homecare provides personalized in-home care that helps
              seniors and adults with disabilities live safely, comfortably, and
              independently in the place they love most&mdash;their home.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="bhh-hero__actions"
              {...(prefersReducedMotion ? {} : fadeUp(0.44))}
            >
              {/* Primary */}
              <Link
                href="/contact-us"
                id="hero-request-care-btn"
                className="bhh-hero__btn-primary"
                aria-label="Request home care services"
              >
                <Heart size={18} className="bhh-hero__btn-icon" aria-hidden="true" />
                Request Care
                <ArrowRight
                  size={18}
                  className="bhh-hero__btn-arrow"
                  aria-hidden="true"
                />
              </Link>

              {/* Secondary */}
              <a
                href={site.phoneHref}
                id="hero-call-btn"
                className="bhh-hero__btn-secondary"
                aria-label={`Call us at ${site.phoneDisplay}`}
              >
                <Phone size={17} className="bhh-hero__btn-icon" aria-hidden="true" />
                <span>
                  <span className="bhh-hero__btn-secondary-label">Call Now</span>
                  <span className="bhh-hero__btn-secondary-number">
                    {site.phoneDisplay}
                  </span>
                </span>
              </a>
            </motion.div>

            {/* Trust Badge Pills */}
            <motion.div
              className="bhh-hero__trust-pills"
              {...(prefersReducedMotion ? {} : fadeUp(0.56))}
              aria-label="Trust certifications"
            >
              {TRUST_BADGES.map((badge, i) => (
                <motion.span
                  key={badge.id}
                  className="bhh-hero__trust-pill"
                  whileHover={prefersReducedMotion ? {} : { y: -2, scale: 1.04 }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: prefersReducedMotion ? 0 : 0.65 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <span className="bhh-hero__trust-pill-icon" aria-hidden="true">
                    {badge.icon}
                  </span>
                  {badge.label}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* ════════════════════════════
              RIGHT — Artwork Column
          ════════════════════════════ */}
          <div className="bhh-hero__artwork-col" aria-hidden="false">
            {/* Ambient blobs behind image */}
            <div className="bhh-hero__art-blob bhh-hero__art-blob--1" aria-hidden="true" />
            <div className="bhh-hero__art-blob bhh-hero__art-blob--2" aria-hidden="true" />
            <div className="bhh-hero__art-blob bhh-hero__art-blob--3" aria-hidden="true" />

            {/* Floating decorative circles */}
            <div
              className="bhh-hero__deco-circle bhh-hero__deco-circle--1"
              aria-hidden="true"
            />
            <div
              className="bhh-hero__deco-circle bhh-hero__deco-circle--2"
              aria-hidden="true"
            />
            <div
              className="bhh-hero__deco-circle bhh-hero__deco-circle--3"
              aria-hidden="true"
            />

            {/* Small dot matrix */}
            <div className="bhh-hero__art-dots" aria-hidden="true">
              {[...Array(20)].map((_, i) => (
                <span key={i} className="bhh-hero__art-dot" aria-hidden="true" />
              ))}
            </div>

            {/* Organic shape frame behind image */}
            <div className="bhh-hero__art-frame" aria-hidden="true" />

            {/* Main artwork image — floated */}
            <motion.div
              className="bhh-hero__art-img-wrap"
              {...(prefersReducedMotion ? {} : slideRight(0.25))}
            >
              <motion.div
                className="bhh-hero__art-float"
                animate={
                  prefersReducedMotion
                    ? {}
                    : { y: [0, -14, 0], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } }
                }
              >
                <Image
                  src="/images/mainheader.png"
                  alt="Caring caregiver smiling with an elderly woman at home — Blessed Hearts Homecare"
                  fill
                  sizes="(max-width: 56rem) 100vw, 55vw"
                  priority
                  style={{ objectFit: "contain", objectPosition: "bottom center" }}
                  className="bhh-hero__art-img"
                />
              </motion.div>
            </motion.div>

            {/* ── Floating Trust Cards ── */}

            {/* Top-Right: Trusted by Families */}
            <motion.div
              className="bhh-hero__float-card bhh-hero__float-card--top-right"
              {...(prefersReducedMotion ? {} : { ...fadeIn(0.7), whileHover: { y: -4, scale: 1.02 } })}
              aria-label="Trusted by families, 5 star rating, serving South Central Pennsylvania"
            >
              <div className="bhh-hero__fc-icon bhh-hero__fc-icon--pink">
                <Heart size={16} aria-hidden="true" />
              </div>
              <div className="bhh-hero__fc-body">
                <p className="bhh-hero__fc-title">Trusted by Families</p>
                <p className="bhh-hero__fc-stars" aria-label="5 stars">
                  ★★★★★
                </p>
                <p className="bhh-hero__fc-sub">Serving South Central Pennsylvania</p>
              </div>
            </motion.div>

            {/* Bottom-Right: 24/7 Support */}
            <motion.div
              className="bhh-hero__float-card bhh-hero__float-card--bottom-right"
              {...(prefersReducedMotion ? {} : { ...fadeIn(0.88), whileHover: { y: -4, scale: 1.02 } })}
              aria-label="24/7 Support available whenever your family needs us"
            >
              <div className="bhh-hero__fc-icon bhh-hero__fc-icon--coral">
                <Clock size={16} aria-hidden="true" />
              </div>
              <div className="bhh-hero__fc-body">
                <p className="bhh-hero__fc-title">24/7 Support</p>
                <p className="bhh-hero__fc-sub">
                  We&rsquo;re here whenever your family needs us.
                </p>
              </div>
            </motion.div>

            {/* Left: Licensed */}
            <motion.div
              className="bhh-hero__float-card bhh-hero__float-card--left"
              {...(prefersReducedMotion ? {} : { ...fadeIn(1.0), whileHover: { y: -4, scale: 1.02 } })}
              aria-label="Licensed agency with background checked caregivers"
            >
              <div className="bhh-hero__fc-icon bhh-hero__fc-icon--plum">
                <ShieldCheck size={16} aria-hidden="true" />
              </div>
              <div className="bhh-hero__fc-body">
                <p className="bhh-hero__fc-title">Licensed Agency</p>
                <p className="bhh-hero__fc-sub">Background Checked Caregivers</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Feature Strip ── */}
      <motion.div
        className="bhh-hero__feature-strip"
        {...(prefersReducedMotion ? {} : fadeUp(0.7))}
        aria-label="Key features of Blessed Hearts Homecare"
      >
        <div className="bhh-hero__container">
          <div className="bhh-hero__features">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.id}
                className="bhh-hero__feat-card"
                whileHover={prefersReducedMotion ? {} : { y: -5, scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="bhh-hero__feat-emoji" role="img" aria-hidden="true">
                  {feat.emoji}
                </span>
                <div>
                  <p className="bhh-hero__feat-title">{feat.title}</p>
                  <p className="bhh-hero__feat-desc">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
