"use client";

import { Screen, TopBar } from "@/components/Screen";
import Steps from "@/components/Steps";
import Orb from "@/components/Orb";
import { useSequence } from "@/lib/hooks";

const ITEMS = ["Understanding product", "Applying brand style", "Creating visuals", "Checking quality", "Preparing your content"];

export default function Processing() {
  const step = useSequence(ITEMS.length, { interval: 1200, next: "/create/review" });
  return (
    <Screen tone="night">
      <TopBar back="/create" dark />
      <div className="body stack" style={{ paddingTop: 20 }}>
        <Orb size={160} />
        <h1 className="h-lg center mt-24" style={{ color: "#fff" }}>Creating your content…</h1>
        <p className="center small mt-4" style={{ color: "rgba(255,255,255,.6)" }}>Your AI employee is on it.</p>
        <div className="mt-24" style={{ padding: "20px", borderRadius: 20, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)" }}>
          <Steps items={ITEMS} current={step} />
        </div>
        <p className="center tiny" style={{ marginTop: "auto", paddingTop: 24, color: "rgba(255,255,255,.55)" }}>This may take 1–2 minutes</p>
      </div>
    </Screen>
  );
}
