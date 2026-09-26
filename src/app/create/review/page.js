"use client";

import { Suspense, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, PenLine, History, Check, ShoppingBag, Sparkles } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";
import GarmentArt from "@/components/GarmentArt";
import InstagramGlyph from "@/components/InstagramGlyph";

const V1 = [
  { scene: "room", label: "Lifestyle" },
  { scene: "studio", label: "Studio" },
  { scene: "outdoor", label: "Outdoor" },
];
const V2 = [
  { scene: "luxury", label: "Luxury" },
  { scene: "luxury", label: "Luxury · alt", mirror: true },
  { scene: "room", label: "Lifestyle" },
];

function Review() {
  const router = useRouter();
  const params = useSearchParams();
  const regenerated = params.get("v") === "2";
  const slides = regenerated ? V2 : V1;
  const [i, setI] = useState(0);
  const [editing, setEditing] = useState(false);
  const [caption, setCaption] = useState("Grace in every detail ✨\n#EthnicWear #WeddingSeason #Fashion #TaraEthnicWear");
  const track = useRef(null);

  const onScroll = () => {
    const el = track.current;
    if (el) setI(Math.round(el.scrollLeft / el.clientWidth));
  };

  const actions = [
    { icon: X, label: "Reject", onClick: () => router.push("/create/feedback") },
    { icon: PenLine, label: editing ? "Done" : "Edit Myself", onClick: () => setEditing(!editing) },
    { icon: History, label: "Use Previous", onClick: () => router.push("/create/review") },
    { icon: Check, label: "Approve", primary: true, onClick: () => router.push("/publish") },
  ];

  return (
    <Screen>
      <TopBar title={regenerated ? "Your new version is ready" : "Your content is ready"} back="/home" />
      <div className="body">
        <div className="frame" style={{ height: 380, borderRadius: 24, boxShadow: "var(--shadow-md)" }}>
          <div
            ref={track} onScroll={onScroll}
            style={{ display: "flex", height: "100%", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
          >
            {slides.map((s, idx) => (
              <div key={idx} style={{ flex: "0 0 100%", scrollSnapAlign: "start", height: "100%" }}>
                <GarmentArt scene={s.scene} mirror={s.mirror} />
              </div>
            ))}
          </div>
          <span className="corner">{i + 1}/{slides.length}</span>
          <span className="badge" style={{ position: "absolute", left: 12, top: 12, background: "rgba(255,255,255,.9)", color: "var(--ink)" }}>
            <Sparkles size={12} color="var(--violet)" /> {slides[i].label}
          </span>
          <div className="row gap-6" style={{ position: "absolute", bottom: 12, left: 0, right: 0, justifyContent: "center" }}>
            {slides.map((_, idx) => (
              <span key={idx} style={{ width: idx === i ? 18 : 6, height: 6, borderRadius: 9, background: idx === i ? "#fff" : "rgba(255,255,255,.55)", transition: "width .2s" }} />
            ))}
          </div>
        </div>

        <div className="card pad mt-12">
          {editing ? (
            <textarea
              value={caption} onChange={(e) => setCaption(e.target.value)} rows={3} autoFocus
              style={{ width: "100%", border: 0, outline: 0, resize: "none", fontSize: 14, lineHeight: 1.5, background: "transparent" }}
            />
          ) : (
            <p className="small" style={{ whiteSpace: "pre-line", lineHeight: 1.55 }}>
              {caption.split(/(#\w+)/g).map((part, k) => (part.startsWith("#") ? <span key={k} style={{ color: "var(--violet)", fontWeight: 600 }}>{part}</span> : part))}
            </p>
          )}
          <div className="row gap-8 mt-12">
            <span className="chip soft" style={{ height: 28 }}><InstagramGlyph size={14} /> Instagram</span>
            <span className="chip soft" style={{ height: 28 }}><ShoppingBag size={13} /> Shop Now</span>
          </div>
        </div>
      </div>
      <div className="footer" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
        {actions.map(({ icon: Icon, label, onClick, primary }) => (
          <button key={label} onClick={onClick} className="stack gap-6" style={{ alignItems: "center", fontSize: 11.5, fontWeight: 600, color: primary ? "var(--green)" : "var(--ink-2)" }}>
            <span
              style={{
                width: 52, height: 52, borderRadius: 18, display: "grid", placeItems: "center",
                background: primary ? "var(--green)" : "var(--surface)", color: primary ? "#fff" : "var(--ink)",
                border: primary ? 0 : "1px solid var(--line)", boxShadow: primary ? "0 10px 20px -8px rgba(34,181,115,.6)" : "var(--shadow-sm)",
              }}
            >
              <Icon size={21} strokeWidth={primary ? 2.8 : 2} />
            </span>
            {label}
          </button>
        ))}
      </div>
    </Screen>
  );
}

export default function ReviewPage() {
  return <Suspense><Review /></Suspense>;
}
