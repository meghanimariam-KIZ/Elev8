"use client";

import { ScanLine } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";
import GarmentArt from "@/components/GarmentArt";
import Steps from "@/components/Steps";
import { useSequence } from "@/lib/hooks";
import { useStore } from "@/lib/store";

const ITEMS = ["Analyzing image", "Detecting details", "Understanding brand", "Preparing attributes"];

export default function Analyzing() {
  const { draft } = useStore();
  const step = useSequence(ITEMS.length, { interval: 1100, next: "/products/new/details" });
  const pct = Math.round((step / ITEMS.length) * 100);

  return (
    <Screen tone="soft" width="medium">
      <TopBar back="/products/new" />
      <div className="body">
        <div className="split" style={{ alignItems: "center" }}>
          <div className="frame" style={{ aspectRatio: "4/5", maxHeight: 560, boxShadow: "var(--shadow-md)" }}>
            {draft.photo
              ? <img src={draft.photo} alt="Product" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <GarmentArt scene="room" />}
            <div className="scanline" />
            {step >= 1 && <Tag style={{ top: "30%", left: "54%" }}>Rose pink</Tag>}
            {step >= 2 && <Tag style={{ top: "70%", left: "8%" }}>Embroidered hem</Tag>}
            {step >= 3 && <Tag style={{ top: "46%", left: "58%" }}>Anarkali</Tag>}
          </div>
          <div>
            <div className="row gap-8"><ScanLine size={20} color="var(--violet)" /><span className="eyebrow">AI Product Understanding</span></div>
            <h1 className="h-lg mt-8">ELEV8 is understanding your product…</h1>
            <p className="sub mt-4">{draft.name || "Your product"} · {draft.category}</p>
            <div className="mt-24"><Steps items={ITEMS} current={step} /></div>
            <div className="progress mt-24"><i style={{ width: `${Math.max(pct, 6)}%` }} /></div>
            <p className="mt-8 grad-text" style={{ fontWeight: 800, fontFamily: "var(--font-display)", width: "fit-content" }}>{pct}%</p>
          </div>
        </div>
      </div>
      <style>{`
        .scanline { position:absolute; left:0; right:0; height:70px;
          background: linear-gradient(to bottom, transparent, rgba(122,77,255,.28), transparent);
          border-bottom: 2px solid rgba(160,130,255,.9); animation: scan 2.2s ease-in-out infinite alternate; }
        @keyframes scan { from { top:-70px } to { top: 100% } }
      `}</style>
    </Screen>
  );
}

function Tag({ children, style }) {
  return (
    <span style={{ position: "absolute", ...style, padding: "5px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, background: "rgba(255,255,255,.92)", color: "var(--ink)", boxShadow: "var(--shadow-md)", animation: "toast-in .3s ease" }}>
      {children}
    </span>
  );
}
