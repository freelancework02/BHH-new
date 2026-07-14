"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight, Heart } from "lucide-react";
import { blogPosts } from "@/lib/site";

// Map slugs to standard local assets
const postImages = {
  "medicaid-waiver-programs-pa": "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SG9tZWNhcmV8ZW58MHx8MHx8fDA%3D",
  "signs-loved-one-needs-home-care": "https://images.unsplash.com/photo-1765896387387-0538bc9f997e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8SG9tZWNhcmV8ZW58MHx8MHx8fDA%3D",
  "caregiver-burnout-family-caregivers": "https://plus.unsplash.com/premium_photo-1664475811964-75af7d90ee4b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SG9tZWNhcmV8ZW58MHx8MHx8fDA%3D",
  "creating-safe-home-for-seniors": "https://plus.unsplash.com/premium_photo-1663134144095-a1cf58ce152f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvbWVjYXJlfGVufDB8MXwwfHx8MA%3D%3D",
};

const postCategories = {
  "medicaid-waiver-programs-pa": "Medicaid Waiver",
  "signs-loved-one-needs-home-care": "Caregiver Tips",
  "caregiver-burnout-family-caregivers": "Companion Care",
  "creating-safe-home-for-seniors": "Home Safety",
};

const postReadTimes = {
  "medicaid-waiver-programs-pa": "5 min read",
  "signs-loved-one-needs-home-care": "4 min read",
  "caregiver-burnout-family-caregivers": "5 min read",
  "creating-safe-home-for-seniors": "6 min read",
};

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function KnowledgeHub() {
  // We select the first post as Featured, and the next three as Standard Cards
  const featuredPost = blogPosts[0];
  const standardPosts = blogPosts.slice(1, 4);

  return (
    <section className="hub-luxury-section" aria-labelledby="hub-heading">
      {/* Visual backdrops */}
      <div className="hub-luxury-bg-blob" aria-hidden="true" />
      <div className="hub-luxury-bg-blob-2" aria-hidden="true" />

      <div className="container">
        
        {/* Section Header */}
        <div className="hub-luxury-header">
          <div className="hub-luxury-badge-wrapper">
            <span className="hub-luxury-badge">HEALTH &amp; CARE RESOURCES</span>
          </div>
          <h2 id="hub-heading" className="hub-luxury-title">
            Helpful Resources<br />For Families &amp; Caregivers
          </h2>
          <p className="hub-luxury-intro">
            Blessed Hearts Homecare shares expert advice, caregiving tips, safety guidance, wellness information, and practical resources for families caring for loved ones.
          </p>
        </div>

        {/* 1. Featured Article (Editorial 2-Column Banner) */}
        {featuredPost && (
          <article className="hub-featured-card" aria-label="Featured Article">
            
            {/* Image Box */}
            <div className="hub-featured-media">
              <div className="hub-featured-image-wrapper">
                <Image
                  src={postImages[featuredPost.slug] || "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SG9tZWNhcmV8ZW58MHx8MHx8fDA%3D"}
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 68rem) 100vw, 50vw"
                  className="hub-featured-img"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <span className="hub-featured-category-pill">
                {postCategories[featuredPost.slug] || "Senior Wellness"}
              </span>
            </div>

            {/* Content Box */}
            <div className="hub-featured-content">
              <div className="hub-meta-row">
                <span className="hub-meta-item">
                  <Calendar size={14} aria-hidden="true" />
                  <time dateTime={featuredPost.date}>{formatDate(featuredPost.date)}</time>
                </span>
                <span className="hub-meta-item">
                  <Clock size={14} aria-hidden="true" />
                  <span>{postReadTimes[featuredPost.slug] || "5 min read"}</span>
                </span>
                <span className="hub-meta-item">
                  <User size={14} aria-hidden="true" />
                  <span>Blessed Hearts Team</span>
                </span>
              </div>

              <h3 className="hub-featured-title">
                <Link href={`/blog/${featuredPost.slug}`}>
                  {featuredPost.title}
                </Link>
              </h3>

              <p className="hub-featured-excerpt">
                {featuredPost.excerpt}
              </p>

              <div className="hub-featured-footer">
                <Link href={`/blog/${featuredPost.slug}`} className="btn-luxury-primary btn-luxury-cta" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  Read Featured Article
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>

          </article>
        )}

        {/* 2. Standard Articles Grid */}
        <div className="hub-grid">
          {standardPosts.map((post) => (
            <article key={post.slug} className="hub-card" aria-label={`Blog post: ${post.title}`}>
              
              {/* Card Image */}
              <div className="hub-card-media">
                <div className="hub-card-image-wrapper">
                  <Image
                    src={postImages[post.slug] || "https://images.unsplash.com/photo-1765896387387-0538bc9f997e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8SG9tZWNhcmV8ZW58MHx8MHx8fDA%3D"}
                    alt={post.title}
                    fill
                    sizes="(max-width: 48rem) 100vw, (max-width: 68rem) 50vw, 33vw"
                    className="hub-card-img"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <span className="hub-card-category-pill">
                  {postCategories[post.slug] || "Senior Wellness"}
                </span>
              </div>

              {/* Card Content */}
              <div className="hub-card-content">
                <div className="hub-meta-row">
                  <span className="hub-meta-item">
                    <Calendar size={12} aria-hidden="true" />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </span>
                  <span className="hub-meta-item">
                    <Clock size={12} aria-hidden="true" />
                    <span>{postReadTimes[post.slug] || "4 min read"}</span>
                  </span>
                </div>

                <h3 className="hub-card-title">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="hub-card-excerpt">
                  {post.excerpt}
                </p>

                <div className="hub-card-footer">
                  <Link href={`/blog/${post.slug}`} className="hub-card-link" aria-label={`Read article: ${post.title}`}>
                    Read Article
                    <ArrowRight size={14} className="hub-card-link__arrow" aria-hidden="true" />
                  </Link>
                </div>
              </div>

            </article>
          ))}
        </div>

        {/* 3. Footer CTA */}
        <div className="hub-cta-area">
          <div className="hub-cta-buttons">
            <Link href="/blog" className="btn-luxury-primary btn-luxury-cta" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              View All Articles
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
