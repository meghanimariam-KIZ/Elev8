"use client";

import { useState } from "react";
import { TrendingUp, Eye, Heart, ShoppingBag, Sparkles, Send } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";
import GarmentArt from "@/components/GarmentArt";
import { Sparkline, Bars } from "@/components/Charts";
import { useStore, inr } from "@/lib/store";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const k = (v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v);

const DATA = {
  Overview: { reach: [4.1, 5.2, 4.8, 6.3, 7.1, 9.4, 11.3].map((v) => v * 1000), eng: [520, 610, 580, 840, 900, 1480, 1870], clicks: [42, 51, 47, 63, 70, 96, 118] },
  Content: { reach: [3.2, 3.9, 4.4, 5.1, 6.6, 8.1, 9.0].map((v) => v * 1000), eng: [400, 460, 520, 690, 780, 1100, 1300], clicks: [30, 34, 41, 52, 60, 72, 88] },
  Products: { reach: [2.2, 2.9, 3.1, 3.3, 4.4, 5.9, 6.4].map((v) => v * 1000), eng: [210, 280, 300, 390, 470, 640, 720], clicks: [22, 28, 33, 35, 44, 58, 71] },
};
const sum = (a) => a.reduce((x, y) => x + y, 0);

export default function Analytics() {
  const { products, posts } = useStore();
  const [tab, setTab] = useState("Overview");
  const d = DATA[tab];
  const published = posts.filter((p) => p.status === "published");
  // Stable pseudo-reach per product so the ranking looks plausible without a backend.
  const ranked = products
    .map((p, i) => ({ ...p, reach: 44200 - i * 6100 + (posts.filter((x) => x.productId === p.id).length * 2300) }))
    .sort((a, b) => b.reach - a.reach)
    .slice(0, 4);
  const topReach = ranked[0]?.reach || 1;

  return (
    <Screen>
      <TopBar title="Analytics" subtitle="Last 7 days" right={
        <div className="row gap-4" style={{ padding: 4, background: "var(--surface-2)", borderRadius: 14 }}>
          {Object.keys(DATA).map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ height: 34, padding: "0 14px", borderRadius: 10, fontSize: 13, fontWeight: 600, background: tab === t ? "var(--surface)" : "transparent", boxShadow: tab === t ? "var(--shadow-sm)" : "none", color: tab === t ? "var(--ink)" : "var(--ink-3)" }}>{t}</button>
          ))}
        </div>
      } />
      <div className="body">
        <div className="g-4">
          <Stat icon={Eye} label="Reach" value={k(sum(d.reach))} delta="+12%" data={d.reach} />
          <Stat icon={Heart} label="Engagement" value={k(sum(d.eng))} delta="+18%" data={d.eng} />
          <Stat icon={ShoppingBag} label="Shop Now clicks" value={sum(d.clicks)} delta="+24%" data={d.clicks} />
          <div className="card" style={{ padding: "14px 14px 10px" }}>
            <p className="tiny muted row gap-4"><Send size={13} /> Posts published</p>
            <p className="h-md mt-4">{published.length}</p>
            <p className="tiny muted mt-8">{posts.length - published.length} scheduled or in draft</p>
          </div>
        </div>

        <div className="split mt-16">
          <div className="card pad">
            <div className="row between">
              <div>
                <p className="h-sm">Shop Now clicks per day</p>
                <p className="tiny muted">Customers who tapped through to buy</p>
              </div>
              <span className="badge green"><TrendingUp size={12} /> +24%</span>
            </div>
            <div className="mt-24"><Bars data={d.clicks} labels={DAYS} height={180} format={(v) => `${v} clicks`} /></div>
          </div>

          <div className="stack gap-12">
            <div className="card pad">
              <p className="h-sm">Top performing products</p>
              <div className="stack gap-12 mt-12">
                {ranked.map((p) => (
                  <div key={p.id} className="row gap-12">
                    <div className="frame" style={{ width: 44, height: 54, borderRadius: 10, flex: "none" }}>
                      <GarmentArt variant={p.variant} color={p.color} accent={p.accent} scene="room" />
                    </div>
                    <div className="grow" style={{ minWidth: 0 }}>
                      <div className="row between gap-8">
                        <p className="small" style={{ fontWeight: 700 }}>{p.name}</p>
                        <p className="tiny muted">{k(p.reach)}</p>
                      </div>
                      <p className="tiny muted">{inr(p.price)}</p>
                      <div className="progress mt-4" style={{ height: 5 }}><i style={{ width: `${(p.reach / topReach) * 100}%` }} /></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card row gap-10" style={{ padding: 14, background: "var(--grad-soft)", border: 0 }}>
              <Sparkles size={18} color="var(--violet)" style={{ flex: "none" }} />
              <p className="tiny" style={{ color: "var(--ink-2)", lineHeight: 1.5 }}>
                <b>Insight:</b> Lifestyle backgrounds get 2.1× more saves than studio shots. ELEV8 will favour them for your next posts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}

function Stat({ icon: Icon, label, value, delta, data }) {
  return (
    <div className="card" style={{ padding: "14px 14px 10px" }}>
      <p className="tiny muted row gap-4"><Icon size={13} /> {label}</p>
      <div className="row gap-6 mt-4" style={{ alignItems: "baseline" }}>
        <span className="h-md">{value}</span>
        <span className="tiny" style={{ color: "#148a55", fontWeight: 700 }}>▲ {delta}</span>
      </div>
      <div className="mt-8"><Sparkline data={data} labels={DAYS} format={k} height={46} /></div>
    </div>
  );
}
