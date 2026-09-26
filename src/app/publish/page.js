"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, CheckCircle2, MessageCircle, Globe, ThumbsUp, Send } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";
import GarmentArt from "@/components/GarmentArt";
import InstagramGlyph from "@/components/InstagramGlyph";
import MonthCalendar, { Legend } from "@/components/MonthCalendar";
import { useStore, toISO } from "@/lib/store";
import { eventsForMonth } from "@/lib/posts";

const PLATFORMS = [
  { key: "instagram", label: "Instagram", icon: () => <InstagramGlyph size={16} /> },
  { key: "facebook", label: "Facebook", icon: () => <ThumbsUp size={15} /> },
  { key: "whatsapp", label: "WhatsApp", icon: () => <MessageCircle size={15} /> },
  { key: "website", label: "Website", icon: () => <Globe size={15} /> },
];
const TIMES = ["11:00 AM", "1:30 PM", "7:30 PM", "9:00 PM"];

export default function Publish() {
  const router = useRouter();
  const { current, posts, addPost, brand } = useStore();
  const [platforms, setPlatforms] = useState(["instagram"]);
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [day, setDay] = useState(() => new Date().getDate());
  const [time, setTime] = useState("7:30 PM");
  const [done, setDone] = useState(null);

  const date = new Date(month.getFullYear(), month.getMonth(), day);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const inPast = date < today;

  const finish = (kind) => {
    if (!current) return;
    addPost({
      productId: current.id,
      date: kind === "now" ? toISO(new Date()) : toISO(date),
      time: kind === "now" ? new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : time,
      platforms,
      status: kind === "now" ? "published" : "scheduled",
    });
    setDone(kind);
    setTimeout(() => router.push(kind === "now" ? "/analytics" : "/calendar"), 1500);
  };

  return (
    <Screen width="medium">
      <TopBar title="Ready to publish?" subtitle="Pick where and when. ELEV8 posts it for you." back="/create/review" />
      <div className="body">
        <div className="split">
          <div className="stack gap-16">
            {current && (
              <div className="card row gap-12" style={{ padding: 10 }}>
                <div className="frame" style={{ width: 84, height: 104, borderRadius: 14, flex: "none" }}><GarmentArt scene="luxury" variant={current.variant} color={current.color} accent={current.accent} /></div>
                <div className="grow" style={{ minWidth: 0 }}>
                  <p className="small" style={{ fontWeight: 700 }}>{current.name}</p>
                  <p className="tiny muted mt-4" style={{ whiteSpace: "pre-line", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{current.caption || brand.tagline}</p>
                  <span className="badge green mt-8"><CheckCircle2 size={12} /> Approved</span>
                </div>
              </div>
            )}

            <div>
              <h3 className="h-sm">Post to</h3>
              <div className="chips mt-8">
                {PLATFORMS.map(({ key, label, icon: Icon }) => {
                  const on = platforms.includes(key);
                  return (
                    <button key={key} className={`chip ${on ? "on" : ""}`} aria-pressed={on} onClick={() => setPlatforms((p) => (on ? p.filter((x) => x !== key) : [...p, key]))}>
                      <Icon /> {label}
                    </button>
                  );
                })}
              </div>
              {!platforms.length && <p className="tiny mt-8" style={{ color: "var(--red)" }}>Pick at least one platform.</p>}
            </div>

            <div>
              <h3 className="h-sm">Time</h3>
              <div className="card row gap-10 mt-8" style={{ padding: 12, background: "var(--grad-soft)", border: 0 }}>
                <Sparkles size={18} color="var(--violet)" style={{ flex: "none" }} />
                <p className="tiny grow" style={{ color: "var(--ink-2)" }}><b>ELEV8 suggests 7:30 PM</b> — your audience is most active in the evening.</p>
              </div>
              <div className="chips mt-12">
                {TIMES.map((t) => <button key={t} className={`chip grad ${time === t ? "on" : ""}`} onClick={() => setTime(t)}>{t}</button>)}
              </div>
            </div>
          </div>

          <div className="card pad">
            <h3 className="h-sm" style={{ marginBottom: 10 }}>Date</h3>
            <MonthCalendar month={month} onMonth={setMonth} selected={day} onSelect={setDay} events={eventsForMonth(posts, month)} compact />
            <div className="mt-12"><Legend /></div>
            {inPast && <p className="tiny center mt-8" style={{ color: "var(--red)" }}>That date is in the past — pick a later day or publish now.</p>}
          </div>
        </div>
      </div>
      <div className="footer row gap-8">
        <button className="btn secondary" onClick={() => finish("now")} disabled={!platforms.length || !current}><Send size={16} /> <span className="mobile-only">Now</span><span className="desktop-only">Publish now</span></button>
        <button className="btn primary grow" onClick={() => finish("scheduled")} disabled={!platforms.length || inPast || !current}>
          Schedule<span className="desktop-only"> · {date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}, {time}</span>
        </button>
      </div>
      {done && (
        <div className="toast">
          <CheckCircle2 size={18} color="#4ade80" />
          {done === "now" ? "Published! Tracking performance…" : "Scheduled — added to your calendar"}
        </div>
      )}
    </Screen>
  );
}
