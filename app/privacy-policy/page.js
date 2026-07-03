import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects the information you share with us.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        description="Your trust matters to us. Here's how we handle the information you share."
        ctaLabel={null}
        mediaLabel="Illustration representing data privacy and protection"
      />

      <section className="section">
        <div className="container" style={{ maxWidth: "48rem" }}>
          <p>
            <em>Last updated: July 2026</em>
          </p>

          <h2>Information We Collect</h2>
          <p>
            When you submit a contact form, request care, or sign up for our newsletter, we may
            collect your name, phone number, email address, city, zip code, and any details you
            choose to share about your care needs.
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            We use the information you provide to respond to inquiries, schedule consultations,
            coordinate care services, and, if you opt in, send occasional newsletter updates. We
            do not sell your personal information.
          </p>

          <h2>SMS &amp; Text Communications</h2>
          <p>
            If you opt in to receive text messages from {site.name}, message and data rates may
            apply and message frequency may vary. You can reply STOP at any time to opt out, or
            HELP for assistance. Mobile information is not shared with third parties for marketing
            or promotional purposes.
          </p>

          <h2>Cookies &amp; Analytics</h2>
          <p>
            Our website may use standard analytics tools to understand how visitors use the site,
            helping us improve content and performance. This data is aggregated and does not
            identify you personally.
          </p>

          <h2>Data Security</h2>
          <p>
            We take reasonable administrative and technical measures to protect the information
            you share with us. However, no method of transmission over the internet is completely
            secure.
          </p>

          <h2>Your Choices</h2>
          <p>
            You may request access to, correction of, or deletion of your personal information at
            any time by contacting us at{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> or {site.phoneDisplay}.
          </p>

          <h2>Contact Us</h2>
          <p>
            {site.name}
            <br />
            {site.address.line1}, {site.address.city}, {site.address.state} {site.address.zip}
            <br />
            <a href={`mailto:${site.email}`}>{site.email}</a> &middot;{" "}
            <a href={site.phoneHref}>{site.phoneDisplay}</a>
          </p>
        </div>
      </section>
    </>
  );
}
