"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import styles from "./Header.module.css";
import { navLinks, site } from "@/lib/site";
import { countiesData } from "@/lib/countiesData";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close mobile menu and dropdown on route change or screen resize
  useEffect(() => {
    setOpen(false);
    setMobileDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setOpen(false);
        setMobileDropdownOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" aria-label={`${site.name} home`} onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        {open && <div className={styles.backdrop} onClick={() => setOpen(false)} aria-hidden="true" />}

        <nav
          id="primary-navigation"
          className={`${styles.nav} ${open ? styles.navOpen : ""}`}
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            if (link.href === "/areas-we-serve") {
              return (
                <div key={link.href} className={styles.dropdownContainer}>
                  <div className={styles.dropdownTriggerWrapper}>
                    <Link
                      href={link.href}
                      className={`${styles.navLink} ${styles.dropdownTrigger}`}
                      aria-current={pathname.startsWith("/areas-we-serve") ? "page" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      className={styles.dropdownMobileToggle}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setMobileDropdownOpen(!mobileDropdownOpen);
                      }}
                      aria-expanded={mobileDropdownOpen}
                      aria-label="Toggle areas we serve submenus"
                    >
                      <ChevronDown size={16} className={`${styles.chevron} ${mobileDropdownOpen ? styles.chevronOpen : ""}`} />
                    </button>
                    <ChevronDown size={14} className={`${styles.chevron} ${styles.desktopChevron}`} />
                  </div>
                  <div className={`${styles.dropdownMenu} ${mobileDropdownOpen ? styles.mobileDropdownOpen : ""}`}>
                    <Link
                      href="/areas-we-serve"
                      className={styles.dropdownItem}
                      onClick={() => setOpen(false)}
                    >
                      All Counties
                    </Link>
                    {Object.values(countiesData).map((county) => (
                      <Link
                        key={county.slug}
                        href={`/areas-we-serve/${county.slug}`}
                        className={styles.dropdownItem}
                        onClick={() => setOpen(false)}
                      >
                        {county.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={styles.navLink}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/contact-us" className="btn btn--gradient" onClick={() => setOpen(false)}>
            Request Care
          </Link>
        </nav>

        <div className={styles.right}>
          <a href={site.phoneHref} className={styles.phone}>
            <span>Call us today</span>
            <strong>
              <Phone size={14} aria-hidden="true" style={{ display: "inline", marginRight: 4 }} />
              {site.phoneDisplay}
            </strong>
          </a>
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="primary-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
