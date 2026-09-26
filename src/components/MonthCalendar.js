"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

const DOW = ["S", "M", "T", "W", "T", "F", "S"];
export const EVENT_COLORS = { scheduled: "var(--violet)", draft: "var(--amber)", published: "var(--green)" };

/** Month grid. `events` maps day-of-month → "scheduled" | "draft" | "published". */
export default function MonthCalendar({ month, onMonth, selected, onSelect, events = {}, compact = false }) {
  const year = month.getFullYear();
  const m = month.getMonth();
  const first = new Date(year, m, 1).getDay();
  const days = new Date(year, m + 1, 0).getDate();
  const today = new Date();
  const isThisMonth = today.getFullYear() === year && today.getMonth() === m;
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const cell = compact ? 34 : 40;

  return (
    <div>
      <div className="row between" style={{ marginBottom: 10 }}>
        <button className="icon-btn ghost" style={{ width: 32, height: 32 }} onClick={() => onMonth(new Date(year, m - 1, 1))} aria-label="Previous month"><ChevronLeft size={18} /></button>
        <p className="h-sm">{month.toLocaleString("en-US", { month: "long", year: "numeric" })}</p>
        <button className="icon-btn ghost" style={{ width: 32, height: 32 }} onClick={() => onMonth(new Date(year, m + 1, 1))} aria-label="Next month"><ChevronRight size={18} /></button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", rowGap: 4, textAlign: "center" }}>
        {DOW.map((d, i) => <span key={i} className="tiny muted" style={{ fontWeight: 700, paddingBottom: 4 }}>{d}</span>)}
        {cells.map((d, i) => {
          if (!d) return <span key={`e${i}`} />;
          const on = d === selected;
          const isToday = isThisMonth && d === today.getDate();
          const ev = events[d];
          return (
            <button
              key={d} onClick={() => onSelect(d)} aria-pressed={on}
              style={{
                height: cell, width: cell, margin: "0 auto", borderRadius: 12, position: "relative",
                fontSize: 13, fontWeight: on || isToday ? 700 : 500,
                background: on ? "var(--grad)" : "transparent", color: on ? "#fff" : isToday ? "var(--violet)" : "var(--ink)",
                boxShadow: isToday && !on ? "inset 0 0 0 1.5px var(--violet)" : "none",
              }}
            >
              {d}
              {ev && (
                <span style={{ position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)", width: 5, height: 5, borderRadius: 9, background: on ? "#fff" : EVENT_COLORS[ev] }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Legend() {
  return (
    <div className="row gap-16 tiny muted" style={{ justifyContent: "center" }}>
      {Object.entries(EVENT_COLORS).map(([k, c]) => (
        <span key={k} className="row gap-6" style={{ textTransform: "capitalize" }}>
          <span style={{ width: 8, height: 8, borderRadius: 9, background: c }} />{k}
        </span>
      ))}
    </div>
  );
}
