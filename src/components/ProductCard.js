import Link from "next/link";
import { Share2, MoreVertical, CheckCircle2, Clock3, FileEdit } from "lucide-react";
import GarmentArt from "./GarmentArt";
import { inr } from "@/lib/store";

const STATUS = {
  posted: { cls: "green", label: "Posted", icon: CheckCircle2 },
  review: { cls: "amber", label: "Needs Review", icon: Clock3 },
  draft: { cls: "gray", label: "Draft", icon: FileEdit },
};

export default function ProductCard({ product, scene = "room" }) {
  const s = STATUS[product.status] || STATUS.draft;
  const Icon = s.icon;
  return (
    <div className="card row gap-12" style={{ padding: 10, alignItems: "stretch" }}>
      <Link href="/create/review" className="frame" style={{ width: 92, height: 112, borderRadius: 14, flex: "none" }}>
        <GarmentArt variant={product.variant} color={product.color} accent={product.accent} scene={scene} />
      </Link>
      <div className="grow stack" style={{ padding: "4px 0" }}>
        <div className="row between gap-8">
          <p className="h-sm" style={{ fontSize: 14.5 }}>{product.name}</p>
          <button className="icon-btn ghost" style={{ width: 28, height: 28 }} aria-label="More options"><MoreVertical size={16} /></button>
        </div>
        <p style={{ fontWeight: 700, fontSize: 15 }}>{inr(product.price)}</p>
        <p className="tiny muted">{product.category}</p>
        <div className="row between mt-8" style={{ marginTop: "auto" }}>
          <span className={`badge ${s.cls}`}><Icon size={12} />{s.label}</span>
          <button className="icon-btn ghost" style={{ width: 28, height: 28, color: "var(--ink-3)" }} aria-label="Share"><Share2 size={15} /></button>
        </div>
      </div>
    </div>
  );
}
