import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

function fontSizeFor(title: string) {
  const n = title.trim().length;
  if (n > 105) return 48;
  if (n > 80) return 54;
  if (n > 58) return 62;
  return 70;
}

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title")?.trim() || "Marketing Insights";
  const fontSize = fontSizeFor(title);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#f7f7f4",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <img
          src="https://themarkitmedia.com/images/services/digital-marketing.jpg"
          width="1200"
          height="630"
          style={{ position: "absolute", inset: 0, width: "1200px", height: "630px", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, display: "flex", background: "linear-gradient(90deg, rgba(250,250,247,0.99) 0%, rgba(250,250,247,0.98) 42%, rgba(250,250,247,0.82) 58%, rgba(250,250,247,0.08) 100%)" }} />
        <div style={{ position: "absolute", left: "-95px", top: "-120px", width: "340px", height: "340px", borderRadius: "170px", background: "rgba(220,224,216,.55)", display: "flex" }} />
        <div style={{ position: "absolute", left: "72px", top: "118px", width: "64px", height: "5px", background: "#7d9181", display: "flex" }} />
        <div style={{ position: "absolute", left: "72px", top: "150px", width: "510px", height: "390px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ color: "#111", fontSize, lineHeight: 1.03, letterSpacing: "-2.5px", fontWeight: 800, display: "flex", maxWidth: "520px" }}>
            {title}
          </div>
        </div>
        <div style={{ position: "absolute", left: "72px", bottom: "54px", color: "#667068", fontSize: 18, letterSpacing: "2px", fontWeight: 700, textTransform: "uppercase", display: "flex" }}>
          Insights for smarter digital growth
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    }
  );
}
