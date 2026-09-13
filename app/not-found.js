import Link from "next/link";
import { site } from "@/lib/site";
import { 
  Home, 
  Phone, 
  Search, 
  HeartHandshake, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  ArrowRight,
  HelpCircle
} from "lucide-react";

export const metadata = {
  title: `Page Not Found | ${site.name}`,
  description:
    "The page you are looking for doesn't exist or has moved. Browse our in-home senior care services, service areas, or contact our York, PA team.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const quickLinks = [
    {
      title: "Personal Care",
      desc: "Bathing, dressing, grooming & mobility assistance.",
      href: "/personal-care",
      icon: <ShieldCheck size={20} className="text-primary" />,
    },
    {
      title: "Companion Care",
      desc: "Friendly social visits, meal prep & companionship.",
      href: "/companion-care",
      icon: <HeartHandshake size={20} className="text-primary" />,
    },
    {
      title: "24-Hour & Live-In Care",
      desc: "Around-the-clock continuous care and supervision.",
      href: "/24-hour-live-in-care",
      icon: <Clock size={20} className="text-primary" />,
    },
    {
      title: "Dementia & Alzheimer's Care",
      desc: "Specialized memory support and cognitive routines.",
      href: "/dementia-alzheimers-care",
      icon: <HelpCircle size={20} className="text-primary" />,
    },
  ];

  const popularAreas = [
    { name: "York County", href: "/areas-we-serve/york" },
    { name: "Lancaster County", href: "/areas-we-serve/lancaster" },
    { name: "Dauphin County (Harrisburg)", href: "/areas-we-serve/dauphin" },
    { name: "Cumberland County", href: "/areas-we-serve/cumberland" },
    { name: "Adams County (Gettysburg)", href: "/areas-we-serve/adams" },
  ];

  return (
    <main className="section" style={{ minHeight: "75vh", display: "flex", alignItems: "center", padding: "4rem 1rem" }}>
      <div className="container" style={{ maxWidth: "56rem", margin: "0 auto" }}>
        
        {/* Header Block */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span 
            style={{ 
              display: "inline-block", 
              padding: "0.35rem 1rem", 
              borderRadius: "9999px", 
              background: "rgba(139, 38, 53, 0.08)", 
              color: "#8B2635", 
              fontWeight: 700, 
              fontSize: "0.85rem",
              letterSpacing: "0.08em",
              marginBottom: "1rem" 
            }}
          >
            ERROR 404
          </span>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#1f2937", marginBottom: "1rem", lineHeight: 1.2 }}>
            We Couldn&apos;t Find That Page
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#4b5563", maxWidth: "38rem", margin: "0 auto 1.75rem", lineHeight: 1.6 }}>
            The page you requested may have moved, had its name changed, or is temporarily unavailable. Let us help you find what you need.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link 
              href="/" 
              className="btn btn--gradient"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Home size={18} />
              Return to Homepage
            </Link>
            <a 
              href={site.phoneHref}
              className="btn btn--outline"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Phone size={18} />
              Call (223) 260-9042
            </a>
          </div>
        </div>

        {/* Quick Service Directory */}
        <div style={{ background: "#ffffff", borderRadius: "1rem", padding: "2rem", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: "2.5rem", border: "1px solid #f3f4f6" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#111827", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Search size={20} style={{ color: "#8B2635" }} />
            Popular Care Services
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            {quickLinks.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                style={{ 
                  textDecoration: "none", 
                  padding: "1rem", 
                  borderRadius: "0.75rem", 
                  border: "1px solid #e5e7eb", 
                  display: "block",
                  transition: "all 0.2s ease",
                  background: "#fafafa"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                  {item.icon}
                  <span style={{ fontWeight: 600, color: "#1f2937", fontSize: "0.95rem" }}>{item.title}</span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Locations & Help */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          
          {/* Service Areas */}
          <div style={{ background: "#ffffff", borderRadius: "1rem", padding: "1.75rem", border: "1px solid #f3f4f6", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#111827", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <MapPin size={18} style={{ color: "#8B2635" }} />
              Service Areas in PA
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {popularAreas.map((area) => (
                <li key={area.href}>
                  <Link 
                    href={area.href} 
                    style={{ color: "#374151", textDecoration: "none", fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
                  >
                    <ArrowRight size={14} style={{ color: "#8B2635" }} />
                    {area.name}
                  </Link>
                </li>
              ))}
              <li style={{ marginTop: "0.5rem" }}>
                <Link href="/areas-we-serve" style={{ color: "#8B2635", fontWeight: 600, fontSize: "0.9rem", textDecoration: "underline" }}>
                  View all 10 PA counties &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Need Consultation */}
          <div style={{ background: "linear-gradient(135deg, #8B2635 0%, #681C28 100%)", borderRadius: "1rem", padding: "1.75rem", color: "#ffffff", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.75rem", color: "#ffffff" }}>
                Need Help Finding Care?
              </h3>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.5, marginBottom: "1.25rem" }}>
                Our care coordinators are here to answer your questions about Medicaid waiver programs, hourly care schedules, and free in-home assessments.
              </p>
            </div>
            <div>
              <Link 
                href="/contact-us"
                style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  gap: "0.5rem", 
                  width: "100%", 
                  padding: "0.75rem 1rem", 
                  borderRadius: "0.5rem", 
                  background: "#ffffff", 
                  color: "#8B2635", 
                  fontWeight: 600, 
                  textDecoration: "none",
                  fontSize: "0.95rem"
                }}
              >
                Schedule Free Consultation
              </Link>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
