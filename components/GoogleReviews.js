"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, 
  Users, 
  Clock, 
  Shield, 
  Quote, 
  ArrowRight, 
  Phone,
  Heart,
  Sparkles,
  Check
} from "lucide-react";
import styles from "./GoogleReviews.module.css";
import { site } from "@/lib/site";

// Preserved original reviews data
const reviewsData = [
  {
    id: 1,
    name: "Gloria Custis",
    avatar: "/images/reviewer_gloria.png",
    type: "image",
    verified: true,
    time: "9 days ago",
    rating: 5,
    text: "I love working with Blessed Hearts Homecare. The team is so nice, extremely professional and compassionate. Highly recommend! 🙏❤️👍",
    photo: "/images/review_gloria_photo.png"
  },
  {
    id: 2,
    name: "Betty Mellinger",
    avatar: "B",
    avatarBg: "#4a5568", // Slate grey
    type: "letter",
    verified: true,
    time: "9 days ago",
    rating: 5,
    text: "I enjoy working with the Blessed Hearts team. They are always understanding, highly responsive, and help check in when there are issues. I truly appreciate that.😊"
  },
  {
    id: 3,
    name: "Dennie Barnes",
    avatar: "D",
    avatarBg: "#5A1A5E", // Brand plum
    type: "letter",
    verified: true,
    time: "9 days ago",
    rating: 5,
    text: "Blessed Hearts Homecare is an exceptional company. Very nice to work with, highly professional, and extremely friendly caregivers."
  },
  {
    id: 4,
    name: "Reginald Smalls",
    avatar: "/images/reviewer_reginald.png",
    type: "image",
    verified: true,
    time: "10 days ago",
    rating: 5,
    text: "Our experience has been incredibly pleasant. The staff is professional, courteous, responsive, and efficient. They provide everything we could ask for. Thanks for all you do!"
  }
];

// Reusable SVG Components
export const GoogleIconSVG = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.67-.67-1.19-1.48-1.54-2.38z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
  </svg>
);

const VerifiedSVG = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

// Framer Motion Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 70, 
      damping: 14 
    } 
  }
};

const floatingVariants = (delay) => ({
  animate: {
    y: [0, -12, 0],
    transition: {
      repeat: Infinity,
      duration: 5,
      ease: "easeInOut",
      delay: delay
    }
  }
});

