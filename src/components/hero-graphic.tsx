"use client";

import { useId } from "react";

interface HeroGraphicProps {
  className?: string;
}

const bars = [
  { x: 100, h: 80 },
  { x: 180, h: 130 },
  { x: 260, h: 100 },
  { x: 340, h: 170 },
  { x: 420, h: 220 },
];

const barWidth = 40;
const barBase = 430;

const nodes: Array<{ cx: number; cy: number }> = [
  { cx: 120, cy: 130 },
  { cx: 270, cy: 70 },
  { cx: 420, cy: 95 },
  { cx: 340, cy: 175 },
  { cx: 185, cy: 195 },
  { cx: 510, cy: 145 },
  { cx: 90, cy: 60 },
];

const edges: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 5],
  [1, 3],
  [3, 4],
  [0, 4],
  [6, 0],
  [6, 1],
];

export function HeroGraphic({ className }: HeroGraphicProps) {
  const rawId = useId();
  const s = rawId.replace(/:/g, "");

  const trendPoints = bars
    .map((bar) => `${bar.x + barWidth / 2},${barBase - bar.h}`)
    .join(" ");

  return (
    <svg
      viewBox="0 0 600 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <style>{`
        .${s}-bar {
          transform-box: fill-box;
          transform-origin: center bottom;
          animation: ${s}-rise 0.8s ease-out both;
        }
        .${s}-b0 { animation-delay: 0.1s }
        .${s}-b1 { animation-delay: 0.25s }
        .${s}-b2 { animation-delay: 0.4s }
        .${s}-b3 { animation-delay: 0.55s }
        .${s}-b4 { animation-delay: 0.7s }

        @keyframes ${s}-rise {
          from { transform: scaleY(0) }
          to { transform: scaleY(1) }
        }

        .${s}-edge {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: ${s}-draw 1.2s ease-out forwards;
        }
        .${s}-e0 { animation-delay: 0.5s }
        .${s}-e1 { animation-delay: 0.65s }
        .${s}-e2 { animation-delay: 0.8s }
        .${s}-e3 { animation-delay: 0.95s }
        .${s}-e4 { animation-delay: 1.1s }
        .${s}-e5 { animation-delay: 1.25s }
        .${s}-e6 { animation-delay: 1.4s }
        .${s}-e7 { animation-delay: 1.55s }

        @keyframes ${s}-draw {
          to { stroke-dashoffset: 0 }
        }

        .${s}-node {
          transform-box: fill-box;
          transform-origin: center;
          animation: ${s}-pulse 3.5s ease-in-out infinite;
        }
        .${s}-n0 { animation-delay: 0s }
        .${s}-n1 { animation-delay: 0.5s }
        .${s}-n2 { animation-delay: 1s }
        .${s}-n3 { animation-delay: 1.5s }
        .${s}-n4 { animation-delay: 2s }
        .${s}-n5 { animation-delay: 2.5s }
        .${s}-n6 { animation-delay: 3s }

        @keyframes ${s}-pulse {
          0%, 100% { transform: scale(1); opacity: 0.85 }
          50% { transform: scale(1.3); opacity: 0.45 }
        }

        .${s}-ring {
          transform-box: fill-box;
          transform-origin: center;
          animation: ${s}-ring-pulse 4s ease-in-out infinite;
        }

        @keyframes ${s}-ring-pulse {
          0%, 100% { transform: scale(1); opacity: 0.2 }
          50% { transform: scale(1.5); opacity: 0.05 }
        }

        .${s}-trend {
          stroke-dasharray: 500;
          stroke-dashoffset: 500;
          animation: ${s}-draw-trend 1.6s ease-out 0.6s forwards;
        }

        @keyframes ${s}-draw-trend {
          to { stroke-dashoffset: 0 }
        }

        @media (prefers-reduced-motion: reduce) {
          .${s}-bar,
          .${s}-edge,
          .${s}-node,
          .${s}-ring,
          .${s}-trend {
            animation: none !important;
            transform: none !important;
            opacity: 1 !important;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>

      {/* Subtle grid lines */}
      {[290, 330, 370, 410].map((y) => (
        <line
          key={y}
          x1={80}
          y1={y}
          x2={480}
          y2={y}
          stroke="#000"
          strokeOpacity={0.05}
          strokeWidth={1}
        />
      ))}

      {/* Bar chart baseline */}
      <line
        x1={80}
        y1={barBase}
        x2={480}
        y2={barBase}
        stroke="#000"
        strokeWidth={1.5}
        strokeOpacity={0.15}
      />

      {/* Rising bars */}
      {bars.map((bar, i) => (
        <rect
          key={i}
          className={`${s}-bar ${s}-b${i}`}
          x={bar.x}
          y={barBase - bar.h}
          width={barWidth}
          height={bar.h}
          fill="#000"
          rx={3}
        />
      ))}

      {/* Trend line across bar tops */}
      <polyline
        className={`${s}-trend`}
        points={trendPoints}
        stroke="#000"
        strokeWidth={2}
        strokeOpacity={0.25}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Small arrow at the end of the trend line */}
      <polyline
        className={`${s}-trend`}
        points={`${bars[4].x + barWidth / 2 - 6},${barBase - bars[4].h + 8} ${bars[4].x + barWidth / 2},${barBase - bars[4].h - 4} ${bars[4].x + barWidth / 2 + 6},${barBase - bars[4].h + 8}`}
        stroke="#000"
        strokeWidth={2}
        strokeOpacity={0.25}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Network edges */}
      {edges.map(([from, to], i) => (
        <line
          key={i}
          className={`${s}-edge ${s}-e${i}`}
          x1={nodes[from].cx}
          y1={nodes[from].cy}
          x2={nodes[to].cx}
          y2={nodes[to].cy}
          stroke="#000"
          strokeWidth={1}
          strokeOpacity={0.12}
        />
      ))}

      {/* Accent rings on key nodes */}
      {[1, 3, 5].map((i) => (
        <circle
          key={`ring-${i}`}
          className={`${s}-ring`}
          cx={nodes[i].cx}
          cy={nodes[i].cy}
          r={14}
          stroke="#000"
          strokeWidth={1}
          fill="none"
          style={{ animationDelay: `${i * 0.7}s` }}
        />
      ))}

      {/* Network nodes */}
      {nodes.map((node, i) => (
        <circle
          key={i}
          className={`${s}-node ${s}-n${i}`}
          cx={node.cx}
          cy={node.cy}
          r={4.5}
          fill="#000"
        />
      ))}
    </svg>
  );
}
