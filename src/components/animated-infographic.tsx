"use client";

import { useId } from "react";

export function MarketingFunnel({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");

  return (
    <div className={className}>
      <style>{`
        @keyframes ${id}-funnel-fill {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        @keyframes ${id}-arrow-draw {
          from { stroke-dashoffset: 40; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes ${id}-label-in {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .${id}-stage { transform-origin: center top; animation: ${id}-funnel-fill 0.6s ease-out both; }
        .${id}-stage-1 { animation-delay: 0.2s; }
        .${id}-stage-2 { animation-delay: 0.5s; }
        .${id}-stage-3 { animation-delay: 0.8s; }
        .${id}-stage-4 { animation-delay: 1.1s; }
        .${id}-arrow { stroke-dasharray: 40; animation: ${id}-arrow-draw 0.4s ease-out both; }
        .${id}-arrow-1 { animation-delay: 0.4s; }
        .${id}-arrow-2 { animation-delay: 0.7s; }
        .${id}-arrow-3 { animation-delay: 1.0s; }
        .${id}-label { animation: ${id}-label-in 0.4s ease-out both; }
        .${id}-label-1 { animation-delay: 0.3s; }
        .${id}-label-2 { animation-delay: 0.6s; }
        .${id}-label-3 { animation-delay: 0.9s; }
        .${id}-label-4 { animation-delay: 1.2s; }
        @media (prefers-reduced-motion: reduce) {
          .${id}-stage, .${id}-arrow, .${id}-label { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
      <svg viewBox="0 0 400 300" aria-hidden="true" className="w-full">
        <rect className={`${id}-stage ${id}-stage-1`} x="50" y="20" width="300" height="55" fill="#000" rx="2" />
        <text className={`${id}-label ${id}-label-1`} x="200" y="52" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">AWARENESS</text>

        <line className={`${id}-arrow ${id}-arrow-1`} x1="200" y1="75" x2="200" y2="95" stroke="#000" strokeWidth="2" />

        <rect className={`${id}-stage ${id}-stage-2`} x="80" y="95" width="240" height="55" fill="#000" rx="2" />
        <text className={`${id}-label ${id}-label-2`} x="200" y="127" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">CONSIDERATION</text>

        <line className={`${id}-arrow ${id}-arrow-2`} x1="200" y1="150" x2="200" y2="170" stroke="#000" strokeWidth="2" />

        <rect className={`${id}-stage ${id}-stage-3`} x="110" y="170" width="180" height="55" fill="#000" rx="2" />
        <text className={`${id}-label ${id}-label-3`} x="200" y="202" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">CONVERSION</text>

        <line className={`${id}-arrow ${id}-arrow-3`} x1="200" y1="225" x2="200" y2="245" stroke="#000" strokeWidth="2" />

        <rect className={`${id}-stage ${id}-stage-4`} x="140" y="245" width="120" height="45" fill="#000" rx="2" />
        <text className={`${id}-label ${id}-label-4`} x="200" y="272" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">RETENTION</text>
      </svg>
    </div>
  );
}

export function GrowthChart({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");

  return (
    <div className={className}>
      <style>{`
        @keyframes ${id}-line-draw {
          from { stroke-dashoffset: 500; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes ${id}-dot-pop {
          from { r: 0; }
          to { r: 5; }
        }
        @keyframes ${id}-fill-up {
          from { opacity: 0; }
          to { opacity: 0.08; }
        }
        .${id}-line { stroke-dasharray: 500; animation: ${id}-line-draw 2s ease-out 0.3s both; }
        .${id}-area { animation: ${id}-fill-up 1s ease-out 1s both; }
        .${id}-dot { animation: ${id}-dot-pop 0.3s ease-out both; }
        .${id}-d1 { animation-delay: 0.5s; }
        .${id}-d2 { animation-delay: 0.8s; }
        .${id}-d3 { animation-delay: 1.1s; }
        .${id}-d4 { animation-delay: 1.4s; }
        .${id}-d5 { animation-delay: 1.7s; }
        .${id}-d6 { animation-delay: 2.0s; }
        @media (prefers-reduced-motion: reduce) {
          .${id}-line, .${id}-area, .${id}-dot { animation: none; stroke-dashoffset: 0; opacity: 1; }
          .${id}-dot { r: 5; }
          .${id}-area { opacity: 0.08; }
        }
      `}</style>
      <svg viewBox="0 0 400 250" aria-hidden="true" className="w-full">
        <line x1="40" y1="220" x2="380" y2="220" stroke="#000" strokeWidth="1" strokeOpacity="0.15" />
        <line x1="40" y1="180" x2="380" y2="180" stroke="#000" strokeWidth="1" strokeOpacity="0.08" />
        <line x1="40" y1="140" x2="380" y2="140" stroke="#000" strokeWidth="1" strokeOpacity="0.08" />
        <line x1="40" y1="100" x2="380" y2="100" stroke="#000" strokeWidth="1" strokeOpacity="0.08" />
        <line x1="40" y1="60" x2="380" y2="60" stroke="#000" strokeWidth="1" strokeOpacity="0.08" />

        <polygon className={`${id}-area`} points="60,200 120,180 180,160 240,120 300,80 360,40 360,220 60,220" fill="#000" />
        <polyline className={`${id}-line`} points="60,200 120,180 180,160 240,120 300,80 360,40" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        <circle className={`${id}-dot ${id}-d1`} cx="60" cy="200" fill="#000" r="5" />
        <circle className={`${id}-dot ${id}-d2`} cx="120" cy="180" fill="#000" r="5" />
        <circle className={`${id}-dot ${id}-d3`} cx="180" cy="160" fill="#000" r="5" />
        <circle className={`${id}-dot ${id}-d4`} cx="240" cy="120" fill="#000" r="5" />
        <circle className={`${id}-dot ${id}-d5`} cx="300" cy="80" fill="#000" r="5" />
        <circle className={`${id}-dot ${id}-d6`} cx="360" cy="40" fill="#000" r="5" />

        <text x="60" y="240" textAnchor="middle" fill="#000" fontSize="11" opacity="0.4">Month 1</text>
        <text x="120" y="240" textAnchor="middle" fill="#000" fontSize="11" opacity="0.4">Month 2</text>
        <text x="180" y="240" textAnchor="middle" fill="#000" fontSize="11" opacity="0.4">Month 3</text>
        <text x="240" y="240" textAnchor="middle" fill="#000" fontSize="11" opacity="0.4">Month 4</text>
        <text x="300" y="240" textAnchor="middle" fill="#000" fontSize="11" opacity="0.4">Month 5</text>
        <text x="360" y="240" textAnchor="middle" fill="#000" fontSize="11" opacity="0.4">Month 6</text>
      </svg>
    </div>
  );
}
