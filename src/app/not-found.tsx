import Link from "next/link";

const helpfulLinks = [
  { label: "Services", href: "/en/services", desc: "Browse our marketing services" },
  { label: "Blog", href: "/en/blog", desc: "Expert insights and guides" },
  { label: "Resources", href: "/en/resources", desc: "Free tools and templates" },
  { label: "Contact", href: "/en/contact", desc: "Get in touch with our team" },
];

export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <section style={{ padding: "6rem 1.5rem", textAlign: "center" }}>
          <div style={{ maxWidth: "40rem", margin: "0 auto" }}>
            <div style={{ fontSize: "8rem", fontWeight: 800, color: "rgba(0,0,0,0.1)", lineHeight: 1 }}>404</div>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#000", marginBottom: "1rem" }}>
              Page Not Found
            </h1>
            <p style={{ fontSize: "1.125rem", color: "#6b7280", marginBottom: "2.5rem" }}>
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Link href="/" style={{ display: "inline-block", background: "#000", color: "#fff", padding: "1rem 2.5rem", fontWeight: 700, fontSize: "1rem", textDecoration: "none" }}>
              Go Home &rarr;
            </Link>
          </div>
        </section>
        <section style={{ padding: "0 1.5rem 6rem", maxWidth: "40rem", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#000", marginBottom: "1.5rem", textAlign: "center" }}>
            Try These Instead
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
            {helpfulLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ display: "block", padding: "1.25rem", border: "1px solid #e5e7eb", textDecoration: "none", color: "#000" }}
              >
                <span style={{ fontWeight: 700, fontSize: "1rem", display: "block", marginBottom: "0.25rem" }}>{link.label}</span>
                <span style={{ fontSize: "1rem", color: "#6b7280" }}>{link.desc}</span>
              </Link>
            ))}
          </div>
        </section>
      </body>
    </html>
  );
}
