"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, Heart, Camera, Rotate3d, Download, Sparkles } from "lucide-react";
import { Screen } from "@/components/Screen";
import GarmentArt, { SCENES } from "@/components/GarmentArt";
import { MODELS } from "@/lib/models";
import { useStore } from "@/lib/store";

function ModelView() {
  const params = useSearchParams();
  const { products } = useStore();
  const all = [...MODELS.Female, ...MODELS.Male];
  const m = all.find((x) => x.id === params.get("model")) || all[0];
  const male = m.id.startsWith("m");
  const scene = params.get("scene") || "room";
  const looks = male ? [{ variant: "kurta", color: "#f1e3cf", accent: "#c9a25a" }] : products.filter((p) => p.variant !== "kurta").slice(0, 4);
  const [look, setLook] = useState(0);
  const [liked, setLiked] = useState(false);
  const L = looks[look] || looks[0];

  return (
    <Screen tone="black" className="immersive">
      <div style={{ position: "absolute", inset: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(${(SCENES[scene] || SCENES.room).wall[0]}, ${(SCENES[scene] || SCENES.room).wall[1]} 70%, ${(SCENES[scene] || SCENES.room).floor})` }} />
        <GarmentArt
          scene={scene} fit="meet" align="xMidYMax" variant={L.variant} color={L.color} accent={L.accent} skin={m.skin} hair={m.hair}
          style={{ position: "absolute", left: 0, top: 70, width: "100%", height: "calc(100% - 270px)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,.35), transparent 20%, transparent 62%, rgba(10,8,30,.85))" }} />
      </div>
      <div className="row between" style={{ position: "relative", padding: "16px 16px 6px", width: "100%", maxWidth: 960, margin: "0 auto" }}>
        <Link href="/experience/model" className="icon-btn dark" aria-label="Back"><ChevronLeft size={22} /></Link>
        <span className="chip" style={{ background: "rgba(255,255,255,.16)", border: 0, color: "#fff", backdropFilter: "blur(10px)" }}>
          <Sparkles size={13} /> AI Model · {m.name}
        </span>
        <button className="icon-btn dark" onClick={() => setLiked(!liked)} aria-label="Favourite" aria-pressed={liked}>
          <Heart size={18} fill={liked ? "#ff4fa3" : "none"} color={liked ? "#ff4fa3" : "#fff"} />
        </button>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ position: "relative", padding: "0 20px 34px", color: "#fff", width: "100%", maxWidth: 520, margin: "0 auto" }}>
        <p className="h-md" style={{ color: "#fff" }}>{L.name || "Festive Kurta Set"}</p>
        <p className="tiny" style={{ opacity: .7 }}>{params.get("body") || "Regular"} fit · {scene} scene</p>
        {looks.length > 1 && (
          <div className="row gap-8 mt-12">
            {looks.map((x, i) => (
              <button key={i} onClick={() => setLook(i)} aria-label={x.name} style={{ width: 44, height: 54, borderRadius: 12, overflow: "hidden", border: i === look ? "2px solid #fff" : "2px solid rgba(255,255,255,.25)" }}>
                <GarmentArt scene="studio" variant={x.variant} color={x.color} accent={x.accent} />
              </button>
            ))}
          </div>
        )}
        <div className="row between mt-20" style={{ padding: "0 12px" }}>
          <Action href="/experience/try-on" icon={Camera} label="Try" />
          <Action href="/experience/360" icon={Rotate3d} label="360°" big />
          <Action icon={Download} label="Save" />
        </div>
      </div>
    </Screen>
  );
}

function Action({ href, icon: Icon, label, big }) {
  const inner = (
    <>
      <span
        className="icon-btn dark"
        style={{ width: big ? 64 : 50, height: big ? 64 : 50, borderRadius: 99, background: big ? "var(--grad)" : undefined, border: big ? 0 : undefined }}
      >
        <Icon size={big ? 24 : 20} />
      </span>
      {label}
    </>
  );
  const style = { alignItems: "center", fontSize: 11.5, fontWeight: 600, color: "#fff" };
  return href
    ? <Link href={href} className="stack gap-6" style={style}>{inner}</Link>
    : <button className="stack gap-6" style={style}>{inner}</button>;
}

export default function Page() {
  return <Suspense><ModelView /></Suspense>;
}
