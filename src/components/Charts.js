"use client";

import { useState } from "react";

/** Single-series area sparkline with hover crosshair + tooltip. */
export function Sparkline({ data, labels, height = 56, format = (v) => v }) {
  const [hover, setHover] = useState(null);
  const W = 140, H = height, pad = 4;
  const max = Math.max(...data), min = Math.min(...data);
  const x = (i) => pad + (i * (W - pad * 2)) / (data.length - 1);
  const y = (v) => H - pad - ((v - min) / (max - min || 1)) * (H - pad * 2);
  const line = data.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const i = Math.round(((e.clientX - r.left) / r.width) * (data.length - 1));
    setHover(Math.max(0, Math.min(data.length - 1, i)));
  };

  return (
    <div style={{ position: "relative" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none" onPointerMove={onMove} onPointerLeave={() => setHover(null)} style={{ display: "block", overflow: "visible" }}>
        <defs>
          <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7a4dff" stopOpacity=".22" />
            <stop offset="1" stopColor="#7a4dff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${line} L${x(data.length - 1)} ${H} L${x(0)} ${H}Z`} fill="url(#spark-fill)" />
        <path d={line} fill="none" stroke="#7a4dff" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
        {hover !== null && (
          <>
            <line x1={x(hover)} x2={x(hover)} y1="0" y2={H} stroke="var(--line-2)" vectorEffect="non-scaling-stroke" />
            <circle cx={x(hover)} cy={y(data[hover])} r="4" fill="#7a4dff" stroke="#fff" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </>
        )}
      </svg>
      {hover !== null && (
        <div className="chart-tip" style={{ left: `${(x(hover) / W) * 100}%` }}>
          <b>{format(data[hover])}</b> <span>{labels?.[hover]}</span>
        </div>
      )}
    </div>
  );
}

/** Single-series column chart with per-bar hover tooltip. */
export function Bars({ data, labels, height = 130, format = (v) => v }) {
  const [hover, setHover] = useState(null);
  const max = Math.max(...data);
  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height, borderBottom: "1px solid var(--line)" }}>
        {data.map((v, i) => (
          <button
            key={i} onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)} onFocus={() => setHover(i)} onBlur={() => setHover(null)}
            aria-label={`${labels[i]}: ${format(v)}`}
            style={{ flex: 1, height: "100%", display: "flex", alignItems: "flex-end", position: "relative" }}
          >
            <span
              style={{
                width: "100%", height: `${(v / max) * 100}%`, borderRadius: "4px 4px 0 0",
                background: hover === i ? "#5a35d8" : "#7a4dff", opacity: hover === null || hover === i ? 1 : 0.55, transition: "all .15s",
              }}
            />
            {hover === i && <span className="chart-tip" style={{ left: "50%", bottom: `calc(${(v / max) * 100}% + 6px)`, top: "auto" }}><b>{format(v)}</b></span>}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
        {labels.map((l, i) => <span key={i} className="tiny muted center" style={{ flex: 1, fontSize: 10.5 }}>{l}</span>)}
      </div>
      <style>{`
        .chart-tip { position:absolute; top:-30px; transform:translateX(-50%); white-space:nowrap; pointer-events:none;
          padding:4px 8px; border-radius:8px; background:var(--ink); color:#fff; font-size:11px; z-index:2; }
        .chart-tip span { opacity:.7; margin-left:4px; }
      `}</style>
    </div>
  );
}
