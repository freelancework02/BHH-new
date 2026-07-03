import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { blogPosts } from "@/lib/site";

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
        eyebrow="Blog"
        title={post.title}
        description={post.excerpt}
        ctaLabel={null}
        mediaLabel={post.title}
      />

      <article className="section">
        <div className="container" style={{ maxWidth: "42rem" }}>
          <p>
            <Link href="/blog">&larr; Back to all articles</Link>
          </p>
          <time dateTime={post.date} style={{ fontSize: "0.85rem", color: "#777" }}>
            {formatDate(post.date)}
          </time>
          {post.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>

      <section className="section section--alt" aria-labelledby="related-heading">
        <div className="container">
          <h2 id="related-heading">More From the Blog</h2>
          <ul className="grid grid--3">
            {related.map((p) => (
              <li key={p.slug} className="card">
                <h3>
                  <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                </h3>
                <p>{p.excerpt}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
