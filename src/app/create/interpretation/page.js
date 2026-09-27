"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Image as ImageIcon, Lock, Type, Check, Minus, Sparkles } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";

const DEFAULT_REQUEST = "Make the background more luxurious, but keep the dress exactly the same.";

/** Tiny keyword "interpreter" standing in for the real language model. */
function interpret(req) {
  const r = req.toLowerCase();
  const bg = /background|luxur|festive|outdoor|studio|scene|setting/.test(r);
  const caption = /caption|text|hashtag|shorten|shorter/.test(r);
  const bigger = /bigger|zoom|closer|larger/.test(r);
  return [
    { icon: ImageIcon, label: "Background", value: bg ? (/festive/.test(r) ? "Festive décor" : /outdoor/.test(r) ? "Outdoor garden" : "Premium luxury environment") : "No change", state: bg ? "change" : "same" },
    { icon: Lock, label: "Product", value: bigger ? "Larger in frame, details kept" : "Keep unchanged", state: bigger ? "change" : "lock" },
    { icon: Type, label: "Caption", value: caption ? "Shorter, same hashtags" : "No change", state: caption ? "change" : "same" },
  ];
}

function Interpretation() {
  const params = useSearchParams();
  const request = params.get("q") || DEFAULT_REQUEST;
  const changes = interpret(request);
  const summary = changes.filter((c) => c.state === "change").map((c) => c.label.toLowerCase());

  return (
    <Screen tone="soft" width="narrow">
      <TopBar back="/create/feedback" />
      <div className="body">
        <span className="tile-icon solid" style={{ width: 48, height: 48, borderRadius: 16 }}><Sparkles size={22} /></span>
        <h1 className="h-xl mt-16">Got it.</h1>
        <p className="sub mt-8" style={{ fontSize: 16 }}>
          {summary.length ? `I'll update the ${summary.join(" and ")} and keep everything else unchanged.` : "I'll refresh the visuals and keep the product unchanged."}
        </p>

        <p className="eyebrow mt-24">What I’ll change</p>
        <div className="card mt-8">
          {changes.map(({ icon: Icon, label, value, state }) => (
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

        <div className="card pad mt-12 small" style={{ background: "transparent", borderStyle: "dashed", color: "var(--ink-2)" }}>“{request}”</div>
      </div>
      <div className="footer stack gap-8">
        <Link href={`/create/regenerating?q=${encodeURIComponent(request)}`} className="btn primary block">Regenerate</Link>
        <Link href="/create/feedback" className="btn secondary block sm">Change request</Link>
      </div>
    </Screen>
  );
}

export default function Page() {
  return <Suspense><Interpretation /></Suspense>;
}
