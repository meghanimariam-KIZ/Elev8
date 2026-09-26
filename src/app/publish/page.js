"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, CheckCircle2, MessageCircle, Globe, ThumbsUp, Send } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";
import GarmentArt from "@/components/GarmentArt";
import InstagramGlyph from "@/components/InstagramGlyph";
import MonthCalendar, { Legend } from "@/components/MonthCalendar";

const PLATFORMS = [
  { key: "instagram", label: "Instagram", icon: () => <InstagramGlyph size={16} /> },
  { key: "facebook", label: "Facebook", icon: () => <ThumbsUp size={15} /> },
  { key: "whatsapp", label: "WhatsApp", icon: () => <MessageCircle size={15} /> },
  { key: "website", label: "Website", icon: () => <Globe size={15} /> },
];
const TIMES = ["11:00 AM", "1:30 PM", "7:30 PM", "9:00 PM"];
const EVENTS = { 3: "published", 7: "published", 12: "scheduled", 15: "draft", 19: "scheduled", 24: "scheduled", 28: "draft" };

export default function Publish() {
  const router = useRouter();
  const [platforms, setPlatforms] = useState(["instagram"]);
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [day, setDay] = useState(() => new Date().getDate());
  const [time, setTime] = useState("7:30 PM");
  const [done, setDone] = useState(null);

  const finish = (kind) => {
    setDone(kind);
    setTimeout(() => router.push(kind === "now" ? "/analytics" : "/calendar"), 1600);
  };

  return (
    <Screen>
      <TopBar title="Ready to publish?" back="/create/review" />
      <div className="body">
        <div className="card row gap-12" style={{ padding: 10 }}>
          <div className="frame" style={{ width: 76, height: 92, borderRadius: 14, flex: "none" }}><GarmentArt scene="luxury" /></div>
          <div className="grow">
            <p className="small" style={{ fontWeight: 600 }}>Grace in every detail ✨</p>
            <p className="tiny muted mt-4">#EthnicWear #WeddingSeason #Fashion</p>
            <span className="badge green mt-8"><CheckCircle2 size={12} /> Approved</span>
          </div>
        </div>

        <div className="section-title"><h3>Post to</h3></div>
        <div className="chips">
          {PLATFORMS.map(({ key, label, icon: Icon }) => {
            const on = platforms.includes(key);
            return (
              <button key={key} className={`chip ${on ? "on" : ""}`} onClick={() => setPlatforms((p) => (on ? p.filter((x) => x !== key) : [...p, key]))}>
                <Icon /> {label}
              </button>
            );
          })}
        </div>

        <div className="section-title"><h3>Schedule</h3></div>
        <div className="card pad">
          <MonthCalendar month={month} onMonth={setMonth} selected={day} onSelect={setDay} events={EVENTS} compact />
          <div className="mt-12"><Legend /></div>
        </div>

        <div className="card row gap-10 mt-12" style={{ padding: 12, background: "var(--grad-soft)", border: 0 }}>
          <Sparkles size={18} color="var(--violet)" />
          <p className="tiny grow" style={{ color: "var(--ink-2)" }}><b>AI Model suggests 7:30 PM</b> — your audience is most active in the evening.</p>
        </div>
        <div className="chips mt-12">
          {TIMES.map((t) => (
            <button key={t} className={`chip grad ${time === t ? "on" : ""}`} onClick={() => setTime(t)}>{t}</button>
          ))}
        </div>
      </div>
      <div className="footer row gap-8">
        <button className="btn secondary" onClick={() => finish("now")} disabled={!platforms.length}><Send size={16} /> Now</button>
        <button className="btn primary grow" onClick={() => finish("scheduled")} disabled={!platforms.length}>Schedule Post</button>
      </div>
      {done && (
        <div className="toast">
          <CheckCircle2 size={18} color="#4ade80" />
          {done === "now" ? "Published! Tracking performance…" : `Scheduled for ${month.toLocaleString("en-US", { month: "short" })} ${day}, ${time}`}
        </div>
      )}
    </Screen>
  );
}
