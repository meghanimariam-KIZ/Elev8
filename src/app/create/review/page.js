"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X, PenLine, History, Check, ShoppingBag, Sparkles, ChevronLeft, ChevronRight, Video } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";
import GarmentArt from "@/components/GarmentArt";
import InstagramGlyph from "@/components/InstagramGlyph";
import { useStore, inr } from "@/lib/store";

/** Builds the media carousel from the generated content: photo, then video if present. */
function mediaFor(generated) {
  const slides = [];
  if (generated?.imageUrl) slides.push({ type: "image", url: generated.imageUrl, label: "Photo" });
  if (generated?.videoUrl) slides.push({ type: "video", url: generated.videoUrl, label: "Video" });
  if (!slides.length) slides.push({ type: "placeholder" });
  return slides;
}

export default function Review() {
  const router = useRouter();
  const { current, products, brand, setCurrent, updateProduct } = useStore();
  const slides = mediaFor(current?.generated);
  const [i, setI] = useState(0);
  const [editing, setEditing] = useState(false);
  const [caption, setCaption] = useState("");
  const track = useRef(null);
  const queue = products.filter((p) => p.status === "review" && p.id !== current?.id);

  useEffect(() => {
    if (!current) return;
    setI(0);
    if (current.caption) { setCaption(current.caption); return; }
    const g = current.generated;
    if (g) {
      const tags = (g.hashtags || []).map((h) => (h.startsWith("#") ? h : `#${h}`)).join(" ");
      setCaption([g.caption, tags].filter(Boolean).join("\n"));
    } else {
      setCaption("");
    }
  }, [current]);

  if (!current) {
    return (
      <Screen width="narrow"><TopBar title="Nothing to review" back="/home" /><div className="body"><p className="sub">Add a product to generate content.</p></div></Screen>
    );
  }

  if (!current.generated) {
    return (
      <Screen width="narrow">
        <TopBar title="Nothing generated yet" back="/create" />
        <div className="body"><p className="sub">Run the AI processing step first to generate content for {current.name}.</p></div>
      </Screen>
    );
  }

  const goTo = (idx) => {
    const n = (idx + slides.length) % slides.length;
    setI(n);
    track.current?.scrollTo({ left: n * track.current.clientWidth, behavior: "smooth" });
  };
  const onScroll = () => {
    const el = track.current;
    if (el) setI(Math.round(el.scrollLeft / el.clientWidth));
  };
  const saveCaption = () => { updateProduct(current.id, { caption }); setEditing(false); };
  const approve = () => { updateProduct(current.id, { caption, status: current.status === "posted" ? "posted" : "draft" }); router.push("/publish"); };
  const usePrevious = () => {
    if (!current.previousGenerated) return;
    updateProduct(current.id, { generated: current.previousGenerated, previousGenerated: null, caption: "" });
  };

  const actions = [
    { icon: X, label: "Reject", onClick: () => router.push("/create/feedback") },
    { icon: PenLine, label: editing ? "Save" : "Edit Myself", onClick: () => (editing ? saveCaption() : setEditing(true)) },
    { icon: History, label: "Use Previous", onClick: usePrevious, disabled: !current.previousGenerated },
    { icon: Check, label: "Approve", primary: true, onClick: approve },
  ];

  return (
    <Screen width="medium">
      <TopBar
        title={current.previousGenerated ? "Your new version is ready" : "Your content is ready"}
        subtitle={`${current.name} · ${inr(current.price)}`}
        back="/home"
      />
      <div className="body">
        <div className="split">
          <div className="frame" style={{ aspectRatio: "4/5", maxHeight: 600, borderRadius: 24, boxShadow: "var(--shadow-md)" }}>
            <div ref={track} onScroll={onScroll} style={{ display: "flex", height: "100%", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none" }}>
              {slides.map((s, idx) => (
                <div key={idx} style={{ flex: "0 0 100%", scrollSnapAlign: "start", height: "100%", position: "relative" }}>
                  {s.type === "image" && <img src={s.url} alt={current.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                  {s.type === "video" && <video src={s.url} controls style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                  {s.type === "placeholder" && <GarmentArt scene="studio" variant={current.variant} color={current.color} accent={current.accent} />}
                </div>
              ))}
            </div>
            {slides.length > 1 && <span className="corner">{i + 1}/{slides.length}</span>}
            <span className="badge" style={{ position: "absolute", left: 12, top: 12, background: "rgba(255,255,255,.9)", color: "var(--ink)" }}>
              {slides[i]?.type === "video" ? <Video size={12} color="var(--violet)" /> : <Sparkles size={12} color="var(--violet)" />} {slides[i]?.label || "Preview"}
            </span>
            {slides.length > 1 && (
              <>
                <button className="icon-btn" onClick={() => goTo(i - 1)} aria-label="Previous" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", opacity: .9 }}><ChevronLeft size={18} /></button>
                <button className="icon-btn" onClick={() => goTo(i + 1)} aria-label="Next" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", opacity: .9 }}><ChevronRight size={18} /></button>
                <div className="row gap-6" style={{ position: "absolute", bottom: 12, left: 0, right: 0, justifyContent: "center" }}>
                  {slides.map((_, idx) => (
                    <button key={idx} onClick={() => goTo(idx)} aria-label={`Slide ${idx + 1}`} style={{ width: idx === i ? 18 : 6, height: 6, borderRadius: 9, background: idx === i ? "#fff" : "rgba(255,255,255,.55)", transition: "width .2s" }} />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="stack gap-12">
            <div className="card pad">
              <p className="eyebrow">Caption</p>
              {editing ? (
                <textarea value={caption} onChange={(e) => setCaption(e.target.value)} rows={4} autoFocus
                  style={{ width: "100%", marginTop: 8, border: "1.5px solid var(--violet)", borderRadius: 12, padding: 10, outline: 0, resize: "vertical", fontSize: 14, lineHeight: 1.5 }} />
              ) : (
                <p className="small mt-8" style={{ whiteSpace: "pre-line", lineHeight: 1.6 }}>
                  {caption.split(/(#\w+)/g).map((part, k) => (part.startsWith("#") ? <span key={k} style={{ color: "var(--violet)", fontWeight: 600 }}>{part}</span> : part))}
                </p>
              )}
              <div className="row gap-8 mt-12" style={{ flexWrap: "wrap" }}>
                <span className="chip soft" style={{ height: 28 }}><InstagramGlyph size={14} /> Instagram</span>
                <span className="chip soft" style={{ height: 28 }}><ShoppingBag size={13} /> Shop Now · {inr(current.price)}</span>
              </div>
            </div>

            <div className="card" style={{ padding: "16px 8px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 4 }}>
              {actions.map(({ icon: Icon, label, onClick, primary, disabled }) => (
                <button key={label} onClick={onClick} disabled={disabled} className="stack gap-6" style={{ alignItems: "center", fontSize: 11.5, fontWeight: 600, color: primary ? "var(--green)" : "var(--ink-2)", opacity: disabled ? .4 : 1 }}>
                  <span style={{ width: 52, height: 52, borderRadius: 18, display: "grid", placeItems: "center", background: primary ? "var(--green)" : "var(--surface-2)", color: primary ? "#fff" : "var(--ink)", boxShadow: primary ? "0 10px 20px -8px rgba(34,181,115,.6)" : "none" }}>
                    <Icon size={21} strokeWidth={primary ? 2.8 : 2} />
                  </span>
                  {label}
                </button>
              ))}
            </div>

            {queue.length > 0 && (
              <div className="card pad">
                <p className="eyebrow">Also waiting for review</p>
                <div className="stack gap-8 mt-8">
                  {queue.map((p) => (
                    <button key={p.id} className="row gap-10" style={{ textAlign: "left" }} onClick={() => setCurrent(p.id)}>
                      <span className="frame" style={{ width: 36, height: 44, borderRadius: 8, flex: "none" }}><GarmentArt variant={p.variant} color={p.color} accent={p.accent} scene="studio" /></span>
                      <span className="small grow" style={{ fontWeight: 600 }}>{p.name}</span>
                      <ChevronRight size={16} color="var(--ink-3)" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Screen>
  );
}
