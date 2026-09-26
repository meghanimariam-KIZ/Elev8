"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Camera, Share2, SwitchCamera, Sparkles, CheckCircle2, Maximize } from "lucide-react";
import { Screen } from "@/components/Screen";
import GarmentArt, { SCENES } from "@/components/GarmentArt";
import { useStore } from "@/lib/store";

export default function TryOn() {
  const { products } = useStore();
  const videoRef = useRef(null);
  const [cam, setCam] = useState("idle"); // idle | live | denied
  const [facing, setFacing] = useState("user");
  const [sel, setSel] = useState(0);
  const [flash, setFlash] = useState(false);
  const [toast, setToast] = useState(false);
  const p = products[sel] || products[0];

  useEffect(() => {
    let stream;
    let cancelled = false;
    async function start() {
      if (!navigator.mediaDevices?.getUserMedia) { setCam("denied"); return; }
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facing }, audio: false });
        if (cancelled) { stream.getTracks().forEach((t) => t.stop()); return; }
        if (videoRef.current) videoRef.current.srcObject = stream;
        setCam("live");
      } catch {
        setCam("denied");
      }
    }
    start();
    return () => { cancelled = true; stream?.getTracks().forEach((t) => t.stop()); };
  }, [facing]);

  const capture = () => {
    setFlash(true); setToast(true);
    setTimeout(() => setFlash(false), 180);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <Screen tone="black" className="immersive">
      <div style={{ position: "absolute", inset: 0 }}>
        {/* camera feed or illustrated fallback */}
        <video
          ref={videoRef} autoPlay playsInline muted
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: facing === "user" ? "scaleX(-1)" : "none", display: cam === "live" ? "block" : "none" }}
        />
        {cam !== "live" && (
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(${SCENES.room.wall[0]}, ${SCENES.room.wall[1]} 70%, ${SCENES.room.floor})` }}>
            <GarmentArt scene="room" fit="meet" align="xMidYMax" variant={p.variant} color={p.color} accent={p.accent} style={{ position: "absolute", left: 0, top: 60, width: "100%", height: "calc(100% - 250px)" }} />
          </div>
        )}

        {/* garment overlay aligned to a body guide */}
        {cam === "live" && (
          <div style={{ position: "absolute", inset: "14% 8% 6%", opacity: 0.88, mixBlendMode: "multiply" }}>
            <GarmentArt scene="none" garmentOnly fit="meet" align="xMidYMid" variant={p.variant} color={p.color} accent={p.accent} />
          </div>
        )}
        {cam === "live" && <div className="guide" />}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,.45), transparent 22%, transparent 60%, rgba(0,0,0,.7))" }} />
        {flash && <div style={{ position: "absolute", inset: 0, background: "#fff" }} />}
      </div>

      {/* top controls */}
      <div className="row between" style={{ position: "relative", padding: "6px 16px", width: "100%", maxWidth: 960, margin: "0 auto" }}>
        <Link href="/experience" className="icon-btn dark" aria-label="Back" style={{ marginTop: 10 }}><ChevronLeft size={22} /></Link>
        <div className="row gap-6" style={{ padding: 4, borderRadius: 99, background: "rgba(255,255,255,.14)", backdropFilter: "blur(12px)" }}>
          <span className="chip grad on" style={{ height: 30 }}><Sparkles size={13} /> Try-On</span>
          <Link href="/experience/360" className="chip" style={{ height: 30, background: "transparent", border: 0, color: "#fff" }}>360°</Link>
        </div>
        <button className="icon-btn dark" style={{ marginTop: 10 }} aria-label="Full screen" onClick={() => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.())}><Maximize size={18} /></button>
      </div>

      {cam === "denied" && (
        <div className="card pad" style={{ position: "relative", margin: "12px 16px 0", background: "rgba(20,19,43,.7)", color: "#fff", border: "1px solid rgba(255,255,255,.15)", backdropFilter: "blur(12px)" }}>
          <p className="small" style={{ fontWeight: 700 }}>Camera preview unavailable</p>
          <p className="tiny" style={{ opacity: .75, marginTop: 4 }}>Allow camera access to try outfits on yourself. Showing a sample model for now.</p>
        </div>
      )}

      <div style={{ flex: 1 }} />

      {/* product picker */}
      <div style={{ position: "relative" }}>
        <div className="chips scroll" style={{ margin: 0, padding: "0 16px 14px", gap: 10 }}>
          {products.map((x, i) => (
            <button
              key={x.id} onClick={() => setSel(i)} aria-label={x.name} aria-pressed={i === sel}
              style={{ flex: "none", width: 56, height: 68, borderRadius: 14, overflow: "hidden", border: i === sel ? "2.5px solid #fff" : "2px solid rgba(255,255,255,.25)", transform: i === sel ? "scale(1.06)" : "none", transition: "all .15s" }}
            >
              <GarmentArt scene="studio" variant={x.variant} color={x.color} accent={x.accent} />
            </button>
          ))}
        </div>
        <p className="center small" style={{ color: "#fff", fontWeight: 700 }}>{p.name}</p>
        <div className="row between" style={{ padding: "14px 40px 36px" }}>
          <Round label="Flip" onClick={() => setFacing((f) => (f === "user" ? "environment" : "user"))}><SwitchCamera size={20} /></Round>
          <button onClick={capture} aria-label="Capture look" style={{ width: 78, height: 78, borderRadius: "50%", background: "var(--grad)", padding: 5, boxShadow: "0 0 30px rgba(122,77,255,.6)" }}>
            <span style={{ display: "grid", placeItems: "center", width: "100%", height: "100%", borderRadius: "50%", background: "#fff", color: "var(--violet)" }}><Camera size={26} /></span>
          </button>
          <Round label="Share"><Share2 size={20} /></Round>
        </div>
      </div>

      {toast && <div className="toast" style={{ bottom: 170 }}><CheckCircle2 size={18} color="#4ade80" /> Look saved to gallery</div>}
      <style>{`
        .guide { position:absolute; left:50%; top:16%; width:46%; height:72%; transform:translateX(-50%);
          border:1.5px dashed rgba(255,255,255,.35); border-radius: 45% 45% 18% 18%; pointer-events:none; }
      `}</style>
    </Screen>
  );
}

function Round({ children, label, onClick }) {
  return (
    <button onClick={onClick} className="stack gap-4" style={{ alignItems: "center", color: "#fff", fontSize: 11, fontWeight: 600 }} aria-label={label}>
      <span className="icon-btn dark" style={{ width: 48, height: 48, borderRadius: 99 }}>{children}</span>
      {label}
    </button>
  );
}
