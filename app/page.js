import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, HeartHandshake, ClipboardList } from "lucide-react";
import PageHero from "@/components/PageHero";
import Placeholder from "@/components/Placeholder";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import { services, site } from "@/lib/site";

export const metadata = {
  title: `In-Home Care Services in York, PA | ${site.name}`,
  description:
    "Blessed Hearts Homecare offers professional, compassionate in-home care services, companion care, housekeeping, and Medicaid waiver caregiver options in York, PA.",
  alternates: { canonical: "/" },
};

const whyUs = [
  {
    icon: ShieldCheck,
    title: "Licensed & Background-Checked",
    body: "Every caregiver is thoroughly screened, background-checked, and trained before joining a client's care team.",
  },
  {
    icon: ClipboardList,
    title: "Custom Care Plans",
    body: "We build each plan around your loved one's routines, preferences, and changing needs — never one-size-fits-all.",
  },
  {
    icon: HeartHandshake,
    title: "Care from the Heart",
    body: "Compassion guides everything we do, from the first phone call to every visit that follows.",
  },
];

export default function HomePage() {
  return (
    <>
      <PageHero
        variant="luxury"
        title="Compassionate In-Home Care, Designed Around Your Family"
        description="Blessed Hearts Homecare offers professional, compassionate in-home care services, companion care, and respite care designed to support independence at home with professional caregivers."
        mediaLabel="Compassionate caregivers smiling with a senior client at home"
        imageSrc="/images/newheader.png"
      />

      <section className="section" aria-labelledby="services-overview-heading">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">What We Offer</span>
            <h2 id="services-overview-heading">Our Core Services</h2>
            <p>
              From daily personal care to a friendly companion for the afternoon, our caregivers
              meet your family where you are.
            </p>
          </div>
          <ul className="grid grid--3">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug} className="card">
                <h3>{s.name}</h3>
                <p>{s.summary}</p>
                <Link href="/services">Learn more</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="why-choose-heading">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Why Choose Us</span>
            <h2 id="why-choose-heading">Care Families Can Rely On</h2>
          </div>
          <ul className="grid grid--3">
            {whyUs.map(({ icon: Icon, title, body }) => (
              <li key={title} className="card">
                <Icon size={32} color="var(--pink)" aria-hidden="true" />
                <h3 style={{ marginTop: "0.75rem" }}>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="promise-heading">
        <div className="container grid grid--2" style={{ alignItems: "center" }}>
          <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", minHeight: "24rem", position: "relative" }}>
            <Image
              src="/images/caregiver-kitchen.png"
              alt="Family caregiver assisting a senior client in their kitchen"
              fill
              sizes="(max-width: 40rem) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div>
            <span className="eyebrow">Our Promise</span>
            <h2 id="promise-heading">Independence, Dignity, and Comfort at Home</h2>
            <p>
              We know how personal the decision to bring in help can be. That&apos;s why every
              Blessed Hearts caregiver is matched thoughtfully, trained thoroughly, and held to
              the highest standard of compassionate, professional care.
            </p>
            <p>
              Serving {site.serviceAreas.join(", ")} — with 24/7 availability for the moments that
              can&apos;t wait.
            </p>
            <Link href="/about" className="btn btn--outline-plum">
              About Blessed Hearts
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />
      <CTASection />
    </>
  );
}
