"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";
import GarmentArt from "@/components/GarmentArt";
import { MODELS, PRESENTATION_SCENE } from "@/lib/models";

export default function ChooseModel() {
  const router = useRouter();
  const [gender, setGender] = useState("Female");
  const [model, setModel] = useState("f1");
  const [body, setBody] = useState("Regular");
  const [pres, setPres] = useState("Lifestyle");

  const go = () => {
    const q = new URLSearchParams({ model, body, scene: PRESENTATION_SCENE[pres], gender });
    router.push(`/experience/model/view?${q}`);
  };

  return (
    <Screen width="medium">
      <TopBar title="Choose your model" subtitle="See your products on a model that looks like your customers." back="/experience" />
      <div className="body">
        <div className="row gap-4" style={{ padding: 4, background: "var(--surface-2)", borderRadius: 14, width: "fit-content" }}>
          {Object.keys(MODELS).map((g) => (
            <button
              key={g} onClick={() => { setGender(g); setModel(MODELS[g][0].id); }}
              className={`chip ${gender === g ? "grad on" : ""}`} style={{ border: 0, background: gender === g ? undefined : "transparent", height: 34, padding: "0 20px" }}
            >
              {g}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }} className="mt-16">
          {MODELS[gender].map((m) => {
            const on = model === m.id;
            return (
              <button key={m.id} onClick={() => setModel(m.id)} aria-pressed={on} className="stack gap-4" style={{ alignItems: "center" }}>
                <span
                  className="frame" style={{ width: "100%", aspectRatio: "3/4", maxHeight: 220, borderRadius: 14, display: "block", boxShadow: on ? "0 0 0 2px var(--bg), 0 0 0 4px var(--violet)" : "none" }}
                >
                  <GarmentArt scene="studio" variant={gender === "Male" ? "kurta" : "anarkali"} color={gender === "Male" ? "#f1e3cf" : "#e2667e"} accent={gender === "Male" ? "#c9a25a" : "#f3c46a"} skin={m.skin} hair={m.hair} />
                  {on && <span style={{ position: "absolute", top: 6, right: 6, width: 20, height: 20, borderRadius: 99, background: "var(--violet)", color: "#fff", display: "grid", placeItems: "center" }}><Check size={12} strokeWidth={3} /></span>}
                </span>
                <span className="tiny" style={{ fontWeight: 600 }}>{m.name}</span>
              </button>
            );
          })}
        </div>

        <Group label="Body Type" options={["Petite", "Regular", "Tall", "Plus"]} value={body} onChange={setBody} />
        <Group label="Presentation" options={["Studio", "Lifestyle", "Outdoor"]} value={pres} onChange={setPres} />

        <div className="frame mt-16" style={{ height: 240, borderRadius: 18, background: "var(--surface-2)" }}>
          <GarmentArt scene={PRESENTATION_SCENE[pres]} variant={gender === "Male" ? "kurta" : "anarkali"} color={gender === "Male" ? "#f1e3cf" : "#e2667e"} accent={gender === "Male" ? "#c9a25a" : "#f3c46a"} skin={MODELS[gender].find((m) => m.id === model)?.skin} hair={MODELS[gender].find((m) => m.id === model)?.hair} fit="meet" align="xMidYMax" />
          <span className="corner">{pres} preview</span>
        </div>
      </div>
      <div className="footer">
        <button className="btn primary block" onClick={go}>Continue</button>
      </div>
    </Screen>
  );
}

function Group({ label, options, value, onChange }) {
  return (
    <div className="mt-20">
      <p className="small" style={{ fontWeight: 700 }}>{label}</p>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${options.length},1fr)`, gap: 6, marginTop: 8 }}>
        {options.map((o) => (
          <button key={o} className={`chip grad ${value === o ? "on" : ""}`} style={{ justifyContent: "center" }} onClick={() => onChange(o)}>{o}</button>
        ))}
      </div>
    </div>
  );
}
