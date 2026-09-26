"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mic, Send, Gem, Maximize2, PartyPopper, Scissors, Lock } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";

const SUGGESTIONS = [
  { icon: Gem, text: "Make the background more luxurious" },
  { icon: Maximize2, text: "Make the product bigger" },
  { icon: PartyPopper, text: "Use a festive look" },
  { icon: Scissors, text: "Shorten the caption" },
  { icon: Lock, text: "Don’t change the product" },
];

export default function Feedback() {
  const router = useRouter();
  const [picked, setPicked] = useState([SUGGESTIONS[0].text]);
  const [text, setText] = useState("");
  const toggle = (t) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  return (
    <Screen>
      <TopBar title="What would you like to change?" back="/create/review" />
      <div className="body">
        <p className="eyebrow mt-8">Quick suggestions</p>
        <div className="card mt-8">
          {SUGGESTIONS.map(({ icon: Icon, text: t }) => {
            const on = picked.includes(t);
            return (
              <button key={t} className="list-row" style={{ width: "100%", textAlign: "left" }} onClick={() => toggle(t)} aria-pressed={on}>
                <span className="tile-icon" style={{ width: 34, height: 34, borderRadius: 10, background: on ? "var(--grad)" : undefined, color: on ? "#fff" : undefined }}>
                  <Icon size={16} />
                </span>
                <span className="grow small" style={{ fontWeight: 600 }}>{t}</span>
                <span style={{ width: 20, height: 20, borderRadius: 99, border: on ? "6px solid var(--violet)" : "1.5px solid var(--line-2)", transition: "all .15s" }} />
              </button>
            );
          })}
        </div>

        <button className="btn primary block mt-24" style={{ height: 60, borderRadius: 20 }} onClick={() => router.push("/create/voice")}>
          <Mic size={20} /> Talk to ELEV8
        </button>
        <p className="center tiny muted mt-8">Hold a quick conversation — in Hindi or English.</p>
      </div>
      <div className="footer">
        <form className="input" style={{ paddingRight: 6 }} onSubmit={(e) => { e.preventDefault(); router.push("/create/interpretation"); }}>
          <input placeholder="Or type your request…" value={text} onChange={(e) => setText(e.target.value)} aria-label="Type your request" />
          <button type="submit" className="icon-btn" style={{ background: "var(--grad)", color: "#fff", border: 0 }} aria-label="Send" disabled={!text && picked.length === 0}>
            <Send size={17} />
          </button>
        </form>
      </div>
    </Screen>
  );
}
