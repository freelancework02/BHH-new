import Link from "next/link";
import PageHero from "@/components/PageHero";
import Placeholder from "@/components/Placeholder";
import CTASection from "@/components/CTASection";
import { blogPosts } from "@/lib/site";

export const metadata = {
  title: "Blog",
  description:
    "Senior care tips, caregiving guidance, and Medicaid waiver information from Blessed Hearts Homecare in York, PA.",
  alternates: { canonical: "/blog" },
};

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Our Blog"
        description="Practical guidance on senior care, caregiving, and navigating home care options in Pennsylvania."
        ctaLabel={null}
        mediaLabel="Caregiver reading with a senior client"
      />

      <section className="section" aria-labelledby="latest-articles-heading">
        <div className="container">
          <h2 id="latest-articles-heading">Latest Articles</h2>
          <ul className="grid grid--3">
            {blogPosts.map((post) => (
              <li key={post.slug} className="card">
                <div style={{ borderRadius: "var(--radius-sm)", overflow: "hidden", minHeight: "10rem", marginBottom: "1rem" }}>
                  <Placeholder label={post.title} />
                </div>
                <time dateTime={post.date} style={{ fontSize: "0.85rem", color: "#777" }}>
                  {formatDate(post.date)}
                </time>
                <h3>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="btn btn--outline-plum">
                  Read More
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
