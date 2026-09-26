"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MoreVertical, CheckCircle2, Clock3, FileEdit, Wand2, Camera, Trash2, Eye } from "lucide-react";
import GarmentArt from "./GarmentArt";
import { inr, useStore } from "@/lib/store";

const STATUS = {
  posted: { cls: "green", label: "Posted", icon: CheckCircle2 },
  review: { cls: "amber", label: "Needs Review", icon: Clock3 },
  draft: { cls: "gray", label: "Draft", icon: FileEdit },
};

export default function ProductCard({ product, scene = "room" }) {
  const router = useRouter();
  const { setCurrent, deleteProduct } = useStore();
  const [menu, setMenu] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const ref = useRef(null);
  const s = STATUS[product.status] || STATUS.draft;
  const Icon = s.icon;

  useEffect(() => {
    if (!menu) return;
    const close = (e) => { if (!ref.current?.contains(e.target)) setMenu(false); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [menu]);

  const go = (href) => { setCurrent(product.id); router.push(href); };

  return (
    <div className="card row gap-12" style={{ padding: 10, alignItems: "stretch", position: "relative" }}>
      <button onClick={() => go("/create/review")} className="frame" style={{ width: 96, height: 118, borderRadius: 14, flex: "none" }} aria-label={`Open ${product.name}`}>
        <GarmentArt variant={product.variant} color={product.color} accent={product.accent} scene={scene} />
      </button>
      <div className="grow stack" style={{ padding: "4px 0", minWidth: 0 }}>
        <div className="row between gap-8">
          <p className="h-sm" style={{ fontSize: 14.5 }}>{product.name}</p>
          <div ref={ref} style={{ position: "relative" }}>
            <button className="icon-btn ghost" style={{ width: 30, height: 30 }} aria-label="More options" aria-expanded={menu} onClick={() => setMenu(!menu)}>
              <MoreVertical size={16} />
            </button>
            {menu && (
              <div className="card" role="menu" style={{ position: "absolute", right: 0, top: 34, zIndex: 30, width: 190, padding: 6, boxShadow: "var(--shadow-md)" }}>
                <MenuItem icon={Eye} onClick={() => go("/create/review")}>Review content</MenuItem>
                <MenuItem icon={Wand2} onClick={() => go("/create")}>Create new content</MenuItem>
                <MenuItem icon={Camera} onClick={() => go("/experience/try-on")}>Open in try-on</MenuItem>
                <MenuItem icon={Trash2} danger onClick={() => { setMenu(false); setConfirm(true); }}>Delete</MenuItem>
              </div>
            )}
          </div>
        </div>
        <p style={{ fontWeight: 700, fontSize: 15 }}>{inr(product.price)}</p>
        <p className="tiny muted">{product.category}</p>
        <div className="row between" style={{ marginTop: "auto", paddingTop: 8 }}>
          <span className={`badge ${s.cls}`}><Icon size={12} />{s.label}</span>
          {product.status === "review" && <button className="tiny link" onClick={() => go("/create/review")}>Review →</button>}
        </div>
      </div>

      {confirm && (
        <div className="sheet-backdrop" onClick={() => setConfirm(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Delete product">
            <div className="grabber" />
            <p className="h-md">Delete “{product.name}”?</p>
            <p className="sub mt-4">Its generated content and scheduled posts will be removed too.</p>
            <div className="row gap-8 mt-20">
              <button className="btn secondary grow" onClick={() => setConfirm(false)}>Cancel</button>
              <button className="btn grow" style={{ background: "var(--red)", color: "#fff" }} onClick={() => deleteProduct(product.id)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon: Icon, children, onClick, danger }) {
  return (
    <button role="menuitem" onClick={onClick} className="row gap-10" style={{ width: "100%", padding: "9px 10px", borderRadius: 10, fontSize: 13, fontWeight: 600, color: danger ? "var(--red)" : "var(--ink)" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-2)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
      <Icon size={15} /> {children}
    </button>
  );
}
