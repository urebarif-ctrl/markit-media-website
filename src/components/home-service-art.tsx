// Demo-only vector art: one diagram per service (240x160) and five goal scenes (480x220).
// Original drawings, no third-party logos, no numbers. Decorative: the text next to each one names the service.
import type { ReactNode } from "react";

const INK = "#111111";
const AC = "#5A3ED6";
const LA = "#e9e4ff";
const GR = "#cfcfcf";
const BG = "#f5f5f3";
const W = "#ffffff";

function Frame({ children, w = 240, h = 160, bg = BG }: { children: ReactNode; w?: number; h?: number; bg?: string }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" className="block w-full h-full" preserveAspectRatio="xMidYMid slice" fontFamily="Arial, sans-serif">
      <rect width={w} height={h} fill={bg} />
      {children}
    </svg>
  );
}

const ART: Record<string, ReactNode> = {
  "performance-marketing": (
    <>
      <rect x="30" y="26" width="180" height="28" fill={INK} /><text x="42" y="45" fill={W} fontSize="12" fontWeight="700">Ad</text>
      <rect x="55" y="62" width="130" height="28" fill={INK} /><text x="67" y="81" fill={W} fontSize="12" fontWeight="700">Click</text>
      <rect x="80" y="98" width="80" height="28" fill={AC} /><text x="92" y="117" fill={W} fontSize="12" fontWeight="700">Lead</text>
    </>
  ),
  seo: (
    <>
      <rect x="30" y="22" width="180" height="28" fill={W} stroke={INK} strokeWidth="2" />
      <circle cx="46" cy="36" r="6" fill="none" stroke={INK} strokeWidth="2" /><path d="M50 40 l6 6" stroke={INK} strokeWidth="2" /><rect x="66" y="33" width="90" height="6" fill={GR} />
      <rect x="30" y="60" width="180" height="26" fill={LA} stroke={AC} strokeWidth="2" /><circle cx="44" cy="73" r="5" fill={AC} /><rect x="56" y="68" width="100" height="5" fill={AC} /><rect x="56" y="77" width="130" height="4" fill={GR} />
      <rect x="30" y="94" width="180" height="22" fill={W} stroke={GR} /><rect x="42" y="101" width="90" height="5" fill={GR} />
      <rect x="30" y="124" width="180" height="22" fill={W} stroke={GR} /><rect x="42" y="131" width="110" height="5" fill={GR} />
    </>
  ),
  "social-media": (
    <>
      <rect x="84" y="12" width="72" height="136" rx="10" fill={W} stroke={INK} strokeWidth="2.5" />
      <rect x="94" y="26" width="24" height="24" fill={AC} /><rect x="122" y="26" width="24" height="24" fill={INK} />
      <rect x="94" y="54" width="24" height="24" fill={GR} /><rect x="122" y="54" width="24" height="24" fill={AC} />
      <rect x="94" y="82" width="24" height="24" fill={INK} /><rect x="122" y="82" width="24" height="24" fill={GR} />
      <rect x="94" y="110" width="52" height="5" fill={GR} /><rect x="94" y="120" width="34" height="5" fill={GR} />
      <circle cx="172" cy="40" r="13" fill={AC} /><path d="M172 47 l-7 -7 a4 4 0 0 1 7 -5 a4 4 0 0 1 7 5 z" fill={W} />
    </>
  ),
  "website-development": (
    <>
      <rect x="24" y="18" width="192" height="124" fill={W} stroke={INK} strokeWidth="2" /><rect x="24" y="18" width="192" height="16" fill={INK} />
      <circle cx="34" cy="26" r="2.5" fill={W} /><circle cx="43" cy="26" r="2.5" fill={W} /><circle cx="52" cy="26" r="2.5" fill={W} />
      <rect x="34" y="42" width="110" height="46" fill={LA} /><rect x="42" y="50" width="70" height="7" fill={INK} /><rect x="42" y="62" width="52" height="5" fill={GR} /><rect x="42" y="74" width="30" height="9" fill={AC} />
      <rect x="152" y="42" width="54" height="46" fill={GR} />
      <rect x="34" y="96" width="52" height="36" fill={W} stroke={GR} strokeWidth="2" /><rect x="94" y="96" width="52" height="36" fill={W} stroke={GR} strokeWidth="2" /><rect x="154" y="96" width="52" height="36" fill={W} stroke={GR} strokeWidth="2" />
    </>
  ),
  shopify: (
    <>
      <rect x="24" y="18" width="192" height="124" fill={W} stroke={INK} strokeWidth="2" /><rect x="24" y="18" width="192" height="16" fill={INK} />
      <path d="M190 22 h4 l3 8 h12 l-3 7 h-11 z" fill="none" stroke={W} strokeWidth="1.6" />
      <rect x="36" y="44" width="76" height="86" fill={LA} /><circle cx="74" cy="82" r="22" fill={W} stroke={AC} strokeWidth="2" /><path d="M64 82 h20 M74 72 v20" stroke={AC} strokeWidth="2" />
      <rect x="124" y="48" width="80" height="8" fill={INK} /><rect x="124" y="62" width="50" height="5" fill={GR} /><rect x="124" y="76" width="34" height="9" fill={AC} />
      <rect x="124" y="98" width="80" height="26" fill={AC} /><text x="164" y="115" textAnchor="middle" fill={W} fontSize="9" fontWeight="700">Add to cart</text>
    </>
  ),
  branding: (
    <>
      <rect x="32" y="30" width="62" height="62" fill={INK} /><path d="M46 78 V46 l17 20 17 -20 V78" fill="none" stroke={W} strokeWidth="5" />
      <circle cx="124" cy="46" r="13" fill={AC} /><circle cx="152" cy="46" r="13" fill={INK} /><circle cx="180" cy="46" r="13" fill={GR} /><circle cx="208" cy="46" r="13" fill={LA} stroke={AC} />
      <text x="112" y="100" fontSize="38" fontWeight="800" fill={INK}>Aa</text><rect x="32" y="108" width="176" height="5" fill={GR} /><rect x="32" y="119" width="120" height="5" fill={GR} />
    </>
  ),
  "video-production": (
    <>
      <rect x="92" y="10" width="56" height="100" fill={INK} /><path d="M110 46 l22 14 -22 14 z" fill={W} /><rect x="98" y="98" width="44" height="3" fill={AC} />
      <rect x="34" y="124" width="172" height="8" fill={GR} /><rect x="34" y="124" width="92" height="8" fill={AC} /><circle cx="126" cy="128" r="8" fill={INK} />
      <rect x="34" y="60" width="38" height="24" fill={LA} stroke={AC} /><rect x="168" y="60" width="38" height="24" fill={LA} stroke={AC} />
    </>
  ),
  ai: (
    <>
      <rect x="20" y="26" width="64" height="34" rx="8" fill={W} stroke={INK} strokeWidth="2" /><rect x="30" y="38" width="40" height="5" fill={GR} /><rect x="30" y="47" width="24" height="5" fill={GR} />
      <path d="M88 43 h22" stroke={INK} strokeWidth="2.5" /><path d="M104 36 l8 7 -8 7" fill="none" stroke={INK} strokeWidth="2.5" />
      <circle cx="132" cy="80" r="22" fill={AC} /><circle cx="132" cy="80" r="7" fill={W} />
      <path d="M132 58 v-10 M132 102 v10 M110 80 h-10 M154 80 h10 M116 64 l-7 -7 M148 96 l7 7 M148 64 l7 -7 M116 96 l-7 7" stroke={AC} strokeWidth="3" />
      <path d="M154 100 l12 12" stroke={INK} strokeWidth="2.5" />
      <rect x="158" y="112" width="64" height="34" rx="8" fill={INK} /><rect x="168" y="124" width="40" height="5" fill={W} /><rect x="168" y="133" width="26" height="5" fill={GR} />
    </>
  ),
  "email-marketing": (
    <>
      <rect x="40" y="14" width="160" height="132" fill={W} stroke={INK} strokeWidth="2" /><rect x="40" y="14" width="160" height="20" fill={INK} /><rect x="50" y="22" width="50" height="5" fill={W} />
      <rect x="50" y="42" width="140" height="40" fill={LA} /><rect x="58" y="50" width="80" height="7" fill={INK} /><rect x="58" y="62" width="56" height="5" fill={GR} />
      <rect x="50" y="90" width="52" height="14" fill={AC} /><rect x="50" y="112" width="140" height="4" fill={GR} /><rect x="50" y="121" width="100" height="4" fill={GR} />
      <rect x="50" y="130" width="30" height="10" rx="5" fill={LA} stroke={AC} /><rect x="86" y="130" width="30" height="10" rx="5" fill={LA} stroke={AC} /><rect x="122" y="130" width="30" height="10" rx="5" fill={LA} stroke={AC} />
    </>
  ),
  "content-marketing": (
    <>
      <rect x="26" y="16" width="136" height="128" fill={W} stroke={INK} strokeWidth="2" />
      <rect x="38" y="28" width="104" height="9" fill={INK} /><rect x="38" y="42" width="70" height="9" fill={INK} />
      <rect x="38" y="60" width="104" height="36" fill={LA} /><circle cx="60" cy="78" r="8" fill={AC} />
      <rect x="38" y="104" width="104" height="4" fill={GR} /><rect x="38" y="113" width="104" height="4" fill={GR} /><rect x="38" y="122" width="74" height="4" fill={GR} />
      <rect x="174" y="28" width="44" height="5" fill={AC} /><rect x="174" y="42" width="40" height="4" fill={GR} /><rect x="174" y="54" width="44" height="4" fill={GR} /><rect x="174" y="66" width="34" height="4" fill={GR} />
      <rect x="174" y="100" width="44" height="16" fill={AC} />
    </>
  ),
  "paid-advertising": (
    <>
      <rect x="20" y="16" width="86" height="72" fill={W} stroke={INK} strokeWidth="2" /><rect x="28" y="24" width="70" height="28" fill={LA} /><rect x="28" y="58" width="48" height="5" fill={INK} /><rect x="28" y="70" width="30" height="10" fill={AC} />
      <rect x="116" y="16" width="104" height="22" fill={W} stroke={INK} strokeWidth="2" /><rect x="124" y="24" width="50" height="5" fill={INK} /><rect x="190" y="22" width="22" height="10" fill={AC} />
      <rect x="116" y="48" width="48" height="96" fill={W} stroke={INK} strokeWidth="2" /><rect x="122" y="56" width="36" height="30" fill={LA} /><rect x="122" y="94" width="26" height="5" fill={INK} /><rect x="122" y="124" width="36" height="12" fill={AC} />
      <rect x="20" y="98" width="86" height="46" fill={W} stroke={GR} strokeWidth="2" strokeDasharray="4 3" /><rect x="176" y="48" width="44" height="46" fill={W} stroke={GR} strokeWidth="2" strokeDasharray="4 3" />
    </>
  ),
  "digital-marketing": (
    <>
      <path d="M120 80 L50 40 M120 80 L190 40 M120 80 L50 124 M120 80 L190 124" stroke={INK} strokeWidth="2" />
      <circle cx="120" cy="80" r="24" fill={AC} /><path d="M108 80 h24 M120 68 v24" stroke={W} strokeWidth="3" />
      <rect x="32" y="26" width="36" height="28" fill={W} stroke={INK} strokeWidth="2" /><rect x="172" y="26" width="36" height="28" fill={W} stroke={INK} strokeWidth="2" />
      <rect x="32" y="110" width="36" height="28" fill={W} stroke={INK} strokeWidth="2" /><rect x="172" y="110" width="36" height="28" fill={W} stroke={INK} strokeWidth="2" />
      <rect x="38" y="36" width="24" height="5" fill={GR} /><rect x="178" y="36" width="24" height="5" fill={GR} /><rect x="38" y="120" width="24" height="5" fill={GR} /><rect x="178" y="120" width="24" height="5" fill={GR} />
    </>
  ),
  "ecommerce-marketing": (
    <>
      <rect x="18" y="28" width="70" height="104" fill={W} stroke={INK} strokeWidth="2" />
      {[40, 56, 72, 88, 104].map((y) => <g key={y}><rect x="26" y={y} width="14" height="8" fill={LA} /><rect x="46" y={y + 2} width="34" height="4" fill={GR} /></g>)}
      <path d="M96 80 h26" stroke={INK} strokeWidth="2.5" /><path d="M116 72 l8 8 -8 8" fill="none" stroke={INK} strokeWidth="2.5" />
      {[0, 1, 2, 3].map((i) => <g key={i}><rect x={134 + (i % 2) * 52} y={30 + Math.floor(i / 2) * 54} width="44" height="46" fill={W} stroke={INK} strokeWidth="2" /><rect x={138 + (i % 2) * 52} y={34 + Math.floor(i / 2) * 54} width="36" height="22" fill={i === 1 ? AC : LA} /><rect x={138 + (i % 2) * 52} y={62 + Math.floor(i / 2) * 54} width="22" height="4" fill={INK} /></g>)}
    </>
  ),
  "public-relations": (
    <>
      <rect x="30" y="14" width="180" height="132" fill={W} stroke={INK} strokeWidth="2" /><rect x="30" y="14" width="180" height="18" fill={INK} /><rect x="42" y="20" width="70" height="6" fill={W} />
      <rect x="42" y="42" width="96" height="9" fill={INK} /><rect x="42" y="56" width="64" height="9" fill={INK} />
      <rect x="42" y="74" width="62" height="46" fill={LA} /><circle cx="58" cy="90" r="6" fill={AC} />
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x="112" y={74 + i * 8} width={i % 3 === 2 ? 60 : 84} height="4" fill={GR} />)}
      <rect x="42" y="126" width="168" height="4" fill={GR} />
    </>
  ),
  photography: (
    <>
      <rect x="46" y="44" width="148" height="86" rx="6" fill={INK} /><rect x="78" y="32" width="44" height="16" fill={INK} />
      <circle cx="120" cy="88" r="30" fill={W} /><circle cx="120" cy="88" r="22" fill={AC} /><circle cx="120" cy="88" r="9" fill={INK} /><circle cx="110" cy="80" r="4" fill={W} opacity="0.8" />
      <rect x="160" y="52" width="22" height="10" fill={GR} /><rect x="56" y="54" width="14" height="8" fill={W} />
    </>
  ),
  bpo: (
    <>
      <path d="M40 92 a38 38 0 0 1 76 0" fill="none" stroke={INK} strokeWidth="5" /><rect x="32" y="86" width="14" height="26" rx="4" fill={INK} /><rect x="110" y="86" width="14" height="26" rx="4" fill={INK} />
      <path d="M46 112 q4 18 30 18" fill="none" stroke={INK} strokeWidth="3" /><rect x="72" y="126" width="14" height="8" rx="3" fill={AC} />
      {[0, 1, 2].map((i) => <g key={i}><rect x="140" y={22 + i * 40} width="82" height="32" fill={W} stroke={i === 0 ? AC : GR} strokeWidth="2" /><circle cx="156" cy={38 + i * 40} r="7" fill={i === 0 ? AC : GR} /><rect x="170" y={32 + i * 40} width="40" height="4" fill={INK} /><rect x="170" y={41 + i * 40} width="28" height="4" fill={GR} /></g>)}
    </>
  ),
  "app-development": (
    <>
      <rect x="22" y="14" width="62" height="132" rx="10" fill={W} stroke={INK} strokeWidth="2.5" />
      <rect x="30" y="30" width="46" height="24" fill={AC} /><rect x="30" y="60" width="46" height="14" fill={LA} /><rect x="30" y="80" width="46" height="14" fill={LA} /><rect x="30" y="104" width="46" height="14" fill={INK} />
      <rect x="98" y="30" width="122" height="96" fill={W} stroke={INK} strokeWidth="2" /><rect x="98" y="30" width="122" height="12" fill={INK} />
      <rect x="106" y="50" width="34" height="22" fill={LA} /><rect x="146" y="50" width="34" height="22" fill={LA} /><rect x="186" y="50" width="26" height="22" fill={AC} />
      <rect x="106" y="82" width="106" height="36" fill={BG} /><path d="M112 112 l20 -16 18 8 24 -20 28 12" fill="none" stroke={AC} strokeWidth="2.5" />
    </>
  ),
  "crm-development": (
    <>
      {[0, 1, 2].map((c) => <g key={c}><rect x={22 + c * 70} y="20" width="64" height="120" fill={W} stroke={GR} strokeWidth="2" /><rect x={22 + c * 70} y="20" width="64" height="14" fill={c === 2 ? AC : INK} /></g>)}
      <rect x="30" y="42" width="48" height="22" fill={LA} /><rect x="30" y="70" width="48" height="22" fill={LA} /><rect x="100" y="42" width="48" height="22" fill={LA} />
      <rect x="170" y="42" width="48" height="22" fill={AC} /><path d="M82 53 h14 M92 48 l6 5 -6 5" fill="none" stroke={INK} strokeWidth="2" />
    </>
  ),
  "white-label": (
    <>
      <rect x="70" y="12" width="100" height="32" fill="none" stroke={INK} strokeWidth="2" strokeDasharray="5 4" /><rect x="86" y="25" width="68" height="6" fill={GR} />
      <path d="M120 44 v14 M114 52 l6 8 6 -8" fill="none" stroke={INK} strokeWidth="2.5" />
      <rect x="70" y="62" width="100" height="36" fill={AC} /><rect x="86" y="76" width="68" height="7" fill={W} />
      <path d="M120 98 v14 M114 106 l6 8 6 -8" fill="none" stroke={INK} strokeWidth="2.5" />
      <rect x="70" y="116" width="100" height="32" fill={W} stroke={INK} strokeWidth="2" /><rect x="86" y="129" width="68" height="6" fill={GR} />
    </>
  ),
  "marketing-analytics": (
    <>
      <rect x="20" y="16" width="200" height="128" fill={W} stroke={INK} strokeWidth="2" />
      <rect x="30" y="26" width="54" height="26" fill={LA} /><rect x="92" y="26" width="54" height="26" fill={LA} /><rect x="154" y="26" width="56" height="26" fill={AC} />
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={34 + i * 18} y={128 - (18 + i * 9)} width="12" height={18 + i * 9} fill={i === 5 ? AC : INK} />)}
      <path d="M34 112 l30 -14 30 8 30 -26 30 6 30 -22" fill="none" stroke={AC} strokeWidth="2.5" /><circle cx="184" cy="64" r="4" fill={AC} />
    </>
  ),
  "media-planning-buying": (
    <>
      <rect x="22" y="22" width="196" height="30" fill={W} stroke={INK} strokeWidth="2" /><rect x="22" y="22" width="84" height="30" fill={INK} /><rect x="106" y="22" width="56" height="30" fill={AC} /><rect x="162" y="22" width="36" height="30" fill={GR} />
      {[0, 1, 2, 3].map((r) => <g key={r}><rect x="22" y={68 + r * 20} width="30" height="12" fill={GR} /><rect x={58 + r * 22} y={68 + r * 20} width={80 - r * 8} height="12" fill={r === 1 ? AC : LA} stroke={r === 1 ? AC : GR} /></g>)}
    </>
  ),
  "whatsapp-business": (
    <>
      <rect x="22" y="18" width="110" height="26" rx="10" fill={W} stroke={INK} strokeWidth="2" /><rect x="34" y="28" width="70" height="5" fill={GR} />
      <rect x="64" y="52" width="110" height="26" rx="10" fill={AC} /><rect x="76" y="62" width="70" height="5" fill={W} />
      <rect x="22" y="86" width="90" height="26" rx="10" fill={W} stroke={INK} strokeWidth="2" /><rect x="34" y="96" width="50" height="5" fill={GR} />
      <path d="M186 36 h24" stroke={INK} strokeWidth="2.5" /><path d="M204 29 l8 7 -8 7" fill="none" stroke={INK} strokeWidth="2.5" />
      <rect x="150" y="96" width="70" height="40" fill={W} stroke={INK} strokeWidth="2" /><circle cx="166" cy="110" r="6" fill={LA} stroke={AC} /><rect x="178" y="106" width="34" height="4" fill={INK} /><rect x="178" y="115" width="24" height="4" fill={GR} /><rect x="158" y="126" width="54" height="6" fill={AC} />
    </>
  ),
  "sms-marketing": (
    <>
      <rect x="82" y="12" width="76" height="136" rx="10" fill={W} stroke={INK} strokeWidth="2.5" />
      <rect x="92" y="28" width="46" height="22" rx="8" fill={BG} stroke={GR} /><rect x="100" y="36" width="30" height="4" fill={GR} />
      <rect x="102" y="58" width="46" height="26" rx="8" fill={AC} /><rect x="110" y="66" width="30" height="4" fill={W} /><rect x="110" y="74" width="20" height="4" fill={W} />
      <rect x="92" y="92" width="40" height="22" rx="8" fill={BG} stroke={GR} /><rect x="92" y="122" width="56" height="12" rx="6" fill={LA} stroke={AC} />
      <circle cx="190" cy="52" r="20" fill={W} stroke={INK} strokeWidth="2.5" /><path d="M190 40 v12 l9 6" fill="none" stroke={AC} strokeWidth="3" />
    </>
  ),
  "upwork-growth": (
    <>
      <rect x="22" y="18" width="104" height="124" fill={W} stroke={INK} strokeWidth="2" />
      <circle cx="52" cy="46" r="16" fill={LA} stroke={AC} strokeWidth="2" /><rect x="76" y="36" width="42" height="6" fill={INK} /><rect x="76" y="48" width="30" height="4" fill={GR} />
      {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${34 + i * 16} 78 l3 7 7 1 -5 5 2 7 -7 -4 -7 4 2 -7 -5 -5 7 -1 z`} fill={i < 4 ? AC : GR} />)}
      <rect x="34" y="106" width="80" height="4" fill={GR} /><rect x="34" y="116" width="60" height="4" fill={GR} />
      <rect x="138" y="30" width="82" height="100" fill={W} stroke={GR} strokeWidth="2" /><rect x="148" y="42" width="50" height="6" fill={INK} /><rect x="148" y="56" width="62" height="4" fill={GR} /><rect x="148" y="66" width="62" height="4" fill={GR} /><rect x="148" y="76" width="40" height="4" fill={GR} /><rect x="148" y="104" width="44" height="14" fill={AC} />
    </>
  ),
  "design-systems": (
    <>
      <rect x="20" y="18" width="200" height="124" fill={W} stroke={INK} strokeWidth="2" />
      <rect x="32" y="30" width="54" height="18" fill={AC} /><rect x="94" y="30" width="54" height="18" fill={W} stroke={INK} strokeWidth="2" /><rect x="156" y="30" width="54" height="18" fill={INK} />
      <rect x="32" y="60" width="116" height="16" fill={W} stroke={GR} strokeWidth="2" /><rect x="40" y="66" width="50" height="4" fill={GR} />
      <rect x="160" y="60" width="38" height="16" rx="8" fill={AC} /><circle cx="190" cy="68" r="6" fill={W} />
      <rect x="32" y="88" width="84" height="44" fill={BG} stroke={GR} /><rect x="40" y="96" width="44" height="6" fill={INK} /><rect x="40" y="108" width="62" height="4" fill={GR} />
      <circle cx="140" cy="108" r="12" fill={AC} /><circle cx="166" cy="108" r="12" fill={INK} /><circle cx="192" cy="108" r="12" fill={LA} stroke={AC} /><rect x="130" y="126" width="72" height="4" fill={GR} />
    </>
  ),
};

export type ServiceSlug = keyof typeof ART;

export function ServiceArt({ slug, className = "" }: { slug: string; className?: string }) {
  const art = ART[slug] ?? ART["digital-marketing"];
  return <div className={className}><Frame>{art}</Frame></div>;
}

const D = "#0b0b0b";
const SCENES: Record<string, ReactNode> = {
  leads: (
    <>
      <rect x="40" y="26" width="100" height="168" rx="14" fill="#161616" stroke="#444" strokeWidth="2" />
      <rect x="54" y="52" width="62" height="22" rx="8" fill="#2a2a2a" /><rect x="66" y="82" width="62" height="22" rx="8" fill={AC} /><rect x="54" y="112" width="50" height="22" rx="8" fill="#2a2a2a" /><rect x="66" y="142" width="62" height="22" rx="8" fill={AC} />
      <path d="M156 110 h40" stroke="#777" strokeWidth="3" /><path d="M190 100 l12 10 -12 10" fill="none" stroke="#777" strokeWidth="3" />
      <rect x="226" y="120" width="30" height="64" fill="#444" /><rect x="266" y="92" width="30" height="92" fill="#777" /><rect x="306" y="62" width="30" height="122" fill={AC} />
      <circle cx="408" cy="84" r="44" fill="none" stroke={AC} strokeWidth="3" /><circle cx="408" cy="84" r="28" fill="none" stroke="#777" strokeWidth="3" /><circle cx="408" cy="84" r="10" fill={AC} />
      <rect x="360" y="156" width="90" height="8" fill="#333" /><rect x="360" y="172" width="60" height="8" fill="#333" />
    </>
  ),
  found: (
    <>
      <rect x="40" y="30" width="280" height="40" rx="20" fill="#161616" stroke="#555" strokeWidth="2" />
      <circle cx="68" cy="50" r="9" fill="none" stroke="#999" strokeWidth="3" /><path d="M75 57 l9 9" stroke="#999" strokeWidth="3" /><rect x="100" y="46" width="130" height="8" fill="#444" />
      <rect x="40" y="88" width="280" height="38" fill="#1b1535" stroke={AC} strokeWidth="2" /><circle cx="62" cy="107" r="7" fill={AC} /><rect x="80" y="100" width="130" height="7" fill={AC} /><rect x="80" y="112" width="190" height="5" fill="#555" />
      <rect x="40" y="136" width="280" height="30" fill="#161616" stroke="#333" /><rect x="58" y="148" width="120" height="6" fill="#444" />
      <rect x="40" y="174" width="280" height="30" fill="#161616" stroke="#333" /><rect x="58" y="186" width="150" height="6" fill="#444" />
      <rect x="350" y="30" width="100" height="160" fill="#161616" stroke="#444" strokeWidth="2" /><path d="M350 110 l100 -30 M350 150 l100 -20 M390 30 v160 M420 30 v160" stroke="#2c2c2c" strokeWidth="3" />
      <path d="M400 120 a14 14 0 1 1 28 0 c0 14 -14 28 -14 28 s-14 -14 -14 -28 z" fill={AC} /><circle cx="414" cy="120" r="5" fill={D} />
    </>
  ),
  build: (
    <>
      <rect x="40" y="26" width="270" height="170" fill="#161616" stroke="#444" strokeWidth="2" /><rect x="40" y="26" width="270" height="20" fill="#2a2a2a" />
      <circle cx="54" cy="36" r="3.5" fill="#777" /><circle cx="66" cy="36" r="3.5" fill="#777" /><circle cx="78" cy="36" r="3.5" fill="#777" />
      <rect x="58" y="62" width="150" height="62" fill="#1b1535" /><rect x="70" y="74" width="100" height="10" fill="#fff" /><rect x="70" y="92" width="70" height="6" fill="#666" /><rect x="70" y="108" width="40" height="10" fill={AC} />
      <rect x="222" y="62" width="70" height="62" fill="#2a2a2a" />
      <rect x="58" y="138" width="70" height="44" fill="#222" stroke="#333" /><rect x="140" y="138" width="70" height="44" fill="#222" stroke="#333" /><rect x="222" y="138" width="70" height="44" fill="#222" stroke="#333" />
      <rect x="340" y="56" width="52" height="52" fill="#fff" /><path d="M350 98 V68 l16 18 16 -18 V98" fill="none" stroke="#111" strokeWidth="5" />
      <circle cx="416" cy="70" r="11" fill={AC} /><circle cx="442" cy="70" r="11" fill="#fff" /><circle cx="416" cy="96" r="11" fill="#777" /><circle cx="442" cy="96" r="11" fill="#2a2a2a" stroke="#666" />
      <rect x="340" y="130" width="110" height="8" fill="#444" /><rect x="340" y="148" width="80" height="8" fill="#333" />
    </>
  ),
  social: (
    <>
      <rect x="40" y="20" width="110" height="182" rx="14" fill="#161616" stroke="#444" strokeWidth="2" />
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={54 + (i % 2) * 46} y={40 + Math.floor(i / 2) * 46} width="40" height="40" fill={[AC, "#fff", "#555", "#2a2a2a", AC, "#777"][i]} />)}
      <rect x="54" y="180" width="80" height="6" fill="#444" />
      <rect x="190" y="30" width="96" height="162" fill="#000" stroke="#555" strokeWidth="2" /><path d="M222 90 l36 22 -36 22 z" fill="#fff" />
      <rect x="198" y="176" width="80" height="4" fill="#333" /><rect x="198" y="176" width="46" height="4" fill={AC} />
      <circle cx="350" cy="62" r="22" fill={AC} /><path d="M350 74 l-12 -12 a7 7 0 0 1 12 -9 a7 7 0 0 1 12 9 z" fill="#fff" />
      <rect x="320" y="110" width="120" height="30" rx="14" fill="#1b1535" stroke={AC} /><rect x="334" y="122" width="70" height="6" fill={AC} />
      <rect x="340" y="152" width="100" height="30" rx="14" fill="#161616" stroke="#444" /><rect x="354" y="164" width="60" height="6" fill="#555" />
    </>
  ),
  scale: (
    <>
      {[[60, 60], [60, 140], [170, 100], [280, 60], [280, 140]].map(([x, y], i) => <g key={i}><rect x={x - 28} y={y - 20} width="56" height="40" fill={i === 2 ? AC : "#161616"} stroke={i === 2 ? AC : "#555"} strokeWidth="2" /><rect x={x - 16} y={y - 6} width="32" height="5" fill={i === 2 ? "#fff" : "#555"} /><rect x={x - 16} y={y + 6} width="20" height="5" fill={i === 2 ? "#cfc6ff" : "#444"} /></g>)}
      <path d="M88 60 L142 98 M88 140 L142 104 M198 98 L252 62 M198 102 L252 138" stroke="#777" strokeWidth="2.5" />
      <rect x="350" y="30" width="110" height="160" fill="#161616" stroke="#444" strokeWidth="2" />
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={362 + i * 18} y={170 - (24 + i * 20)} width="12" height={24 + i * 20} fill={i === 4 ? AC : "#555"} />)}
    </>
  ),
};

export function GoalScene({ goal, className = "" }: { goal: string; className?: string }) {
  return <div className={className}><Frame w={480} h={220} bg={D}>{SCENES[goal] ?? SCENES.leads}</Frame></div>;
}
