"use client";

import Link from "next/link";
import { Bell, PackagePlus, Wand2, Rotate3d, CalendarDays, BarChart3, Brain, ArrowRight } from "lucide-react";
import { Screen, BottomNav } from "@/components/Screen";
import GarmentArt from "@/components/GarmentArt";
import { useStore } from "@/lib/store";

const ACTIONS = [
  { href: "/products/new", icon: PackagePlus, label: "Add Product" },
  { href: "/create", icon: Wand2, label: "Create Content" },
  { href: "/experience", icon: Rotate3d, label: "Try-On / 360°" },
  { href: "/calendar", icon: CalendarDays, label: "Calendar" },
  { href: "/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/brand", icon: Brain, label: "Brand Brain" },
];

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

export default function Home() {
  const { business, products } = useStore();
  const review = products.filter((p) => p.status === "review").length + 2;
  const stats = [
    { n: products.length, label: "Products" },
    { n: 3, label: "Content" },
    { n: 2, label: "Pending" },
    { n: products.filter((p) => p.status === "posted").length, label: "Published" },
  ];

  return (
    <Screen>
      <div className="topbar" style={{ paddingLeft: 20 }}>
        <div className="grow">
          <p className="small muted" suppressHydrationWarning>{greeting()},</p>
          <h1 className="h-md">{business.name}</h1>
        </div>
        <Link href="/create/review" className="icon-btn" aria-label="Notifications">
          <Bell size={19} /><span className="dot" />
        </Link>
      </div>

      <div className="body">
        {/* Hero: review queue */}
        <div
          className="card"
          style={{ overflow: "hidden", position: "relative", border: 0, background: "linear-gradient(135deg,#fde9f1,#ece8ff)" }}
        >
          <div className="row" style={{ alignItems: "stretch" }}>
            <div className="grow" style={{ padding: "18px 12px 14px 18px" }}>
              <span className="badge violet">AI · New</span>
              <p className="h-md mt-8" style={{ fontSize: 17 }}>{review} products are ready for your review</p>
              <p className="tiny muted mt-4">Photos, captions & a try-on look generated overnight.</p>
            </div>
            <div style={{ width: 104, flex: "none", position: "relative" }}>
              <div style={{ position: "absolute", inset: "14px -22px 6px 10px", transform: "rotate(6deg)", borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
                <GarmentArt scene="luxury" color="#e2667e" />
              </div>
              <div style={{ position: "absolute", left: -8, bottom: 4, width: 54, height: 68, transform: "rotate(-8deg)", borderRadius: 12, overflow: "hidden", boxShadow: "var(--shadow-md)", border: "2px solid #fff" }}>
                <GarmentArt variant="saree" scene="studio" color="#d44a6b" />
              </div>
            </div>
          </div>
          <div style={{ padding: "0 18px 18px" }}>
            <Link href="/create/review" className="btn primary block sm">Review Now <ArrowRight size={16} /></Link>
          </div>
        </div>

        <div className="section-title"><h3>Today&apos;s Progress</h3><Link href="/analytics">Insights</Link></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
          {stats.map((s, i) => (
            <div key={s.label} className="card center" style={{ padding: "14px 4px" }}>
              <div
                style={{
                  width: 38, height: 38, margin: "0 auto", borderRadius: "50%", display: "grid", placeItems: "center",
                  fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16,
                  background: `conic-gradient(var(--violet) ${[70, 55, 30, 85][i]}%, var(--line) 0)`,
                }}
              >
                <span style={{ width: 30, height: 30, borderRadius: "50%", background: "#fff", display: "grid", placeItems: "center" }}>{s.n}</span>
              </div>
              <p className="tiny muted mt-8">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="section-title"><h3>Quick Actions</h3></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {ACTIONS.map(({ href, icon: Icon, label }) => (
            <Link key={label} href={href} className="card center" style={{ padding: "14px 6px" }}>
              <span className="tile-icon" style={{ margin: "0 auto" }}><Icon size={19} /></span>
              <p className="tiny mt-8" style={{ fontWeight: 600 }}>{label}</p>
            </Link>
          ))}
        </div>

        <div className="section-title"><h3>Recent content</h3><Link href="/products">See all</Link></div>
        <div className="chips scroll" style={{ gap: 10 }}>
          {products.slice(0, 5).map((p, i) => (
            <Link key={p.id} href="/create/review" style={{ flex: "none", width: 120 }}>
              <div className="frame" style={{ height: 150, borderRadius: 16 }}>
                <GarmentArt variant={p.variant} color={p.color} accent={p.accent} scene={["room", "studio", "outdoor", "luxury"][i % 4]} />
                <span className={`badge ${p.status === "posted" ? "green" : p.status === "review" ? "amber" : "gray"}`} style={{ position: "absolute", left: 8, bottom: 8 }}>
                  {p.status === "posted" ? "Posted" : p.status === "review" ? "Review" : "Draft"}
                </span>
              </div>
              <p className="tiny mt-4" style={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</p>
            </Link>
          ))}
        </div>
      </div>
      <BottomNav />
    </Screen>
  );
}
