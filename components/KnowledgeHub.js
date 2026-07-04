"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight, Heart } from "lucide-react";
import { blogPosts } from "@/lib/site";

// Map slugs to standard local assets
const postImages = {
  "medicaid-waiver-programs-pa": "/images/caregiver-meeting.png",
  "signs-loved-one-needs-home-care": "/images/caregiver-kitchen.png",
  "caregiver-burnout-family-caregivers": "/images/caregiver-client-warm.png",
  "creating-safe-home-for-seniors": "/images/caregiver-walker.png",
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
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // We select the first post as Featured, and the next three as Standard Cards
  const featuredPost = blogPosts[0];
  const standardPosts = blogPosts.slice(1, 4);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

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
                  src={postImages[featuredPost.slug] || "/images/caregiver-meeting.png"}
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
                    src={postImages[post.slug] || "/images/caregiver-kitchen.png"}
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

        {/* 3. Footer CTA & Newsletter Subscription */}
        <div className="hub-cta-area">
          <div className="hub-cta-buttons">
            <Link href="/blog" className="btn-luxury-primary btn-luxury-cta" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              View All Articles
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="hub-newsletter-box">
            <h4>Subscribe to our Newsletter</h4>
            <p>Get senior wellness guides and local PA waiver updates directly in your inbox.</p>
            {subscribed ? (
              <div className="hub-newsletter-success" role="alert">
                <span aria-hidden="true">✓</span> Thank you for subscribing to Blessed Hearts resources!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="hub-newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="hub-newsletter-input"
                  aria-label="Email address for newsletter subscription"
                />
                <button type="submit" className="hub-newsletter-submit-btn">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
