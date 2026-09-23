"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: 0, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#fff" }}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div style={{ fontSize: "6rem", fontWeight: 800, color: "rgba(0,0,0,0.1)", lineHeight: 1, marginBottom: "1rem" }}>500</div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#000", marginBottom: "1rem" }}>Something Went Wrong</h1>
          <p style={{ fontSize: "1rem", color: "#666", marginBottom: "2rem" }}>An unexpected error occurred. Please try again.</p>
          <button
            onClick={reset}
            style={{ backgroundColor: "#000", color: "#fff", border: "none", padding: "1rem 2.5rem", fontSize: "1rem", fontWeight: 700, cursor: "pointer" }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