export default function GoogleReviews() {
  // Google reviews write link
  const reviewLink = site.googleReviewUrl || "https://g.page/r/CTgnPi0uWzfpEBM/review"; 

  // Select Gloria Custis's review (id 1) as the featured review
  const featuredReview = reviewsData.find(r => r.id === 1) || reviewsData[0];

  return (
    <section className={styles.reviewsSection} aria-labelledby="reviews-section-heading">
      {/* Background Decorators */}
      <div className={`${styles.blob} ${styles.blob1}`} aria-hidden="true" />
      <div className={`${styles.blob} ${styles.blob2}`} aria-hidden="true" />
      <div className={`${styles.blob} ${styles.blob3}`} aria-hidden="true" />
      
      {/* Decorative Hearts Watermark */}
      <Heart className={styles.heartWatermark} strokeWidth={1} aria-hidden="true" />
      <Heart className={styles.heartWatermarkRight} strokeWidth={0.8} aria-hidden="true" />

      {/* Floating badges for visual depth (Desktop only) */}
      <div className={styles.floatingContainer} aria-hidden="true">
        <motion.div 
          className={`${styles.floatingCard} ${styles.float1}`}
          variants={floatingVariants(0)}
          animate="animate"
        >
          <span style={{ color: "#FBBC05" }}>★</span> Rated 4.9
        </motion.div>
        
        <motion.div 
          className={`${styles.floatingCard} ${styles.float2}`}
          variants={floatingVariants(1.2)}
          animate="animate"
        >
          <span style={{ color: "#FF2D7A" }}>❤️</span> Trusted by Families
        </motion.div>
        
        <motion.div 
          className={`${styles.floatingCard} ${styles.float3}`}
          variants={floatingVariants(2.4)}
          animate="animate"
        >
          <span style={{ color: "#FF7A1A" }}>🛡️</span> Licensed Agency
        </motion.div>
        
        <motion.div 
          className={`${styles.floatingCard} ${styles.float4}`}
          variants={floatingVariants(0.6)}
          animate="animate"
        >
          <span style={{ color: "#5A1A5E" }}>👨‍⚕️</span> Background Checked
        </motion.div>
      </div>

      <motion.div 
        className={styles.contentContainer}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* SECTION HEADER */}
        <motion.div className={styles.sectionHeader} variants={itemVariants}>
          <h2 id="reviews-section-heading">Loved by Families Across South Central Pennsylvania</h2>
          <div className={styles.titleUnderline} />
          <p>
            Hundreds of local families trust Blessed Hearts Homecare for compassionate, 
            reliable, and professional in-home care services.
          </p>
        </motion.div>

        {/* TOP TRUST BAR (GOOGLE RATING HERO CARD) */}
        <motion.div className={styles.heroCard} variants={itemVariants}>
          <div className={styles.heroLeft}>
            <div className={styles.googleBrand}>
              <div className={styles.googleLogoText}>
                <span style={{ color: '#4285F4' }}>G</span>
                <span style={{ color: '#EA4335' }}>o</span>
                <span style={{ color: '#FBBC05' }}>o</span>
                <span style={{ color: '#4285F4' }}>g</span>
                <span style={{ color: '#34A853' }}>l</span>
                <span style={{ color: '#EA4335' }}>e</span>
                <span className={styles.reviewsLabel}>Reviews</span>
              </div>
            </div>
            <div className={styles.ratingDisplay}>
              <span className={styles.ratingNumber}>4.9</span>
              <div className={styles.ratingStarsCol}>
                <div className={styles.starsRow}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={20} fill="#FBBC05" stroke="none" />
                  ))}
                </div>
                <span className={styles.reviewsCountText}>132+ Google Reviews</span>
              </div>
            </div>
          </div>
          <Link 
            href={reviewLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.ctaButton}
            aria-label="Review us on Google (opens in a new tab)"
          >
            Review Us on Google
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* STATISTICS ROW */}
        <motion.div className={styles.statsRowGrid} variants={containerVariants}>
          {/* Stat 1 */}
          <motion.div className={styles.statCard} variants={itemVariants}>
            <div className={styles.statIconContainer}>
              <Star size={24} fill="#FF5A3C" stroke="none" />
            </div>
            <h3 className={styles.statVal}>4.9</h3>
            <p className={styles.statLabel}>Average Rating</p>
          </motion.div>

          {/* Stat 2 */}
          <motion.div className={styles.statCard} variants={itemVariants}>
            <div className={styles.statIconContainer}>
              <Users size={24} />
            </div>
            <h3 className={styles.statVal}>100+</h3>
            <p className={styles.statLabel}>Families Served</p>
          </motion.div>

          {/* Stat 3 */}
          <motion.div className={styles.statCard} variants={itemVariants}>
            <div className={styles.statIconContainer}>
              <Clock size={24} />
            </div>
            <h3 className={styles.statVal}>24/7</h3>
            <p className={styles.statLabel}>Dedicated Support</p>
          </motion.div>

          {/* Stat 4 */}
          <motion.div className={styles.statCard} variants={itemVariants}>
            <div className={styles.statIconContainer}>
              <Shield size={24} />
            </div>
            <h3 className={styles.statVal}>100%</h3>
            <p className={styles.statLabel}>Licensed & Insured</p>
          </motion.div>
        </motion.div>

        {/* FEATURED REVIEW */}
        <motion.div className={styles.featuredSection} variants={itemVariants}>
          <div className={styles.featuredCardOuter}>
            <div className={styles.featuredCardInner}>
              <Quote className={styles.quoteDecoration} size={120} strokeWidth={1} />
              
              {/* Featured Image Col */}
              {featuredReview.photo && (
                <div className={styles.featuredImageCol}>
                  <Image 
                    src={featuredReview.photo}
                    alt="Blessed Hearts Homecare caregiver helping elderly lady"
                    width={500}
                    height={350}
                    className={styles.featuredImage}
                    priority
                  />
                </div>
              )}

              {/* Featured Content Col */}
              <div className={styles.featuredContentCol}>
                <span className={styles.featuredBadge}>Featured Review</span>
                <div className={styles.featuredStarsRow}>
                  {Array.from({ length: featuredReview.rating }).map((_, i) => (
                    <Star key={i} size={18} fill="#FBBC05" stroke="none" />
                  ))}
                </div>
                <blockquote className={styles.featuredText}>
                  "{featuredReview.text}"
                </blockquote>
                
                <div className={styles.featuredAuthorRow}>
                  <div className={styles.featuredProfile}>
                    <div className={styles.featuredAvatarWrapper}>
                      <Image 
                        src={featuredReview.avatar}
                        alt={featuredReview.name}
                        width={56}
                        height={56}
                        className={styles.featuredAvatar}
                      />
                    </div>
                    <div className={styles.featuredMeta}>
                      <span className={styles.featuredName}>{featuredReview.name}</span>
                      <span className={styles.featuredVerifiedBadge}>
                        <Check size={14} strokeWidth={3} /> Verified Client
                      </span>
                    </div>
                  </div>
                  
                  <div className={styles.featuredFooterBrand}>
                    <span className={styles.featuredDate}>{featuredReview.time}</span>
                    <span style={{ opacity: 0.3 }}>|</span>
                    <div className={styles.featuredGoogleIcon}>
                      <GoogleIconSVG />
                    </div>
                    <span>Verified Google Review</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RESPONSIVE REVIEWS GRID */}
        <motion.div className={styles.reviewsGrid} variants={containerVariants}>
          {reviewsData.map((review) => (
            <motion.div 
              key={review.id} 
              className={styles.reviewCard}
              variants={itemVariants}
            >
              <div className={styles.cardHeader}>
                <div className={styles.avatarWrapper}>
                  {review.type === "image" ? (
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      width={52}
                      height={52}
                      className={styles.avatarImage}
                    />
                  ) : (
                    <div 
                      className={styles.avatarLetter} 
                      style={{ backgroundColor: review.avatarBg || '#5A1A5E' }}
                    >
                      {review.avatar}
                    </div>
                  )}
                  <div className={styles.googleBadge}>
                    <GoogleIconSVG />
                  </div>
                </div>
                <div className={styles.authorMeta}>
                  <div className={styles.authorNameRow}>
                    <span className={styles.authorName}>{review.name}</span>
                    {review.verified && (
                      <span className={styles.verifiedBadge} title="Verified reviewer">
                        <VerifiedSVG />
                      </span>
                    )}
                  </div>
                  <span className={styles.reviewTime}>{review.time}</span>
                </div>
              </div>
              
              {/* Rating stars with shimmer animation */}
              <div className={styles.cardStars}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill="#FBBC05" 
                    stroke="none" 
                    className={styles.shimmerStar}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className={styles.reviewText}>{review.text}</p>

              {/* Optional Review Photo */}
              {review.photo && (
                <div className={styles.reviewCardPhotoWrapper}>
                  <Image
                    src={review.photo}
                    alt={`${review.name}'s review attachment`}
                    width={320}
                    height={200}
                    className={styles.reviewCardPhoto}
                  />
                </div>
              )}

              {/* Footer */}
              <div className={styles.cardFooter}>
                <div className={styles.footerLeft}>
                  <div className={styles.footerGoogleIcon}>
                    <GoogleIconSVG />
                  </div>
                  <span className={styles.footerVerifiedLabel}>Verified Google Review</span>
                </div>
                <Sparkles size={14} style={{ color: '#FF2D7A', opacity: 0.7 }} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* BOTTOM CTA */}
        <motion.div className={styles.ctaContainer} variants={itemVariants}>
          <div className={`${styles.ctaBlob} ${styles.ctaBlob1}`} aria-hidden="true" />
          <div className={`${styles.ctaBlob} ${styles.ctaBlob2}`} aria-hidden="true" />
          
          <h3>Need compassionate care for someone you love?</h3>
          <div className={styles.ctaButtons}>
            <Link 
              href="/contact-us#contact-form" 
              className={styles.ctaBtnPrimary}
            >
              Request Care
              <ArrowRight size={18} />
            </Link>
            <Link 
              href={site.phoneHref} 
              className={styles.ctaBtnSecondary}
            >
              <Phone size={18} />
              Call Now: {site.phoneDisplay}
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
