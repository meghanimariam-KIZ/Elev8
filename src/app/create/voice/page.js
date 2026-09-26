"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X, Square } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";

const TRANSCRIPT = "Make the background more luxurious, but keep the dress exactly the same.";
const BARS = 34;

export default function Voice() {
  const router = useRouter();
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (chars >= TRANSCRIPT.length) {
      const t = setTimeout(() => router.push(`/create/interpretation?q=${encodeURIComponent(TRANSCRIPT)}`), 1400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setChars((c) => c + 1), chars === 0 ? 900 : 45);
    return () => clearTimeout(t);
  }, [chars, router]);

  return (
    <Screen tone="night" width="narrow">
      <TopBar back="/create/feedback" dark />
      <div className="body stack" style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <p className="h-md" style={{ color: "#fff" }}>Listening…</p>
        <p className="tiny mt-4" style={{ color: "rgba(255,255,255,.55)" }}>Speak naturally. ELEV8 understands.</p>

        <div className="wave" aria-hidden="true">
          {Array.from({ length: BARS }, (_, i) => {
            const d = Math.abs(i - BARS / 2) / (BARS / 2);
            return <i key={i} style={{ animationDelay: `${(i % 7) * -0.13}s`, height: `${Math.round((1 - d * 0.8) * 90)}px` }} />;
          })}
        </div>

        <p style={{ minHeight: 72, fontSize: 17, lineHeight: 1.5, color: "#fff", fontWeight: 500, maxWidth: 300 }} aria-live="polite">
          {TRANSCRIPT.slice(0, chars)}
          <span className="caret" />
        </p>
      </div>
      <div className="footer row between" style={{ padding: "12px 44px 40px" }}>
        <Ctl label="Cancel" onClick={() => router.push("/create/feedback")}><X size={24} /></Ctl>
        <Ctl label="Stop" onClick={() => router.push(`/create/interpretation?q=${encodeURIComponent(TRANSCRIPT)}`)} light><Square size={20} fill="currentColor" /></Ctl>
      </div>
      <style>{`
        .wave { display:flex; align-items:center; gap:4px; height:120px; margin: 40px 0 28px; }
        .wave i { width:4px; border-radius:4px; background: linear-gradient(to top,#3a5bff,#b04dff,#ff4fa3);
          animation: bar 0.9s ease-in-out infinite alternate; transform-origin:center; box-shadow: 0 0 10px rgba(176,77,255,.6); }
        @keyframes bar { from { transform: scaleY(.18); } to { transform: scaleY(1); } }
        .caret { display:inline-block; width:2px; height:1.1em; background:#b69cff; margin-left:2px; vertical-align:-3px; animation: blink 1s steps(2) infinite; }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </Screen>
  );
}

function Ctl({ children, label, onClick, light }) {
  return (
    <button onClick={onClick} className="stack gap-8" style={{ alignItems: "center", color: "rgba(255,255,255,.75)", fontSize: 12, fontWeight: 600 }}>
      <span
        style={{
          width: 64, height: 64, borderRadius: "50%", display: "grid", placeItems: "center",
          background: light ? "#fff" : "rgba(255,255,255,.12)", color: light ? "var(--magenta)" : "#fff",
          border: light ? 0 : "1px solid rgba(255,255,255,.2)",
        }}
      >
        {children}
      </span>
      {label}
    </button>
  );
}
