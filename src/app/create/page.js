"use client";

import { useRouter } from "next/navigation";
import { Check, Images, Rotate3d } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";
import { useStore } from "@/lib/store";

const OPTIONS = [
  {
    key: "social", icon: Images, title: "Social Media", text: "Images, videos, captions",
    bg: "linear-gradient(135deg,#4a6bff 0%,#7a4dff 60%,#b04dff 100%)",
    points: ["3 AI photoshoots", "15s reel", "Captions & hashtags"],
  },
  {
    key: "virtual", icon: Rotate3d, title: "Virtual Experience", text: "Try-On · AI Model · 360°",
    bg: "linear-gradient(135deg,#14b8a6 0%,#0e9f8f 55%,#0b7f86 100%)",
    points: ["Live camera try-on", "AI model lookbook", "360° spin"],
  },
];

export default function ChooseExperience() {
  const router = useRouter();
  const { experiences, update } = useStore();
  const any = experiences.social || experiences.virtual;

  return (
    <Screen>
      <TopBar back="/products/new/details" />
      <div className="body">
        <h1 className="h-lg">What would you like to create?</h1>
        <p className="sub mt-4">Pick one or both — ELEV8 builds everything in one go.</p>
        <div className="stack gap-12 mt-20">
          {OPTIONS.map(({ key, icon: Icon, title, text, bg, points }) => {
            const on = experiences[key];
            return (
              <button
                key={key} type="button" aria-pressed={on}
                onClick={() => update("experiences", { [key]: !on })}
                style={{
                  position: "relative", textAlign: "left", color: "#fff", borderRadius: 24, padding: 20, minHeight: 176,
                  background: bg, overflow: "hidden",
                  boxShadow: on ? "0 0 0 3px var(--bg), 0 0 0 5px var(--violet), 0 18px 30px -16px rgba(40,20,120,.6)" : "0 10px 24px -16px rgba(40,20,120,.5)",
                  opacity: on ? 1 : 0.72, transition: "all .2s",
                }}
              >
                <span style={{ position: "absolute", right: -30, bottom: -40, width: 170, height: 170, borderRadius: "50%", background: "rgba(255,255,255,.12)" }} />
                <span style={{ position: "absolute", right: 30, bottom: 20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,.1)" }} />
                <span
                  style={{
                    position: "absolute", top: 16, right: 16, width: 26, height: 26, borderRadius: 8, display: "grid", placeItems: "center",
                    background: on ? "#fff" : "rgba(255,255,255,.2)", color: "var(--violet)", border: "1.5px solid rgba(255,255,255,.7)",
                  }}
                >
                  {on && <Check size={16} strokeWidth={3} />}
                </span>
                <Icon size={40} strokeWidth={1.5} />
                <p className="h-md mt-12" style={{ color: "#fff" }}>{title}</p>
                <p className="small" style={{ opacity: .85 }}>{text}</p>
                <div className="row gap-6 mt-12" style={{ flexWrap: "wrap" }}>
                  {points.map((p) => (
                    <span key={p} style={{ fontSize: 11, fontWeight: 600, padding: "4px 8px", borderRadius: 99, background: "rgba(255,255,255,.18)" }}>{p}</span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="footer">
        <button className="btn primary block" disabled={!any} onClick={() => router.push("/create/processing")}>Continue</button>
      </div>
    </Screen>
  );
}
