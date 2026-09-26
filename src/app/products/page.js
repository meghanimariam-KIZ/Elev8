"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import { Screen, BottomNav } from "@/components/Screen";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/lib/store";

const SCENES = ["room", "studio", "outdoor", "luxury"];

export default function Products() {
  const { products } = useStore();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");

  const counts = {
    all: products.length,
    social: products.filter((p) => p.channel === "social").length,
    experience: products.filter((p) => p.channel === "experience").length,
    review: products.filter((p) => p.status === "review").length,
  };

  const list = useMemo(
    () =>
      products.filter((p) => {
        if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
        if (filter === "review") return p.status === "review";
        if (filter !== "all") return p.channel === filter;
        return true;
      }),
    [products, q, filter],
  );

  return (
    <Screen>
      <div className="topbar" style={{ paddingLeft: 20 }}>
        <h1 className="h-lg" style={{ fontSize: 24 }}>Products</h1>
        <Link href="/products/new" className="btn primary sm" style={{ height: 36 }}><Plus size={16} /> Add</Link>
      </div>
      <div className="body">
        <div className="row gap-8">
          <div className="input grow" style={{ height: 46 }}>
            <span className="adorn"><Search size={18} /></span>
            <input placeholder="Search products…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search products" />
          </div>
          <button className="icon-btn" style={{ width: 46, height: 46, borderRadius: 14 }} aria-label="Filters"><SlidersHorizontal size={18} /></button>
        </div>
        <div className="chips scroll mt-12">
          {[
            ["all", "All"], ["social", "Social"], ["experience", "Experience"], ["review", "Review"],
          ].map(([k, label]) => (
            <button key={k} className={`chip grad ${filter === k ? "on" : ""}`} onClick={() => setFilter(k)}>
              {label} <span style={{ opacity: .7 }}>({counts[k]})</span>
            </button>
          ))}
        </div>
        <div className="stack gap-10 mt-16">
          {list.map((p, i) => <ProductCard key={p.id} product={p} scene={SCENES[i % 4]} />)}
          {list.length === 0 && <p className="center muted small mt-24">No products match “{q}”.</p>}
        </div>
      </div>
      <BottomNav />
    </Screen>
  );
}
