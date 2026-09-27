"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Store, MapPin, LocateFixed, ImagePlus, X, ChevronDown } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";
import GarmentArt from "@/components/GarmentArt";
import { useStore } from "@/lib/store";
import AuthLayout from "@/components/AuthLayout";

const CATEGORIES = ["Ethnic Wear", "Sarees", "Bridal", "Kurtas", "Western Wear", "Jewellery", "Footwear"];

export default function BusinessSetup() {
  const router = useRouter();
  const { business, update } = useStore();
  const [form, setForm] = useState(business);
  const [photos, setPhotos] = useState([{ id: "sample" }]);
  const fileRef = useRef(null);

  const addPhotos = (e) => {
    const files = Array.from(e.target.files || []);
    setPhotos((p) => [...p, ...files.map((f) => ({ id: f.name + f.size, url: URL.createObjectURL(f) }))]);
  };

  return (
    <AuthLayout variant="lehenga" scene="room" headline={<>Built for your store,<br />not a template.</>} copy="Tell ELEV8 where you sell and what you sell — every post and experience adapts to it.">
    <Screen tone="soft" width="narrow">
      <TopBar back="/signup">
        <div className="stepper" style={{ width: 160, marginRight: 8 }}><i className="on" /><i className="on" /><i /><i /></div>
      </TopBar>
      <div className="body">
        <p className="eyebrow">Step 2 of 4</p>
        <h1 className="h-lg mt-4">Tell us about your business</h1>
        <p className="sub mt-4">ELEV8 tailors every post and experience to your store.</p>

        <div className="field">
          <label htmlFor="bn">Business Name</label>
          <div className="input">
            <span className="adorn"><Store size={18} /></span>
            <input id="bn" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
        </div>
        <div className="field">
          <label htmlFor="cat">Category</label>
          <div className="input">
            <select id="cat" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <span className="adorn"><ChevronDown size={18} /></span>
          </div>
        </div>
        <div className="field">
          <label htmlFor="loc">Location</label>
          <div className="input">
            <span className="adorn"><MapPin size={18} /></span>
            <input id="loc" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            <button type="button" className="adorn" aria-label="Use current location" style={{ color: "var(--violet)" }}>
              <LocateFixed size={18} />
            </button>
          </div>
        </div>

        <div className="field">
          <label>Store photos <span className="muted">(optional)</span></label>
          <div className="row gap-10" style={{ flexWrap: "wrap" }}>
            {photos.map((p) => (
              <div key={p.id} className="frame" style={{ width: 96, height: 110, borderRadius: 14 }}>
                {p.url
                  ? <img src={p.url} alt="Store" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <GarmentArt variant="lehenga" scene="room" color="#e98b8f" />}
                <button
                  type="button" aria-label="Remove photo"
                  onClick={() => setPhotos((all) => all.filter((x) => x.id !== p.id))}
                  style={{ position: "absolute", top: 6, right: 6, width: 22, height: 22, borderRadius: 99, background: "rgba(20,19,43,.6)", color: "#fff", display: "grid", placeItems: "center" }}
                >
                  <X size={13} />
                </button>
              </div>
            ))}
            <button
              type="button" onClick={() => fileRef.current?.click()}
              style={{ width: 96, height: 110, borderRadius: 14, border: "1.5px dashed var(--line-2)", background: "var(--surface)", color: "var(--ink-3)", display: "grid", placeItems: "center", fontSize: 11.5, fontWeight: 600 }}
            >
              <span className="stack gap-6" style={{ alignItems: "center" }}><ImagePlus size={20} />Add photos</span>
            </button>
            <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={addPhotos} />
          </div>
        </div>
      </div>
      <div className="footer">
        <button
          className="btn primary block"
          disabled={!form.name.trim()}
          onClick={() => { update("business", form); router.push("/onboarding/category"); }}
        >
          Continue
        </button>
      </div>
    </Screen>
    </AuthLayout>
  );
}
