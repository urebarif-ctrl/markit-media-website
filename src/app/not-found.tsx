import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <section style={{ padding: "8rem 1.5rem", textAlign: "center" }}>
          <div style={{ maxWidth: "40rem", margin: "0 auto" }}>
            <div style={{ fontSize: "8rem", fontWeight: 800, color: "rgba(0,0,0,0.1)", lineHeight: 1 }}>404</div>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#000", marginBottom: "1rem" }}>
              Page Not Found
            </h1>
            <p style={{ fontSize: "1.125rem", color: "#6b7280", marginBottom: "2.5rem" }}>
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Link href="/en" style={{ display: "inline-block", background: "#000", color: "#fff", padding: "1rem 2.5rem", fontWeight: 700, fontSize: "1rem", textDecoration: "none" }}>
              Go Home &rarr;
            </Link>
          </div>
        </section>
      </body>
    </html>
  );
}
