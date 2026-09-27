"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Image as ImageIcon, ChevronDown, Sparkles, X } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";
import GarmentArt from "@/components/GarmentArt";
import { useStore } from "@/lib/store";
import { createClient } from "@/utils/supabase/client";
import { PRODUCT_PHOTOS_BUCKET } from "@/lib/config";

const CATEGORIES = ["Ethnic Wear", "Sarees", "Bridal", "Kurtas", "Western Wear", "Jewellery"];

export default function AddProduct() {
  const router = useRouter();
  const { draft, update } = useStore();
  const camRef = useRef(null);
  const galRef = useRef(null);
  const [drag, setDrag] = useState(false);
  const [touched, setTouched] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const setFile = async (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    update("draft", { photo: URL.createObjectURL(f), imageUrl: null });
    setUploading(true);
    setUploadError(null);
    try {
      const supabase = createClient();
      const ext = f.name.includes(".") ? f.name.slice(f.name.lastIndexOf(".")) : "";
      const path = `${crypto.randomUUID()}${ext}`;
      const { error } = await supabase.storage.from(PRODUCT_PHOTOS_BUCKET).upload(path, f);
      if (error) throw error;
      const { data } = supabase.storage.from(PRODUCT_PHOTOS_BUCKET).getPublicUrl(path);
      update("draft", { imageUrl: data.publicUrl });
    } catch (err) {
      setUploadError(err.message || "Couldn't upload the photo.");
    } finally {
      setUploading(false);
    }
  };
  const removePhoto = () => {
    update("draft", { photo: null, imageUrl: null });
    setUploadError(null);
  };
  const set = (k) => (e) => update("draft", { [k]: e.target.value });
  // Blocks continuing while the photo is still uploading, and blocks it on a failed
  // upload too — otherwise the next step falls back to a browser-only blob: URL that
  // n8n can't fetch, or an empty productImageUrl (see src/app/create/processing/page.js).
  const valid = draft.name.trim() && Number(draft.price) > 0 && !uploading && !uploadError;

  const next = (e) => {
    e.preventDefault();
    setTouched(true);
    if (valid) router.push("/products/new/analyzing");
  };

  return (
    <Screen width="medium">
      <TopBar title="Add your product" subtitle="Upload once. ELEV8 handles the rest." back="/products" />
      <form className="body" onSubmit={next} id="add-product">
        <div className="split">
          <div>
            <div
              className="frame"
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); setFile(e.dataTransfer.files?.[0]); }}
              style={{ aspectRatio: "4/5", maxHeight: 520, width: "100%", background: "var(--surface-2)", outline: drag ? "2px dashed var(--violet)" : "none", outlineOffset: -8 }}
            >
              {draft.photo
                ? <img src={draft.photo} alt="Product" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <GarmentArt scene="room" style={{ opacity: 0.35 }} />}
              {!draft.photo && (
                <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center", padding: 20 }}>
                  <div>
                    <p className="h-sm">Drop a product photo here</p>
                    <p className="tiny muted mt-4">or use the camera / gallery below · JPG, PNG</p>
                  </div>
                </div>
              )}
              {draft.photo && (
                <button type="button" onClick={removePhoto} className="icon-btn" style={{ position: "absolute", top: 10, right: 10 }} aria-label="Remove photo"><X size={16} /></button>
              )}
              {draft.photo && (
                <span className="corner row gap-4" style={{ right: "auto", left: 10 }}>
                  <Sparkles size={12} /> {uploading ? "Uploading…" : "Ready to analyse"}
                </span>
              )}
            </div>
            {uploadError && <p className="tiny mt-8" style={{ color: "var(--red)" }}>{uploadError} Remove the photo and try again, or continue without one.</p>}
            <div className="card row mt-12" style={{ padding: 6 }}>
              {[
                { ref: camRef, icon: Camera, label: "Camera", capture: "environment" },
                { ref: galRef, icon: ImageIcon, label: "Gallery" },
              ].map(({ ref, icon: Icon, label, capture }, i) => (
                <button key={label} type="button" onClick={() => ref.current?.click()} className="grow row gap-10" style={{ justifyContent: "center", padding: "14px 0", borderLeft: i ? "1px solid var(--line)" : 0 }}>
                  <span className="tile-icon" style={{ width: 36, height: 36 }}><Icon size={18} /></span>
                  <span className="small" style={{ fontWeight: 600 }}>{label}</span>
                  <input ref={ref} type="file" accept="image/*" capture={capture} hidden onChange={(e) => setFile(e.target.files?.[0])} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="field" style={{ marginTop: 0 }}>
              <label htmlFor="pn">Product Name</label>
              <div className="input" style={touched && !draft.name.trim() ? { borderColor: "var(--red)" } : undefined}>
                <input id="pn" value={draft.name} onChange={set("name")} placeholder="e.g. Elegant Anarkali" />
              </div>
              {touched && !draft.name.trim() && <p className="tiny" style={{ color: "var(--red)" }}>Give your product a name.</p>}
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
              <div className="input" style={touched && !(Number(draft.price) > 0) ? { borderColor: "var(--red)" } : undefined}>
                <span className="prefix">₹</span>
                <input id="pp" inputMode="numeric" placeholder="2499" value={draft.price} onChange={(e) => update("draft", { price: e.target.value.replace(/\D/g, "") })} />
              </div>
              {touched && !(Number(draft.price) > 0) && <p className="tiny" style={{ color: "var(--red)" }}>Enter a price.</p>}
            </div>
            <div className="card pad mt-20 row gap-10" style={{ background: "var(--grad-soft)", border: 0 }}>
              <Sparkles size={18} color="var(--violet)" style={{ flex: "none" }} />
              <p className="tiny" style={{ color: "var(--ink-2)", lineHeight: 1.5 }}>ELEV8 will detect colour, fabric, style and audience from the photo — you can edit everything on the next step.</p>
            </div>
            <button type="submit" className="btn primary block mt-20 desktop-only" disabled={!valid}>Next</button>
          </div>
        </div>
      </form>
      <div className="footer mobile-only">
        <button type="submit" form="add-product" className="btn primary block" disabled={!valid}>Next</button>
      </div>
    </Screen>
  );
}
