import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

function fontSizeFor(title: string) {
  const n = title.trim().length;
  if (n > 92) return 48;
  if (n > 68) return 54;
  if (n > 48) return 62;
  return 70;
}

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("title")?.trim() || "Free Marketing Tool";
  const title = raw.toLowerCase().startsWith("free ") ? raw : `Free ${raw}`;
  const fontSize = fontSizeFor(title);

  return new ImageResponse(
    <div style={{ width: "1200px", height: "630px", display: "flex", position: "relative", overflow: "hidden", background: "#fafafa", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", background: "linear-gradient(135deg,#fff 0%,#f8f8f8 70%,#ededed 100%)" }} />
      <div style={{ position: "absolute", left: "-170px", top: "-190px", width: "420px", height: "420px", border: "1px solid #dedede", borderRadius: "210px", display: "flex" }} />
      <div style={{ position: "absolute", right: "-140px", bottom: "-170px", width: "460px", height: "460px", border: "1px solid #d8d8d8", borderRadius: "230px", display: "flex" }} />
      <div style={{ position: "absolute", left: "72px", top: "120px", width: "690px", height: "390px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ width: "64px", height: "5px", background: "#111", marginBottom: "30px", display: "flex" }} />
        <div style={{ fontSize, lineHeight: 1.03, letterSpacing: "-2.5px", fontWeight: 800, color: "#0a0a0a", display: "flex", maxWidth: "680px" }}>{title}</div>
        <div style={{ marginTop: "30px", color: "#777", fontSize: 20, display: "flex" }}>Practical marketing utility. No signup required.</div>
      </div>
      <div style={{ position: "absolute", right: "90px", top: "135px", width: "310px", height: "360px", display: "flex", flexWrap: "wrap", gap: "18px", alignContent: "center", justifyContent: "center" }}>
        {["⌕","↗","A","◎","<>","%"].map((mark, i) => (
          <div key={mark} style={{ width: i === 0 || i === 5 ? "108px" : "92px", height: i === 0 || i === 5 ? "108px" : "92px", borderRadius: "18px", background: "#fff", border: "1px solid #e2e2e2", boxShadow: "0 14px 35px rgba(0,0,0,.06)", color: "#111", fontSize: i === 4 ? 32 : 46, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{mark}</div>
        ))}
      </div>
    </div>,
    { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=31536000, immutable" } }
  );
}
