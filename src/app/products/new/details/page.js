"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Palette, Scissors, Shirt, Triangle, Users, Tags, Pencil, Check, Sparkles } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";
import GarmentArt from "@/components/GarmentArt";
import { useStore } from "@/lib/store";

const INITIAL = [
  { key: "material", icon: Scissors, label: "Material", value: "Embroidered Georgette" },
  { key: "style", icon: Shirt, label: "Style", value: "Anarkali" },
  { key: "silhouette", icon: Triangle, label: "Silhouette", value: "Flared, floor length" },
  { key: "audience", icon: Users, label: "Audience", value: "Festive / Occasion wear" },
];
const TAGS = ["Elegant", "Traditional", "Premium", "Wedding season", "Handcrafted"];
const COLORS = ["#e2667e", "#ec8aa0", "#c9485f", "#f3c46a"];

export default function Details() {
  const router = useRouter();
  const { draft, addProduct } = useStore();
  const [attrs, setAttrs] = useState(INITIAL);
  const [editing, setEditing] = useState(null);
  const [tags, setTags] = useState(TAGS.slice(0, 3));

  const save = () => {
    addProduct({
      name: draft.name, price: Number(draft.price) || 0, category: draft.category,
      variant: "anarkali", color: "#e2667e", accent: "#f3c46a", status: "review", channel: "social",
    });
    router.push("/create");
  };

  return (
    <Screen>
      <TopBar title="Product Details" back="/products/new" right={<span className="badge violet" style={{ marginRight: 6 }}><Sparkles size={12} />AI suggested</span>} />
      <div className="body">
        <div className="card row gap-12" style={{ padding: 12 }}>
          <div className="frame" style={{ width: 64, height: 78, borderRadius: 12, flex: "none" }}>
            {draft.photo ? <img src={draft.photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <GarmentArt scene="room" />}
          </div>
          <div className="grow">
            <p className="row gap-6 tiny muted"><Palette size={13} /> Color</p>
            <p className="h-sm mt-4">Rose Pink</p>
            <div className="row gap-6 mt-8">
              {COLORS.map((c) => <span key={c} style={{ width: 18, height: 18, borderRadius: 99, background: c, boxShadow: "inset 0 0 0 1px rgba(0,0,0,.08)" }} />)}
            </div>
          </div>
        </div>

        <div className="card mt-12">
          {attrs.map((a) => {
            const Icon = a.icon;
            const isEdit = editing === a.key;
            return (
              <div key={a.key} className="list-row">
                <span className="tile-icon" style={{ width: 36, height: 36 }}><Icon size={17} /></span>
                <div className="grow">
                  <p className="tiny muted">{a.label}</p>
                  {isEdit ? (
                    <input
                      autoFocus value={a.value}
                      onChange={(e) => setAttrs((all) => all.map((x) => (x.key === a.key ? { ...x, value: e.target.value } : x)))}
                      onKeyDown={(e) => e.key === "Enter" && setEditing(null)}
                      style={{ border: 0, borderBottom: "1.5px solid var(--violet)", outline: 0, width: "100%", fontSize: 14, fontWeight: 600, padding: "2px 0", background: "transparent" }}
                    />
                  ) : (
                    <p className="small" style={{ fontWeight: 600 }}>{a.value}</p>
                  )}
                </div>
                <button className="icon-btn ghost" style={{ width: 30, height: 30, color: "var(--violet)" }} onClick={() => setEditing(isEdit ? null : a.key)} aria-label={isEdit ? "Done" : `Edit ${a.label}`}>
                  {isEdit ? <Check size={16} /> : <Pencil size={15} />}
                </button>
              </div>
            );
          })}
        </div>

        <div className="card pad mt-12">
          <p className="row gap-6 tiny muted"><Tags size={13} /> Visual tags</p>
          <div className="chips mt-8">
            {TAGS.map((t) => (
              <button key={t} className={`chip ${tags.includes(t) ? "on" : ""}`} style={{ height: 30 }} onClick={() => setTags((x) => (x.includes(t) ? x.filter((y) => y !== t) : [...x, t]))}>{t}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="footer">
        <button className="btn primary block" onClick={save}>Continue</button>
      </div>
    </Screen>
  );
}
