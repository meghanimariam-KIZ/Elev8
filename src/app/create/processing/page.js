"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";
import Steps from "@/components/Steps";
import Orb from "@/components/Orb";
import { useStore } from "@/lib/store";
import { DEFAULT_PLATFORMS } from "@/lib/config";

const ITEMS = ["Understanding product", "Applying brand style", "Creating visuals", "Checking quality", "Preparing your content"];

export default function Processing() {
  const router = useRouter();
  const { current, business, brand, updateProduct } = useStore();
  const [step, setStep] = useState(0);
  const [error, setError] = useState(null);
  const started = useRef(false);

  // Cycles the checklist while the real request is in flight — not tied to a fixed timer.
  useEffect(() => {
    if (error) return;
    const t = setInterval(() => setStep((s) => (s < ITEMS.length - 1 ? s + 1 : s)), 3000);
    return () => clearInterval(t);
  }, [error]);

  useEffect(() => {
    if (!current || started.current) return;
    started.current = true;

    (async () => {
      try {
        const res = await fetch("/api/generate-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: current.id,
            productName: current.name,
            category: current.category,
            price: current.price,
            brandName: business.name,
            brandStyle: brand.tone.join(", "),
            targetAudience: brand.audience.join(", "),
            productImageUrl: current.photo || "",
            platforms: DEFAULT_PLATFORMS,
            editInstructions: "",
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || "Content generation failed.");

        setStep(ITEMS.length);
        updateProduct(current.id, {
          generated: {
            contentId: data.contentId,
            imageUrl: data.imageUrl || "",
            videoUrl: data.videoUrl || "",
            caption: data.caption || "",
            hashtags: data.hashtags || [],
            generatedAt: data.generatedAt,
          },
          previousGenerated: null,
        });
        router.push("/create/review");
      } catch (err) {
        started.current = false;
        setError(err.message || "Something went wrong while generating your content.");
      }
    })();
  }, [current, business, brand, router, updateProduct]);

  if (!current) {
    return (
      <Screen tone="night" width="narrow">
        <TopBar back="/create" dark />
        <div className="body"><p className="sub" style={{ color: "#fff" }}>Add a product first to generate content.</p></div>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen tone="night" width="narrow">
        <TopBar back="/create" dark />
        <div className="body stack" style={{ paddingTop: 20, justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <span className="tile-icon solid" style={{ width: 56, height: 56, borderRadius: 18, background: "var(--red)" }}><AlertTriangle size={26} /></span>
          <h1 className="h-lg mt-24" style={{ color: "#fff" }}>Couldn’t generate your content</h1>
          <p className="small mt-8" style={{ color: "rgba(255,255,255,.7)", maxWidth: 320 }}>{error}</p>
          <button className="btn primary block mt-24" style={{ maxWidth: 240 }} onClick={() => { setError(null); started.current = false; setStep(0); }}>Try again</button>
        </div>
      </Screen>
    );
  }

  return (
    <Screen tone="night" width="narrow">
      <TopBar back="/create" dark />
      <div className="body stack" style={{ paddingTop: 20, justifyContent: "center" }}>
        <Orb size={160} />
        <h1 className="h-lg center mt-24" style={{ color: "#fff" }}>Creating your content…</h1>
        <p className="center small mt-4" style={{ color: "rgba(255,255,255,.6)" }}>Your AI employee is on it.</p>
        <div className="mt-24" style={{ padding: "20px", borderRadius: 20, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)" }}>
          <Steps items={ITEMS} current={step} />
        </div>
        <p className="center tiny" style={{ paddingTop: 24, color: "rgba(255,255,255,.55)" }}>This may take up to a couple of minutes</p>
      </div>
    </Screen>
  );
}
