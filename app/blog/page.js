"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Placeholder from "@/components/Placeholder";
import CTASection from "@/components/CTASection";
import { blogPosts } from "@/lib/site";
import { Calendar, ArrowRight, BookOpen, Layers, ShieldCheck } from "lucide-react";

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
    <>
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
      <section className="section why-us-luxury" aria-labelledby="latest-articles-heading">
        <div className="container">
          
          {/* Category Filter Tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "3.5rem" }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={activeCategory === cat.id ? "btn-luxury-primary-small" : "btn-luxury-secondary-small"}
                style={{ cursor: "pointer", border: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
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
              <div className="service-row-luxury" style={{ gap: "3.5rem" }}>
                {/* Thumbnail */}
                <div className="service-row-luxury__media">
                  <div className="service-row-luxury__image-container" style={{ height: "22rem" }}>
                    <Placeholder label={featuredPost.title} />
                  </div>
                </div>

                {/* Content */}
                <div className="service-row-luxury__content">
                  <div className="service-row-luxury__card" style={{ height: "100%", justifyContent: "center", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "#666666", marginBottom: "0.75rem" }}>
                      <Calendar size={14} className="trust-badge-check" />
                      <time dateTime={featuredPost.date}>{formatDate(featuredPost.date)}</time>
                      <span style={{ color: "var(--pink)", fontWeight: 700, marginLeft: "0.5rem", textTransform: "uppercase", fontSize: "0.75rem" }}>
                        {featuredPost.categoryId === "waiver" ? "Medicaid Waiver" : "Caregiver Tips"}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--plum)", lineHeight: "1.3", marginBottom: "1rem" }}>
                      <Link href={`/blog/${featuredPost.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                        {featuredPost.title}
                      </Link>
                    </h3>

                    <p style={{ fontSize: "1rem", color: "#555555", lineHeight: "1.6", marginBottom: "2rem" }}>
                      {featuredPost.excerpt}
                    </p>

                    <div>
                      <Link href={`/blog/${featuredPost.slug}`} className="btn-luxury-primary-small" style={{ textDecoration: "none" }}>
                        Read Article <ArrowRight size={14} style={{ marginLeft: "0.25rem" }} />
                      </Link>
                    </div>
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
            <div className="why-us-grid-luxury" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))", gap: "2rem" }}>
              {standardPosts.map((post) => (
                <div key={post.slug} className="review-card-luxury" style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ borderRadius: "1rem", overflow: "hidden", minHeight: "11rem", marginBottom: "1.25rem", position: "relative" }}>
                    <Placeholder label={post.title} />
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "#666666", marginBottom: "0.75rem" }}>
                    <Calendar size={14} className="trust-badge-check" />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>

                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--plum)", lineHeight: "1.35", marginBottom: "0.85rem" }}>
                    <Link href={`/blog/${post.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {post.title}
                    </Link>
                  </h3>

                  <p style={{ fontSize: "0.9rem", color: "#555555", lineHeight: "1.6", marginBottom: "1.5rem", flexGrow: 1 }}>
                    {post.excerpt}
                  </p>

                  <div>
                    <Link href={`/blog/${post.slug}`} className="btn-luxury-secondary-small" style={{ textDecoration: "none", width: "100%", justifyContent: "center", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                      Read Article <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: "center", padding: "3rem", color: "#777777" }}>No articles found in this category.</p>
          )}

        </div>
      </section>

      <CTASection />
    </>
  );
}
