"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Plus, Check, Brain, CheckCircle2 } from "lucide-react";
import { useStore } from "@/lib/store";

const TONES = ["Elegant", "Festive", "Traditional", "Modern", "Playful", "Luxurious", "Minimal"];
const AUDIENCES = ["Women 25–40", "Wedding shoppers", "College students", "Working professionals", "NRI customers"];
const SWATCHES = ["#e2667e", "#f3c46a", "#2b1a2f", "#3a5bff", "#16b6a3", "#7a4dff", "#b3244a", "#f5efe6"];

export default function BrandBrainForm({ cta = "Save & Continue", next = "/home" }) {
  const router = useRouter();
  const { brand, business, update } = useStore();
  const [form, setForm] = useState(brand);
  const [logo, setLogo] = useState(null);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef(null);

  const toggle = (key, v) =>
    setForm((f) => ({ ...f, [key]: f[key].includes(v) ? f[key].filter((x) => x !== v) : [...f[key], v] }));

  return (
    <>
      <div className="body">
        <div className="card pad row gap-12" style={{ background: "var(--grad-soft)", borderColor: "transparent" }}>
          <span className="tile-icon solid"><Brain size={20} /></span>
          <p className="small" style={{ color: "var(--ink-2)", lineHeight: 1.45 }}>
            Your style guide for every post. ELEV8 uses this to keep content consistent — like a designer who already knows your brand.
          </p>
        </div>

        <div className="field">
          <label>Brand Name</label>
          <div className="input"><input value={business.name} readOnly /></div>
        </div>

        <div className="field">
          <label>Logo</label>
          <button
            type="button" onClick={() => fileRef.current?.click()}
            className="card row gap-12" style={{ padding: 12, textAlign: "left" }}
          >
            <span
              style={{
                width: 56, height: 56, borderRadius: 14, display: "grid", placeItems: "center", overflow: "hidden",
                background: "#fbf3ec", border: "1px solid var(--line)", fontFamily: "var(--font-display)", fontWeight: 800, color: "#b3244a",
              }}
            >
              {logo ? <img src={logo} alt="Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} /> : "TARA"}
            </span>
            <span className="grow">
              <span className="h-sm" style={{ fontSize: 14, display: "block" }}>{logo ? "Logo uploaded" : "Upload your logo"}</span>
              <span className="tiny muted">PNG or SVG, transparent background</span>
            </span>
            <Upload size={18} color="var(--violet)" />
          </button>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && setLogo(URL.createObjectURL(e.target.files[0]))} />
        </div>

        <div className="field">
          <label>Brand Colors</label>
          <div className="row gap-10" style={{ flexWrap: "wrap" }}>
            {SWATCHES.map((c) => {
              const on = form.colors.includes(c);
              return (
                <button
                  key={c} type="button" onClick={() => toggle("colors", c)} aria-pressed={on} aria-label={`Colour ${c}`}
                  style={{
                    width: 36, height: 36, borderRadius: 12, background: c, display: "grid", placeItems: "center",
                    boxShadow: on ? "0 0 0 2px var(--bg), 0 0 0 4px var(--violet)" : "inset 0 0 0 1px rgba(0,0,0,.08)",
                    color: c === "#f5efe6" || c === "#f3c46a" ? "#14132b" : "#fff",
                  }}
                >
                  {on && <Check size={16} strokeWidth={3} />}
                </button>
              );
            })}
            <span style={{ width: 36, height: 36, borderRadius: 12, border: "1.5px dashed var(--line-2)", display: "grid", placeItems: "center", color: "var(--ink-3)" }}>
              <Plus size={16} />
            </span>
          </div>
        </div>

        <div className="field">
          <label>Tone of voice</label>
          <div className="chips">
            {TONES.map((t) => (
              <button key={t} type="button" className={`chip grad ${form.tone.includes(t) ? "on" : ""}`} onClick={() => toggle("tone", t)}>{t}</button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>Who do you sell to?</label>
          <div className="chips">
            {AUDIENCES.map((t) => (
              <button key={t} type="button" className={`chip ${form.audience.includes(t) ? "on" : ""}`} onClick={() => toggle("audience", t)}>{t}</button>
            ))}
          </div>
        </div>

        <div className="field">
          <label htmlFor="tagline">Signature line</label>
          <div className="input">
            <input id="tagline" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
          </div>
        </div>
      </div>
      <div className="footer">
        <button className="btn primary block" onClick={() => {
          update("brand", form);
          if (next) router.push(next);
          else { setSaved(true); setTimeout(() => setSaved(false), 1800); }
        }}>{cta}</button>
      </div>
      {saved && <div className="toast"><CheckCircle2 size={18} color="#4ade80" /> Brand Brain saved</div>}
    </>
  );
}
