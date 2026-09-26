"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Camera, Image as ImageIcon, ChevronDown, Sparkles } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";
import GarmentArt from "@/components/GarmentArt";
import { useStore } from "@/lib/store";

const CATEGORIES = ["Ethnic Wear", "Sarees", "Bridal", "Kurtas", "Western Wear", "Jewellery"];

export default function AddProduct() {
  const router = useRouter();
  const { draft, update } = useStore();
  const camRef = useRef(null);
  const galRef = useRef(null);

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (f) update("draft", { photo: URL.createObjectURL(f) });
  };
  const set = (k) => (e) => update("draft", { [k]: e.target.value });

  return (
    <Screen>
      <TopBar title="Add your product" back="/home" />
      <div className="body">
        <p className="sub" style={{ marginTop: -6 }}>Upload once. <b>ELEV8</b> handles the rest.</p>

        <div className="card row mt-16" style={{ padding: 6 }}>
          {[
            { ref: camRef, icon: Camera, label: "Camera", capture: "environment" },
            { ref: galRef, icon: ImageIcon, label: "Gallery" },
          ].map(({ ref, icon: Icon, label, capture }, i) => (
            <button
              key={label} type="button" onClick={() => ref.current?.click()}
              className="grow stack gap-8"
              style={{ alignItems: "center", padding: "20px 0", borderLeft: i ? "1px solid var(--line)" : 0 }}
            >
              <span className="tile-icon"><Icon size={20} /></span>
              <span className="small" style={{ fontWeight: 600 }}>{label}</span>
              <input ref={ref} type="file" accept="image/*" capture={capture} hidden onChange={onFile} />
            </button>
          ))}
        </div>

        <div className="frame mt-12" style={{ height: 170, background: "var(--surface-2)" }}>
          {draft.photo
            ? <img src={draft.photo} alt="Product" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <GarmentArt scene="room" />}
          <span className="corner row gap-4"><Sparkles size={12} /> {draft.photo ? "Your photo" : "Sample"}</span>
        </div>

        <div className="field">
          <label htmlFor="pn">Product Name</label>
          <div className="input"><input id="pn" value={draft.name} onChange={set("name")} /></div>
        </div>
        <div className="field">
          <label htmlFor="pc">Category</label>
          <div className="input">
            <select id="pc" value={draft.category} onChange={set("category")}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <span className="adorn"><ChevronDown size={18} /></span>
          </div>
        </div>
        <div className="field">
          <label htmlFor="pp">Price</label>
          <div className="input">
            <span className="prefix">₹</span>
            <input id="pp" inputMode="numeric" value={draft.price} onChange={(e) => update("draft", { price: e.target.value.replace(/\D/g, "") })} />
          </div>
        </div>
      </div>
      <div className="footer">
        <button className="btn primary block" disabled={!draft.name.trim()} onClick={() => router.push("/products/new/analyzing")}>Next</button>
      </div>
    </Screen>
  );
}
