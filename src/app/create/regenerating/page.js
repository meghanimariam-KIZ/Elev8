"use client";

import { Screen, TopBar } from "@/components/Screen";
import Steps from "@/components/Steps";
import { useCountUp, useSequence } from "@/lib/hooks";

const ITEMS = ["Applying your changes", "Protecting product details", "Creating new visuals", "Checking quality"];

export default function Regenerating() {
  const step = useSequence(ITEMS.length, { interval: 1100, next: "/create/review?v=2" });
  const pct = useCountUp(100, 4400);
  const R = 54, C = 2 * Math.PI * R;

  return (
    <Screen width="narrow">
      <TopBar title="Creating new version…" back="/create/interpretation" />
      <div className="body">
        <div className="mt-12"><Steps items={ITEMS} current={step} /></div>

        <div style={{ position: "relative", width: 150, height: 150, margin: "44px auto 0" }}>
          <svg width="150" height="150" viewBox="0 0 130 130" style={{ transform: "rotate(-90deg)" }}>
            <defs>
              <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#3a5bff" /><stop offset=".5" stopColor="#7a4dff" /><stop offset="1" stopColor="#e2449e" />
              </linearGradient>
            </defs>
            <circle cx="65" cy="65" r={R} fill="none" stroke="var(--line)" strokeWidth="10" />
            <circle cx="65" cy="65" r={R} fill="none" stroke="url(#ring)" strokeWidth="10" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 800 }}>{pct}%</span>
          </div>
        </div>
        <p className="center small muted mt-12">Quality check in progress…</p>

        <div className="frame mt-24" style={{ height: 70, borderRadius: 18, background: "var(--grad-soft)" }}>
          <div className="skeleton-shimmer" style={{ position: "absolute", inset: 0 }} />
        </div>
      </div>
    </Screen>
  );
}
