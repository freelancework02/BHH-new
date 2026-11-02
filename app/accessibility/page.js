import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import Link from "next/link";
import AccessibilityToolbarTrigger from "./AccessibilityToolbarTrigger";

export const metadata = {
  title: "Accessibility Statement",
  description: `Learn about ${site.name}'s commitment to digital accessibility under ADA Title III, Section 508, and WCAG 2.1 Level AA standards. Contact us for accommodation requests.`,
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        title="Accessibility Statement"
        description="Our commitment to ensuring digital accessibility for individuals with disabilities."
        ctaLabel={null}
        mediaLabel="Illustration representing accessibility and inclusion for all individuals"
      />

      <section className="section">
        <div className="container" style={{ maxWidth: "52rem" }}>
          <p>
            <em>Last updated: October 2026</em>
          </p>

          <p>
            At <strong>{site.name}</strong>, we are deeply dedicated to facilitating the accessibility and usability of our website for all individuals, including people with disabilities, seniors, and their families. We believe everyone deserves equal, seamless access to critical home care information and resources.
          </p>

          <div
            style={{
              margin: "2rem 0",
              padding: "1.5rem",
              background: "#fff5f8",
              border: "2px solid #ff2d7a",
              borderRadius: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <h3 style={{ margin: 0, color: "#5a1a5e", fontSize: "1.15rem" }}>
              Quick Access: Interactive Accessibility Toolbar
            </h3>
            <p style={{ margin: 0, fontSize: "0.95rem" }}>
              You can adjust text size, contrast, typography, link highlights, and motion preferences at any time using our floating accessibility widget or by clicking the button below. You can also press <kbd style={{ background: "#eee", padding: "2px 6px", borderRadius: "4px" }}>Alt + A</kbd> anywhere on the site.
            </p>
            <div>
              <AccessibilityToolbarTrigger />
            </div>
          </div>

          <h2>Conformance Status</h2>
          <p>
            We strive to adhere to the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong> standards, developed by the World Wide Web Consortium (W3C), as well as the requirements of the <strong>Americans with Disabilities Act (ADA) Title III</strong> and <strong>Section 508 of the Rehabilitation Act</strong>.
          </p>
          <p>
            These guidelines explain how to make web content more accessible to people with a wide range of disabilities, including visual, auditory, cognitive, and motor impairments.
          </p>

          <h2>Accessibility Features on Our Website</h2>
          <p>Key technical measures implemented across this website include:</p>
          <ul>
            <li>
              <strong>Interactive ADA Accessibility Toolbar:</strong> Instant user controls for text resizing (+15% to +45%), high contrast, dark mode, monochrome display, dyslexia-friendly font, generous line spacing, link highlighting, and large cursor.
            </li>
            <li>
              <strong>Skip Navigation Link:</strong> A direct skip-to-content link for keyboard users to bypass header navigation and jump immediately to main page content.
            </li>
            <li>
              <strong>Keyboard Operability:</strong> All interactive elements, forms, modal dialogs, and navigation menus can be operated completely via keyboard without focus trapping.
            </li>
            <li>
              <strong>Semantic Structure:</strong> Consistent HTML5 landmarks (<code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;footer&gt;</code>) and hierarchical heading order (H1 through H4) to support screen readers.
            </li>
            <li>
              <strong>Color Contrast:</strong> Text and visual elements meet or exceed WCAG AA minimum contrast ratio guidelines (at least 4.5:1 for normal text).
            </li>
            <li>
              <strong>Alt Text & ARIA Labels:</strong> Meaningful alternative descriptions for informative images and <code>aria-hidden="true"</code> applied to decorative icons to prevent redundant screen reader announcements.
            </li>
            <li>
              <strong>Reduced Motion Respect:</strong> All CSS animations and transitions can be paused instantly, and the website respects user system preferences for reduced motion.
            </li>
          </ul>

          <h2>Compatibility with Browsers and Assistive Technology</h2>
          <p>
            {site.name}&apos;s website is designed to be compatible with modern web browsers, including:
          </p>
          <ul>
            <li>Google Chrome (Windows, macOS, Android, iOS)</li>
            <li>Mozilla Firefox (Windows, macOS, Linux)</li>
            <li>Apple Safari (macOS, iOS)</li>
            <li>Microsoft Edge (Windows, macOS)</li>
          </ul>
          <p>
            It is compatible with popular assistive technologies including NVDA, JAWS, VoiceOver, and TalkBack.
          </p>

          <h2>Language Assistance &amp; Limited English Proficiency (LEP)</h2>
          <p>
            Under Title VI of the Civil Rights Act of 1964, Section 1557 of the Affordable Care Act, and Pennsylvania Department of Human Services Medical Assistance Bulletins <strong>MA Bulletin 99-17-11 and 99-25-01</strong>, {site.name} provides free oral interpretation and translation services to individuals who have Limited English Proficiency (LEP).
          </p>
          <p>
            We support 19+ non-English languages—including Spanish, Chinese Mandarin, Nepali, Russian, Arabic, Haitian Creole, Vietnamese, Ukrainian, Chinese Cantonese, Portuguese, Bengali, French, Cambodian (Khmer), Korean, Gujarati, Hindi, Urdu, Burmese, and Albanian. Free Telecommunications Relay Service is also available via <strong>TTY: 711</strong>.
          </p>
          <p style={{ margin: "1rem 0 2rem 0" }}>
            <Link href="/language-assistance" className="btn btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              View Notice of Non-Discrimination &amp; Multilingual Taglines →
            </Link>
          </p>

          <h2>Feedback & Accommodations</h2>
          <p>
            We welcome your feedback on the accessibility of our site. If you encounter any accessibility barriers, require alternative document formats, or need assistance accessing care services, our team is ready to assist you promptly:
          </p>

          <ul>
            <li>
              <strong>Phone:</strong>{" "}
              <a href={site.phoneHref}>{site.phoneDisplay}</a>
            </li>
            <li>
              <strong>Fax:</strong> {site.faxDisplay}
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <strong>Office Address:</strong> {site.addressFull}
            </li>
            <li>
              <strong>Business Hours:</strong> Monday – Friday, 9:00 AM – 5:00 PM EST
            </li>
          </ul>

          <p>
            When contacting us, please specify the web page URL and the nature of the issue or accommodation needed so we can assist you as effectively as possible.
          </p>

          <p style={{ marginTop: "2rem" }}>
            <Link href="/" className="btn btn-secondary">
              ← Return to Home
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
