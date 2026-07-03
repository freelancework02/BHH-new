import Link from "next/link";
import { site } from "@/lib/site";

export default function CTASection() {
  return (
    <section className="section section--plum text-center" aria-labelledby="cta-heading">
      <div className="container" style={{ maxWidth: "42rem" }}>
        <h2 id="cta-heading">
          Learn How {site.name} Can Enhance Your Loved One&apos;s Life
        </h2>
        <p style={{ color: "rgba(255,255,255,0.85)" }}>
          Contact us to schedule a free consultation. Email{" "}
          <a href={`mailto:${site.email}`} style={{ color: "#ffd9b3" }}>
            {site.email}
          </a>{" "}
          or call{" "}
          <a href={site.phoneHref} style={{ color: "#ffd9b3" }}>
            {site.phoneDisplay}
          </a>
          .
        </p>
        <Link href="/contact-us" className="btn btn--gradient">
          Request Care
        </Link>
      </div>
    </section>
  );
}
