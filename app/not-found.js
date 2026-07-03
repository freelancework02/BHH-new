import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section className="section text-center">
      <div className="container" style={{ maxWidth: "32rem" }}>
        <h1>Page Not Found</h1>
        <p>The page you&apos;re looking for doesn&apos;t exist or may have moved.</p>
        <Link href="/" className="btn btn--gradient">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
