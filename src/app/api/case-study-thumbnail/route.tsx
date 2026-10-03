import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

function fontSizeFor(title: string) {
  const n = title.trim().length;
  if (n > 105) return 46;
  if (n > 78) return 52;
  if (n > 55) return 60;
  return 68;
}

const tiles = [
  { label: "Meta", mark: "∞", x: 850, y: 190, size: 176, fs: 82 },
  { label: "Instagram", mark: "◎", x: 750, y: 95, size: 112, fs: 62 },
  { label: "Facebook", mark: "f", x: 1010, y: 82, size: 106, fs: 62 },
  { label: "Google Ads", mark: "A", x: 1032, y: 300, size: 112, fs: 54 },
  { label: "WordPress", mark: "W", x: 755, y: 340, size: 106, fs: 50 },
  { label: "Shopify", mark: "S", x: 885, y: 410, size: 98, fs: 46 },
  { label: "TikTok", mark: "♪", x: 1010, y: 442, size: 92, fs: 48 },
];

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title")?.trim() || "Case Study";
  const fontSize = fontSizeFor(title);

  return new ImageResponse(
    <div style={{ width: "1200px", height: "630px", display: "flex", position: "relative", overflow: "hidden", background: "linear-gradient(135deg,#ffffff 0%,#fafafa 62%,#f0f0f0 100%)", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <div style={{ position: "absolute", width: "340px", height: "340px", border: "1px solid #d5d5d5", borderRadius: "170px", left: "-205px", top: "-205px", display: "flex" }} />
      <div style={{ position: "absolute", width: "520px", height: "520px", border: "1px solid #dedede", borderRadius: "260px", left: "225px", bottom: "-435px", display: "flex" }} />
      <div style={{ position: "absolute", width: "360px", height: "360px", borderRadius: "180px", right: "-100px", top: "-100px", background: "rgba(238,238,238,.72)", display: "flex" }} />
      <div style={{ position: "absolute", left: "72px", top: "142px", width: "620px", height: "360px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize, lineHeight: 1.02, letterSpacing: "-2.6px", fontWeight: 800, color: "#090909", maxWidth: "610px", display: "flex" }}>{title}</div>
        <div style={{ width: "86px", height: "6px", background: "#111", marginTop: "36px", borderRadius: "3px", display: "flex" }} />
      </div>
      <div style={{ position: "absolute", right: "45px", top: "65px", width: "455px", height: "510px", border: "2px dashed #d4d4d4", borderRadius: "230px", display: "flex" }} />
      {tiles.map((tile) => (
        <div key={tile.label} aria-label={tile.label} style={{ position: "absolute", left: tile.x, top: tile.y, width: tile.size, height: tile.size, borderRadius: "22px", background: "rgba(255,255,255,.96)", border: "1px solid #e6e6e6", boxShadow: "0 18px 45px rgba(0,0,0,.09)", display: "flex", alignItems: "center", justifyContent: "center", color: "#111", fontWeight: 800, fontSize: tile.fs, transform: tile.label === "Instagram" ? "rotate(-6deg)" : tile.label === "Facebook" ? "rotate(7deg)" : tile.label === "Google Ads" ? "rotate(5deg)" : "none" }}>
          {tile.mark}
        </div>
      ))}
    </div>,
    { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=31536000, immutable" } }
  );
}
