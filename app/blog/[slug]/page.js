import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { site, defaultOgImages, defaultTwitterImages } from "@/lib/site";
import { getBlogBySlug, getAllBlogs, formatBlogDate } from "@/lib/blogsData";
import { Calendar, ArrowLeft, ArrowRight, User, Clock, Tag } from "lucide-react";
import "../blog.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const post = await getBlogBySlug(params.slug);
  if (!post || post.status === "draft") return {};

  const canonicalUrl = `/blog/${post.slug}`;
  const keywords = [
    post.title,
    post.category || "Senior Care",
    "home care Pennsylvania",
    "senior care PA",
    "caregiver support Pennsylvania",
    "Medicaid waiver PA",
    "elderly care advice",
    "in-home care York PA",
  ];

  const postImages = post.image
    ? [
        {
          url: post.image,
          secureUrl: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ]
    : defaultOgImages;

  const twitterImages = post.image ? [post.image] : defaultTwitterImages;

  return {
    title: `${post.title} | ${site.name}`,
    description: post.excerpt,
    keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${post.title} | ${site.name}`,
      description: post.excerpt,
      url: `${site.url}${canonicalUrl}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author || "Blessed Hearts Care Team"],
      siteName: site.name,
      images: postImages,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: twitterImages,
    },
  };
}

/**
 * Format article body: converts rich HTML or plain text into clean, valid, fully rendered HTML.
 * Eliminates visible raw HTML tags (&lt;h2&gt;, etc.) and renders real DOM headings, paragraphs, lists, and quotes.
 */
function formatArticleBody(content) {
  if (!content) return "";
  const rawString = Array.isArray(content) ? content.join("\n\n") : String(content);

  // Check if content contains any HTML tags (e.g. <h2>, <p>, <blockquote>, <ul>, <strong>, etc.)
  const hasHtml = /<[a-z][\s\S]*>/i.test(rawString);

  if (hasHtml) {
    // If it already has block-level tags or inline tags, split by double newlines
    // and wrap any raw text chunk that doesn't start with a block tag into <p>...</p>
    const blocks = rawString.split(/\n\s*\n/).filter(Boolean);
    return blocks
      .map((block) => {
        const trimmed = block.trim();
        if (/^<(?:p|h[1-6]|ul|ol|blockquote|div|hr|img|table|section|article)/i.test(trimmed)) {
          return trimmed;
        }
        return `<p>${trimmed}</p>`;
      })
      .join("\n\n");
  }

  // Pure plain text article: wrap each paragraph in <p>...</p>
  return rawString
    .split(/\n\s*\n/)
    .filter(Boolean)
    .map((p) => `<p>${p.trim()}</p>`)
    .join("\n\n");
}

export default async function BlogPostPage({ params }) {
  const post = await getBlogBySlug(params.slug);
  if (!post || post.status === "draft") notFound();

  const allBlogs = await getAllBlogs();
  const related = allBlogs.filter((p) => p.slug !== post.slug).slice(0, 3);
  const canonicalUrl = `/blog/${post.slug}`;
  const formattedHtml = formatArticleBody(post.content);

  // Article + BreadcrumbList structured data (Article Schema)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${site.url}${canonicalUrl}/#article`,
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        url: `${site.url}${canonicalUrl}`,
        image: post.image || undefined,
        author: {
          "@type": "Person",
          name: post.author || "Blessed Hearts Care Team",
        },
        publisher: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
          logo: {
            "@type": "ImageObject",
            url: `${site.url}/images/logo-horizontal-official.png`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${site.url}${canonicalUrl}`,
        },
        isPartOf: {
          "@id": `${site.url}/#website`,
        },
        articleSection: post.category || "Home Care",
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${site.url}${canonicalUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: site.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blogs",
            item: `${site.url}/blogs`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `${site.url}${canonicalUrl}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        variant="services"
        eyebrow="BLOG ARTICLE"
        title={post.title}
        description={post.excerpt}
        ctaLabel={null}
        mediaLabel={post.title}
        imageSrc={post.image || "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60"}
      />

      <article className="section why-us-luxury">
        <div className="container" style={{ maxWidth: "46rem" }}>
          {/* Back button */}
          <div style={{ marginBottom: "2rem" }}>
            <Link href="/blogs" style={{ color: "var(--pink)", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
              <ArrowLeft size={16} /> Back to all articles
            </Link>
          </div>

          {/* Meta bar: Date, Category, Author, Read time */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem", fontSize: "0.85rem", color: "#666666", marginBottom: "1.75rem", paddingBottom: "1rem", borderBottom: "1px solid #eaeaea" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Calendar size={14} style={{ color: "var(--pink)" }} />
              <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
            </div>

            {post.category && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <Tag size={13} style={{ color: "var(--pink)" }} />
                <span style={{ fontWeight: 600, color: "var(--plum)" }}>{post.category}</span>
              </div>
            )}

            {post.author && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <User size={14} style={{ color: "var(--pink)" }} />
                <span>{post.author}</span>
              </div>
            )}

            {post.readTime && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <Clock size={14} style={{ color: "var(--pink)" }} />
                <span>{post.readTime}</span>
              </div>
            )}
          </div>

          {/* Article body with full Rich Text & High Visibility support */}
          <div
            className="article-body-luxury"
            dangerouslySetInnerHTML={{ __html: formattedHtml }}
          />

          {/* Internal links for SEO */}
          <div style={{ marginTop: "2.5rem", padding: "2rem", backgroundColor: "var(--gray-light, #f8f8f8)", borderRadius: "16px" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--plum)", marginBottom: "1rem" }}>Related Services & Resources</h3>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <li><Link href="/services" style={{ color: "var(--pink)", fontWeight: 600, textDecoration: "none", fontSize: "0.9rem" }}>Our Services →</Link></li>
              <li><Link href="/areas-we-serve" style={{ color: "var(--pink)", fontWeight: 600, textDecoration: "none", fontSize: "0.9rem" }}>Areas We Serve →</Link></li>
              <li><Link href="/faq" style={{ color: "var(--pink)", fontWeight: 600, textDecoration: "none", fontSize: "0.9rem" }}>FAQ →</Link></li>
              <li><Link href="/contact-us" style={{ color: "var(--pink)", fontWeight: 600, textDecoration: "none", fontSize: "0.9rem" }}>Free Consultation →</Link></li>
            </ul>
          </div>
        </div>
      </article>

      {/* Related blog posts */}
      {related.length > 0 && (
        <section className="section services-alternating" aria-labelledby="related-heading">
          <div className="container">
            <div className="section-heading-luxury" style={{ marginBottom: "2.5rem" }}>
              <span className="eyebrow-luxury-accent">RECOMMENDED ARTICLES</span>
              <h2 id="related-heading" className="section-title-luxury">More From the Blog</h2>
            </div>

            <div className="why-us-grid-luxury" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))", gap: "2rem" }}>
              {related.map((p) => (
                <div key={p.slug} className="review-card-luxury" style={{ display: "flex", flexDirection: "column" }}>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--plum)", lineHeight: "1.35", marginBottom: "0.85rem" }}>
                    <Link href={`/blog/${p.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {p.title}
                    </Link>
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "#555555", lineHeight: "1.55", marginBottom: "1.25rem", flexGrow: 1 }}>
                    {p.excerpt}
                  </p>
                  <div>
                    <Link href={`/blog/${p.slug}`} className="btn-luxury-secondary-small" style={{ textDecoration: "none", width: "100%", justifyContent: "center", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                      Read Article <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
