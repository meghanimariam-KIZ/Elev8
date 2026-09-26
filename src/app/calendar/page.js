"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Megaphone, PartyPopper, Rocket, Clock } from "lucide-react";
import { Screen, TopBar, BottomNav } from "@/components/Screen";
import GarmentArt from "@/components/GarmentArt";
import MonthCalendar, { Legend, EVENT_COLORS } from "@/components/MonthCalendar";
import { useStore } from "@/lib/store";

const EVENTS = { 3: "published", 7: "published", 10: "published", 12: "scheduled", 15: "draft", 19: "scheduled", 22: "scheduled", 24: "scheduled", 28: "draft" };

export default function CalendarPage() {
  const { products } = useStore();
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [day, setDay] = useState(12);
  const status = EVENTS[day];
  const posts = status ? products.slice(day % 3, (day % 3) + (status === "scheduled" ? 2 : 1)) : [];

  return (
    <Screen>
      <TopBar title="Content Calendar" back="/home" right={<Link href="/products/new" className="icon-btn" aria-label="New post"><Plus size={18} /></Link>} />
      <div className="body">
        <div className="card pad">
          <MonthCalendar month={month} onMonth={setMonth} selected={day} onSelect={setDay} events={EVENTS} />
          <div className="mt-12"><Legend /></div>
        </div>

        <div className="section-title"><h3>{month.toLocaleString("en-US", { month: "long" })} {day}</h3></div>
        {posts.length === 0 && <div className="card pad center small muted">Nothing planned. <Link href="/create" className="link">Create content</Link></div>}
        <div className="stack gap-8">
          {posts.map((p, i) => (
            <div key={p.id} className="card row gap-12" style={{ padding: 10 }}>
              <div className="frame" style={{ width: 48, height: 58, borderRadius: 10, flex: "none" }}>
                <GarmentArt variant={p.variant} color={p.color} accent={p.accent} scene="studio" />
              </div>
              <div className="grow">
                <p className="small" style={{ fontWeight: 700 }}>{p.name}</p>
                <p className="tiny muted row gap-4 mt-4"><Clock size={12} /> {["11:00 AM", "7:30 PM"][i % 2]} · Instagram</p>
              </div>
              <span className="badge" style={{ background: "var(--surface-2)", color: EVENT_COLORS[status], textTransform: "capitalize" }}>{status}</span>
            </div>
          ))}
        </div>

        <Link href="/publish" className="btn primary block mt-16">Schedule Post</Link>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }} className="mt-16">
          {[[Megaphone, "Campaign"], [PartyPopper, "Festival"], [Rocket, "Launch"]].map(([Icon, label]) => (
            <Link key={label} href="/create" className="card center" style={{ padding: "12px 4px" }}>
              <span className="tile-icon" style={{ margin: "0 auto", width: 36, height: 36 }}><Icon size={17} /></span>
              <p className="tiny mt-4" style={{ fontWeight: 600 }}>{label}</p>
            </Link>
          ))}
        </div>
      </div>
      <BottomNav />
    </Screen>
  );
}
