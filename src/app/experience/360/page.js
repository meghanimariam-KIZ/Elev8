"use client";

import { useRef, useState } from "react";
import { Hand } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";
import GarmentArt from "@/components/GarmentArt";

const ANGLES = [
  { label: "Front", deg: 0 },
  { label: "Side", deg: 90 },
  { label: "Back", deg: 180 },
  { label: "Side", deg: 270 },
];

export default function View360() {
  const [deg, setDeg] = useState(0);
  const drag = useRef(null);

  // Fake a turntable: squash horizontally with cos(angle), mirror past 90°.
  const rad = (deg * Math.PI) / 180;
  const sx = Math.max(0.28, Math.abs(Math.cos(rad)));
  const flip = Math.cos(rad) < 0;

  const onDown = (e) => { drag.current = { x: e.clientX, d: deg }; e.currentTarget.setPointerCapture(e.pointerId); };
  const onMove = (e) => { if (drag.current) setDeg((((drag.current.d + (e.clientX - drag.current.x) * 0.9) % 360) + 360) % 360); };
  const onUp = () => { drag.current = null; };

  return (
    <Screen tone="soft" width="narrow">
      <TopBar title="Explore every angle" subtitle="Drag the model or use the slider to spin it." back="/experience" />
      <div className="body">
        <div
          onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
          style={{ position: "relative", height: 400, touchAction: "none", cursor: "grab", userSelect: "none" }}
        >
          <div style={{ position: "absolute", left: "50%", bottom: 18, width: 290, height: 70, transform: "translateX(-50%)", borderRadius: "50%", background: "radial-gradient(closest-side, rgba(122,77,255,.25), transparent)", border: "1.5px solid rgba(122,77,255,.3)" }} />
          <div style={{ position: "absolute", left: "50%", bottom: 34, width: 240, height: 50, transform: "translateX(-50%)", borderRadius: "50%", border: "1.5px dashed rgba(226,68,158,.45)" }} />
          <div style={{ position: "absolute", inset: "0 40px 30px", transform: `scaleX(${sx})`, transition: drag.current ? "none" : "transform .35s ease" }}>
            <GarmentArt scene="none" mirror={flip} back={deg > 110 && deg < 250} color={deg > 120 && deg < 240 ? "#d45a72" : "#e2667e"} />
          </div>
          <span className="badge" style={{ position: "absolute", left: "50%", bottom: 6, transform: "translateX(-50%)", background: "var(--grad)", color: "#fff", height: 26, padding: "0 12px" }}>
            {Math.round(deg)}°
          </span>
        </div>

        <p className="center tiny muted row gap-6" style={{ justifyContent: "center" }}><Hand size={14} /> Drag to rotate</p>
        <input
          type="range" min="0" max="359" value={Math.round(deg)} onChange={(e) => setDeg(Number(e.target.value))}
          aria-label="Rotation" style={{ width: "100%", accentColor: "#7a4dff", marginTop: 10 }}
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }} className="mt-16">
          {ANGLES.map((a, i) => {
            const on = Math.round(deg) === a.deg;
            return (
              <button key={i} onClick={() => setDeg(a.deg)} className="stack gap-4" style={{ alignItems: "center" }}>
                <span className="frame" style={{ width: "100%", height: 76, borderRadius: 12, display: "block", boxShadow: on ? "0 0 0 2px var(--bg), 0 0 0 4px var(--violet)" : "none" }}>
                  <GarmentArt scene="studio" mirror={a.deg === 270} back={a.deg === 180} style={{ transform: `scaleX(${Math.max(0.45, Math.abs(Math.cos((a.deg * Math.PI) / 180)))})` }} />
                </span>
                <span className="tiny" style={{ fontWeight: 600, color: on ? "var(--violet)" : "var(--ink-2)" }}>{a.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </Screen>
  );
}
