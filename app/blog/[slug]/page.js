import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { blogPosts } from "@/lib/site";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostPage({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
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
            <Link href="/blog" style={{ color: "var(--pink)", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
              <ArrowLeft size={16} /> Back to all articles
            </Link>
          </div>

          {/* Date stamp */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "#666666", marginBottom: "1.5rem" }}>
            <Calendar size={14} className="trust-badge-check" />
            <time dateTime={post.date}>
              {formatDate(post.date)}
            </time>
          </div>

          {/* Paragraphs body */}
          <div className="article-body-luxury" style={{ color: "#333333", fontSize: "1.1rem", lineHeight: "1.8" }}>
            {post.content.map((para, i) => (
              <p key={i} style={{ marginBottom: "1.5rem" }}>{para}</p>
            ))}
          </div>
        </div>
      </article>

      {/* Related blog posts */}
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

      <CTASection />
    </>
  );
}
