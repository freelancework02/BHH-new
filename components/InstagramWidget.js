import Image from "next/image";

export default function InstagramWidget() {
  return (
    <section className="section section--alt instagram-section" aria-labelledby="instagram-heading" style={{ paddingTop: "4.5rem", paddingBottom: "5.5rem" }}>
      <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        
        {/* Section Heading */}
        <div className="section-heading-luxury" style={{ marginBottom: "2.5rem", alignItems: "center", textAlign: "center" }}>
          <span className="eyebrow-luxury-accent">INSTAGRAM FEED</span>
          <h2 id="instagram-heading" className="section-title-luxury" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
            Follow Our Care Journey
          </h2>
          <p className="section-subtitle-luxury" style={{ maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
            See how our caregivers bring comfort, safety, and warm companionship to client families every single day.
          </p>
        </div>

        {/* Instagram Image Widget Wrapper */}
        <a 
          href="https://www.instagram.com/blessedhearts.homecare/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="instagram-widget-card"
          aria-label="View Blessed Hearts on Instagram (@blessedhearts.homecare)"
          style={{ textDecoration: "none", display: "block" }}
        >
          <div className="instagram-image-wrapper">
            <Image
              src="/images/instagram-widget.png"
              alt="Blessed Hearts Homecare Instagram feed showing caregivers, clients, and senior activities"
              fill
              sizes="(max-width: 68rem) 100vw, 1100px"
              className="instagram-img"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </a>

      </div>
    </section>
  );
}
