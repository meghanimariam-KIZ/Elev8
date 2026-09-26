"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, PackagePlus, Wand2, Rotate3d, CalendarDays, BarChart3, Brain, ArrowRight, Clock } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";
import GarmentArt from "@/components/GarmentArt";
import { useStore, toISO } from "@/lib/store";

const ACTIONS = [
  { href: "/products/new", icon: PackagePlus, label: "Add Product" },
  { href: "/create", icon: Wand2, label: "Create Content" },
  { href: "/experience", icon: Rotate3d, label: "Try-On / 360°" },
  { href: "/calendar", icon: CalendarDays, label: "Calendar" },
  { href: "/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/brand", icon: Brain, label: "Brand Brain" },
];
const SCENES = ["room", "studio", "outdoor", "luxury"];

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

export default function Home() {
  const router = useRouter();
  const { business, products, posts, setCurrent } = useStore();
  const review = products.filter((p) => p.status === "review");
  const today = toISO(new Date());
  const upcoming = posts.filter((p) => p.date >= today && p.status !== "published").sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);

  const stats = [
    { n: products.length, label: "Products" },
    { n: posts.length, label: "Content" },
    { n: review.length, label: "Pending" },
    { n: posts.filter((p) => p.status === "published").length, label: "Published" },
  ];
  const max = Math.max(1, ...stats.map((s) => s.n));

  const openReview = () => {
    if (review[0]) setCurrent(review[0].id);
    router.push("/create/review");
  };

  return (
    <Screen>
      <TopBar
        title={business.name}
        subtitle={<span suppressHydrationWarning>{greeting()} 👋</span>}
        right={
          <button onClick={openReview} className="icon-btn" aria-label={`${review.length} items need review`}>
            <Bell size={19} />{review.length > 0 && <span className="dot" />}
          </button>
        }
      />

      <div className="body">
        <div className="split-r">
          <div className="stack gap-16">
            {/* Hero: review queue */}
            <div className="card" style={{ overflow: "hidden", border: 0, background: "linear-gradient(135deg,#fde9f1,#ece8ff)" }}>
              <div className="row" style={{ alignItems: "stretch" }}>
                <div className="grow" style={{ padding: "22px 12px 16px 22px" }}>
                  <span className="badge violet">AI · New</span>
                  <p className="h-md mt-8" style={{ fontSize: 19 }}>
                    {review.length ? `${review.length} product${review.length > 1 ? "s are" : " is"} ready for your review` : "You're all caught up"}
                  </p>
                  <p className="small muted mt-4">Photos, captions & a try-on look, generated and waiting for your approval.</p>
                  <button onClick={openReview} className="btn primary sm mt-16" disabled={!review.length}>Review Now <ArrowRight size={16} /></button>
                </div>
                <div style={{ width: "38%", maxWidth: 220, flex: "none", position: "relative", minHeight: 180 }}>
                  <div style={{ position: "absolute", inset: "16px -24px 16px 14px", transform: "rotate(5deg)", borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
                    <GarmentArt scene="luxury" color={review[0]?.color || "#e2667e"} variant={review[0]?.variant || "anarkali"} />
                  </div>
                  <div style={{ position: "absolute", left: -6, bottom: 10, width: "42%", aspectRatio: "4/5", transform: "rotate(-8deg)", borderRadius: 12, overflow: "hidden", boxShadow: "var(--shadow-md)", border: "2px solid #fff" }}>
                    <GarmentArt variant={review[1]?.variant || "saree"} color={review[1]?.color || "#d44a6b"} scene="studio" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="section-title" style={{ marginTop: 6 }}><h3>Quick Actions</h3></div>
              <div className="g-actions">
                {ACTIONS.map(({ href, icon: Icon, label }) => (
                  <Link key={label} href={href} className="card center" style={{ padding: "16px 6px" }}>
                    <span className="tile-icon" style={{ margin: "0 auto" }}><Icon size={19} /></span>
                    <p className="tiny mt-8" style={{ fontWeight: 600 }}>{label}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="stack gap-16">
            <div className="card pad">
              <div className="row between"><h3 className="h-sm">Today&apos;s Progress</h3><Link href="/analytics" className="tiny link">Insights</Link></div>
              <div className="g-stats mt-12">
                {stats.map((s) => (
                  <div key={s.label} className="center">
                    <div style={{ width: 46, height: 46, margin: "0 auto", borderRadius: "50%", display: "grid", placeItems: "center", background: `conic-gradient(var(--violet) ${(s.n / max) * 100}%, var(--line) 0)` }}>
                      <span style={{ width: 36, height: 36, borderRadius: "50%", background: "#fff", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 700 }}>{s.n}</span>
                    </div>
                    <p className="tiny muted mt-8">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card pad">
              <div className="row between"><h3 className="h-sm">Up next</h3><Link href="/calendar" className="tiny link">Calendar</Link></div>
              <div className="stack gap-10 mt-12">
                {upcoming.length === 0 && <p className="small muted">Nothing scheduled. <Link href="/create" className="link">Create content</Link></p>}
                {upcoming.map((post) => {
                  const p = products.find((x) => x.id === post.productId);
                  if (!p) return null;
                  return (
                    <div key={post.id} className="row gap-10">
                      <div className="frame" style={{ width: 40, height: 48, borderRadius: 10, flex: "none" }}><GarmentArt variant={p.variant} color={p.color} accent={p.accent} scene="studio" /></div>
                      <div className="grow" style={{ minWidth: 0 }}>
                        <p className="small" style={{ fontWeight: 700 }}>{p.name}</p>
                        <p className="tiny muted row gap-4"><Clock size={11} /> {new Date(post.date + "T00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short" })} · {post.time}</p>
                      </div>
                      <span className={`badge ${post.status === "draft" ? "amber" : "violet"}`} style={{ textTransform: "capitalize" }}>{post.status}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="section-title"><h3>Recent products</h3><Link href="/products">See all</Link></div>
        <div className="g-recent">
          {products.slice(0, 6).map((p, i) => (
            <button key={p.id} onClick={() => { setCurrent(p.id); router.push("/create/review"); }} style={{ textAlign: "left" }}>
              <div className="frame" style={{ aspectRatio: "4/5", borderRadius: 16 }}>
                <GarmentArt variant={p.variant} color={p.color} accent={p.accent} scene={SCENES[i % 4]} />
                <span className={`badge ${p.status === "posted" ? "green" : p.status === "review" ? "amber" : "gray"}`} style={{ position: "absolute", left: 8, bottom: 8 }}>
                  {p.status === "posted" ? "Posted" : p.status === "review" ? "Review" : "Draft"}
                </span>
              </div>
              <p className="small mt-8" style={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</p>
            </button>
          ))}
        </div>
      </div>
      <style>{`
        .g-recent { display:grid; gap:12px; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); }
        @media (max-width: 719px) { .g-recent { grid-template-columns: repeat(6, 128px); overflow-x:auto; margin:0 -20px; padding:0 20px 4px; scrollbar-width:none; } }
      `}</style>
    </Screen>
  );
}
