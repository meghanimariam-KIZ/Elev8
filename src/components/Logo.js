import { useId } from "react";

/** ELEV8 wordmark: gradient "E" swoosh + "LEV" + gradient "8". */
export default function Logo({ size = 28, light = false, stacked = false }) {
  const id = useId().replace(/:/g, "");
  const ink = light ? "#ffffff" : "#14132b";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: size * 0.12, lineHeight: 1 }} aria-label="ELEV8">
      <svg width={size * 0.95} height={size} viewBox="0 0 38 40" aria-hidden="true">
        <defs>
          <linearGradient id={`e-${id}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="38" y2="40">
            <stop offset="0" stopColor="#3ad0ff" />
            <stop offset=".5" stopColor="#7a4dff" />
            <stop offset="1" stopColor="#ff4fa3" />
          </linearGradient>
        </defs>
        <path
          d="M33 8.5C30 4.6 25.4 2.5 20.4 2.5 10.9 2.5 3.5 10.3 3.5 20s7.4 17.5 16.9 17.5c5.2 0 9.9-2.3 12.9-6.3"
          fill="none" stroke={`url(#e-${id})`} strokeWidth="5.5" strokeLinecap="round"
        />
        <path d="M11 20h19" stroke={`url(#e-${id})`} strokeWidth="5.5" strokeLinecap="round" />
      </svg>
      {!stacked && (
        <span
          style={{
            fontFamily: "var(--font-display)", fontWeight: 800, fontSize: size * 0.92,
            letterSpacing: "0.02em", color: ink,
          }}
        >
          LEV
          <span
            style={{
              background: "linear-gradient(135deg,#3ad0ff,#7a4dff 50%,#ff4fa3)",
              WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
            }}
          >
            8
          </span>
        </span>
      )}
    </span>
  );
}
