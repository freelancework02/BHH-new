"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import InstagramWidget from "@/components/InstagramWidget";
import GoogleReviews from "@/components/GoogleReviews";
import { blogPosts } from "@/lib/site";
import { 
  Calendar, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Heart,
  ChevronRight
} from "lucide-react";
import "./blog.css";

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Add categories mapping helper
const categories = [
  { id: "all", label: "All Topics" },
  { id: "waiver", label: "Medicaid Waiver" },
  { id: "tips", label: "Caregiver Tips" }
];

export default function BlogIndexPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Determine tag dynamically
  const postsWithCategory = blogPosts.map(post => {
    let catId = "tips";
    if (post.slug.includes("waiver") || post.slug.includes("medicaid")) {
      catId = "waiver";
    }
    return { ...post, categoryId: catId };
  });

  const filteredPosts = activeCategory === "all" 
    ? postsWithCategory 
    : postsWithCategory.filter(p => p.categoryId === activeCategory);

  // Separate the very first article as our "Featured Post" (only when category is "all")
  const featuredPost = activeCategory === "all" ? postsWithCategory[0] : null;
  const standardPosts = activeCategory === "all" ? filteredPosts.slice(1) : filteredPosts;

  return (
    <div className="blog-page-wrapper">
      <PageHero
        variant="services"
        eyebrow="RESOURCES &amp; GUIDES"
        title="Blessed Hearts Resource Hub"
        description="Practical guidance on senior care, caregiving, and navigating home care options in Pennsylvania."
        ctaLabel={null}
        mediaLabel="Caregiver reading with a senior client"
        imageSrc="/images/caregiver-meeting.png"
      />

      {/* Blog Resource Hub Section */}
      <section className="section" style={{ padding: "80px 0" }} aria-labelledby="latest-articles-heading">
        <div className="container">
          
          {/* Category Filter Tabs */}
          <div className="blog-filter-container">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`blog-filter-btn ${activeCategory === cat.id ? "blog-filter-btn--active" : ""}`}
              >
                {cat.id === "all" && <Layers size={14} />}
                {cat.id === "waiver" && <ShieldCheck size={14} />}
                {cat.id === "tips" && <BookOpen size={14} />}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Featured Post Card (1 Column full width) */}
          {featuredPost && (
            <div style={{ marginBottom: "4rem" }}>
              <div className="section-heading-luxury" style={{ alignItems: "flex-start", textAlign: "left", marginBottom: "1.5rem" }}>
                <span className="eyebrow-luxury-accent">FEATURED ARTICLE</span>
              </div>
              <div className="blog-featured-row">
                {/* Thumbnail */}
                <div className="blog-featured-media">
                  <Image
                    src="/images/caregiver-meeting.png"
                    alt={featuredPost.title}
                    fill
                    priority
                    className="blog-featured-img"
                    sizes="(max-width: 64rem) 100vw, 50vw"
                  />
                </div>

                {/* Content */}
                <div className="blog-featured-content">
                  <div className="blog-meta-row">
                    <div className="blog-meta-date">
                      <Calendar size={14} className="trust-badge-check" style={{ color: "var(--pink)" }} />
                      <time dateTime={featuredPost.date}>{formatDate(featuredPost.date)}</time>
                    </div>
                    <span className="blog-category-badge">
                      {featuredPost.categoryId === "waiver" ? "Medicaid Waiver" : "Caregiver Tips"}
                    </span>
                  </div>

                  <h3 className="blog-featured-title">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h3>

                  <p className="blog-featured-excerpt">
                    {featuredPost.excerpt}
                  </p>

                  <div>
                    <Link href={`/blog/${featuredPost.slug}`} className="btn-luxury-lg btn-luxury-lg--primary" style={{ display: "inline-flex", textDecoration: "none", padding: "0.85rem 1.75rem", fontSize: "0.85rem" }}>
                      Read Article <ArrowRight size={14} style={{ marginLeft: "0.25rem" }} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Articles list grid */}
          <div className="section-heading-luxury" style={{ alignItems: "flex-start", textAlign: "left", marginBottom: "2rem" }}>
            <span className="eyebrow-luxury-accent">
              {activeCategory === "all" ? "MORE ARTICLES" : `${categories.find(c => c.id === activeCategory).label} Articles`}
            </span>
          </div>

          {standardPosts.length > 0 ? (
            <div className="blog-grid">
              {standardPosts.map((post) => (
                <article key={post.slug} className="blog-card">
                  <div className="blog-card-media">
                    <Image
                      src="/images/caregiver-meeting.png"
                      alt={post.title}
                      fill
                      loading="lazy"
                      className="blog-card-img"
                      sizes="(max-width: 48rem) 100vw, 30vw"
                    />
                  </div>
                  
                  <div className="blog-card-body">
                    <div className="blog-meta-row">
                      <div className="blog-meta-date">
                        <Calendar size={14} style={{ color: "var(--pink)" }} />
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                      </div>
                    </div>

                    <h3 className="blog-card-title">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="blog-card-excerpt">
                      {post.excerpt}
                    </p>

                    <div style={{ marginTop: "auto" }}>
                      <Link href={`/blog/${post.slug}`} className="btn-luxury-secondary-small" style={{ textDecoration: "none", width: "100%", justifyContent: "center", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                        Read Article <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: "center", padding: "3rem", color: "#777777" }}>No articles found in this category.</p>
          )}

        </div>
      </section>

      {/* SECTION: Discover How Blessed Hearts Homecare Enhances Lives */}
      <section className="blog-info-section" aria-labelledby="blog-info-title">
        <div className="container">
          <div className="blog-info-grid">
            
            <div className="blog-info-content">
              <div className="areas-hero-badge" style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "rgba(255, 45, 122, 0.08)", padding: "0.5rem 1rem", borderRadius: "100px", color: "var(--pink)", fontWeight: 750, fontSize: "0.8rem", textTransform: "uppercase" }}>
                <Heart size={12} fill="currentColor" /> Elevating Senior Life
              </div>
              <h2 id="blog-info-title" className="blog-info-title">
                How Blessed Hearts Homecare Enhances Your Loved One’s Life
              </h2>
              <p className="blog-info-desc">
                At Blessed Hearts Homecare, we are deeply committed to delivering high-quality, licensed in-home care services that prioritize the comfort, security, and personal dignity of our clients. Our dedicated caregiving team focuses on providing attentive, fully personalized support that helps seniors live active and fulfilling lives in their own homes.
              </p>
              <p className="blog-info-desc" style={{ marginBottom: "2.5rem" }}>
                Discover how our customized home care plans can ease daily tasks and bring vital peace of mind to your family. Ready to discuss your loved one’s specific care goals?
              </p>
              <div>
                <Link href="/contact-us" className="btn-luxury-lg btn-luxury-lg--primary" style={{ display: "inline-flex", textDecoration: "none" }}>
                  Schedule Consultation <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right Card Panel */}
            <div className="blog-info-card">
              <h3>Get In Touch</h3>
              <p>
                Have questions about licensed hours, Medicaid Waiver support, or scheduling? Reach out to our local coordinators today.
              </p>

              <div className="blog-info-contacts">
                <div className="blog-contact-row">
                  <Phone size={16} style={{ color: "var(--pink)" }} />
                  <span>
                    <strong>Call Us:</strong> <a href="tel:2232609042">(223) 260-9042</a>
                  </span>
                </div>
                <div className="blog-contact-row">
                  <Mail size={16} style={{ color: "var(--pink)" }} />
                  <span>
                    <strong>Email:</strong> <a href="mailto:info@blessedheartshomecare.com">info@blessedheartshomecare.com</a>
                  </span>
                </div>
              </div>

              <div style={{ borderTop: "1px solid rgba(0, 0, 0, 0.06)", paddingTop: "1.5rem", fontSize: "0.9rem", color: "#666", lineHeight: "1.5" }}>
                <p style={{ margin: 0, fontStyle: "italic" }}>
                  Take the first step towards securing compassionate, reliable home care. We look forward to hearing from you!
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: Google Reviews (CUSTOM CLONE) */}
      <section className="section" aria-label="Google Reviews" style={{ padding: "80px 0", backgroundColor: "var(--white)" }}>
        <div className="container">
          <GoogleReviews />
        </div>
      </section>

      {/* SECTION: Instagram Widget */}
      <InstagramWidget />

      {/* FOOTER CTA SECTION */}
      <CTASection />
    </div>
  );
}
