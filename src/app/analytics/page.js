"use client";

import { useState } from "react";
import { TrendingUp, Eye, Heart, ShoppingBag, Sparkles } from "lucide-react";
import { Screen, TopBar, BottomNav } from "@/components/Screen";
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

export default function Analytics() {
  const { products } = useStore();
  const [tab, setTab] = useState("Overview");
  const d = DATA[tab];
  const sum = (a) => a.reduce((x, y) => x + y, 0);
  const top = products[0];

  return (
    <Screen>
      <TopBar title="Analytics" back="/home" right={<span className="chip soft" style={{ height: 30 }}>Last 7 days</span>} />
      <div className="body">
        <div className="row gap-4" style={{ padding: 4, background: "var(--surface-2)", borderRadius: 14 }}>
          {Object.keys(DATA).map((t) => (
            <button key={t} onClick={() => setTab(t)} className="grow" style={{ height: 34, borderRadius: 10, fontSize: 13, fontWeight: 600, background: tab === t ? "var(--surface)" : "transparent", boxShadow: tab === t ? "var(--shadow-sm)" : "none", color: tab === t ? "var(--ink)" : "var(--ink-3)" }}>{t}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }} className="mt-16">
          <Stat icon={Eye} label="Reach" value={k(sum(d.reach))} delta="+12%" data={d.reach} />
          <Stat icon={Heart} label="Engagement" value={k(sum(d.eng))} delta="+18%" data={d.eng} />
        </div>

        <div className="card pad mt-12">
          <div className="row between">
            <div>
              <p className="tiny muted row gap-4"><ShoppingBag size={13} /> Shop Now clicks</p>
              <p className="h-md mt-4">{sum(d.clicks)}</p>
            </div>
            <span className="badge green"><TrendingUp size={12} /> +24%</span>
          </div>
          <div className="mt-24"><Bars data={d.clicks} labels={DAYS} format={(v) => `${v} clicks`} /></div>
        </div>

        <div className="section-title"><h3>Top Performing Product</h3></div>
        <div className="card row gap-12" style={{ padding: 10 }}>
          <div className="frame" style={{ width: 60, height: 72, borderRadius: 12, flex: "none" }}>
            <GarmentArt variant={top.variant} color={top.color} accent={top.accent} scene="room" />
          </div>
          <div className="grow">
            <p className="small" style={{ fontWeight: 700 }}>{top.name}</p>
            <p className="tiny muted">{inr(top.price)} · 44.2K reach</p>
            <div className="progress mt-8" style={{ height: 5 }}><i style={{ width: "82%" }} /></div>
          </div>
        </div>

        <div className="card row gap-10 mt-12" style={{ padding: 14, background: "var(--grad-soft)", border: 0 }}>
          <Sparkles size={18} color="var(--violet)" style={{ flex: "none" }} />
          <p className="tiny" style={{ color: "var(--ink-2)", lineHeight: 1.5 }}>
            <b>Insight:</b> Lifestyle backgrounds get 2.1× more saves than studio shots. ELEV8 will favour them for your next posts.
          </p>
        </div>
      </div>
      <BottomNav />
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
