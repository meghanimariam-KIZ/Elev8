import Link from "next/link";
import { Image as ImageIcon, Lock, Type, Check, Minus, Sparkles } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";

const CHANGES = [
  { icon: ImageIcon, label: "Background", value: "Premium luxury environment", state: "change" },
  { icon: Lock, label: "Product", value: "Keep unchanged", state: "lock" },
  { icon: Type, label: "Caption", value: "No change", state: "same" },
];

export default function Interpretation() {
  return (
    <Screen tone="soft">
      <TopBar back="/create/feedback" />
      <div className="body">
        <span className="tile-icon solid" style={{ width: 48, height: 48, borderRadius: 16 }}><Sparkles size={22} /></span>
        <h1 className="h-xl mt-16">Got it.</h1>
        <p className="sub mt-8" style={{ fontSize: 16 }}>I’ll update the background and keep the product unchanged.</p>

        <p className="eyebrow mt-24">What I’ll change</p>
        <div className="card mt-8">
          {CHANGES.map(({ icon: Icon, label, value, state }) => (
            <div key={label} className="list-row">
              <span className="tile-icon" style={{ width: 36, height: 36 }}><Icon size={17} /></span>
              <p className="grow small" style={{ fontWeight: 700 }}>{label}</p>
              <span className={`badge ${state === "change" ? "violet" : state === "lock" ? "green" : "gray"}`}>
                {state === "change" ? <Check size={12} /> : state === "lock" ? <Lock size={11} /> : <Minus size={12} />}
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="card pad mt-12 small" style={{ background: "transparent", borderStyle: "dashed", color: "var(--ink-2)" }}>
          “Make the background more luxurious, but keep the dress exactly the same.”
        </div>
      </div>
      <div className="footer stack gap-8">
        <Link href="/create/regenerating" className="btn primary block">Regenerate</Link>
        <Link href="/create/feedback" className="btn secondary block sm">Change request</Link>
      </div>
    </Screen>
  );
}
