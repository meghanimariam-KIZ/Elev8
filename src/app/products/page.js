"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Plus, PackageOpen } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/lib/store";

const SCENES = ["room", "studio", "outdoor", "luxury"];
const SORTS = { recent: "Newest", "price-asc": "Price: low to high", "price-desc": "Price: high to low", name: "Name" };

export default function Products() {
  const { products } = useStore();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("recent");

  const counts = {
    all: products.length,
    social: products.filter((p) => p.channel === "social").length,
    experience: products.filter((p) => p.channel === "experience").length,
    review: products.filter((p) => p.status === "review").length,
  };

  const list = useMemo(() => {
    const out = products.filter((p) => {
      if (q && !`${p.name} ${p.category}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (filter === "review") return p.status === "review";
      if (filter !== "all") return p.channel === filter;
      return true;
    });
    if (sort === "price-asc") out.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") out.sort((a, b) => b.price - a.price);
    if (sort === "name") out.sort((a, b) => a.name.localeCompare(b.name));
    return out;
  }, [products, q, filter, sort]);

  return (
    <Screen>
      <TopBar title="Products" subtitle={`${products.length} products in your library`} right={<Link href="/products/new" className="btn primary sm"><Plus size={16} /> Add product</Link>} />
      <div className="body">
        <div className="row gap-8" style={{ flexWrap: "wrap" }}>
          <div className="input grow" style={{ height: 46, minWidth: 220 }}>
            <span className="adorn"><Search size={18} /></span>
            <input placeholder="Search products…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search products" />
          </div>
          <div className="input" style={{ height: 46, width: 200 }}>
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
              {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>
        <div className="chips scroll mt-12">
          {[["all", "All"], ["social", "Social"], ["experience", "Experience"], ["review", "Needs review"]].map(([k, label]) => (
            <button key={k} className={`chip grad ${filter === k ? "on" : ""}`} onClick={() => setFilter(k)}>
              {label} <span style={{ opacity: .7 }}>({counts[k]})</span>
            </button>
          ))}
        </div>
        <div className="g-auto mt-16">
          {list.map((p, i) => <ProductCard key={p.id} product={p} scene={SCENES[i % 4]} />)}
        </div>
        {list.length === 0 && (
          <div className="card pad center mt-16" style={{ padding: 40 }}>
            <PackageOpen size={36} color="var(--ink-3)" style={{ margin: "0 auto" }} />
            <p className="h-sm mt-12">{products.length ? "No products match" : "No products yet"}</p>
            <p className="small muted mt-4">{products.length ? "Try a different search or filter." : "Add your first product and ELEV8 will do the rest."}</p>
            {!products.length && <Link href="/products/new" className="btn primary sm mt-16">Add product</Link>}
          </div>
        )}
      </div>
    </Screen>
  );
}
