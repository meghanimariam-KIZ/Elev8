"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";
import Steps from "@/components/Steps";
import { useCountUp } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import { DEFAULT_PLATFORMS } from "@/lib/config";

const ITEMS = ["Applying your changes", "Protecting product details", "Creating new visuals", "Checking quality"];

function Regenerating() {
  const router = useRouter();
  const params = useSearchParams();
  const editInstructions = params.get("q") || "";
  const { current, business, brand, contentTypes, updateProduct } = useStore();
  const [step, setStep] = useState(0);
  const [error, setError] = useState(null);
  const started = useRef(false);
  const pct = useCountUp(100, 6000);
  const R = 54, C = 2 * Math.PI * R;

  useEffect(() => {
    if (error) return;
    const t = setInterval(() => setStep((s) => (s < ITEMS.length - 1 ? s + 1 : s)), 2200);
    return () => clearInterval(t);
  }, [error]);

  useEffect(() => {
    if (!current || started.current) return;
    started.current = true;

    (async () => {
      try {
        if (!current.photo) {
          throw new Error("This product has no photo yet. Go back and add one before regenerating content.");
        }

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
            productImageUrl: current.photo,
            platforms: DEFAULT_PLATFORMS,
            contentTypes,
            editInstructions,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error || "Regeneration failed.");

        setStep(ITEMS.length);
        updateProduct(current.id, {
          previousGenerated: current.generated || null,
          generated: {
            contentId: data.contentId,
            imageUrl: data.imageUrl || "",
            videoUrl: data.videoUrl || "",
            caption: data.caption || "",
            hashtags: data.hashtags || [],
            generatedAt: data.generatedAt,
          },
        });
        router.push("/create/review");
      } catch (err) {
        started.current = false;
        setError(err.message || "Something went wrong while regenerating your content.");
      }
    })();
  }, [current, business, brand, contentTypes, editInstructions, router, updateProduct]);

  if (!current) {
    return (
      <Screen width="narrow"><TopBar back="/create/interpretation" /><div className="body"><p className="sub">Nothing to regenerate.</p></div></Screen>
    );
  }

  if (error) {
    return (
      <Screen width="narrow">
        <TopBar title="Couldn’t create a new version" back="/create/interpretation" />
        <div className="body stack" style={{ alignItems: "center", textAlign: "center", paddingTop: 20 }}>
          <span className="tile-icon solid" style={{ width: 48, height: 48, borderRadius: 16, background: "var(--red)" }}><AlertTriangle size={22} /></span>
          <p className="small mt-16" style={{ color: "var(--ink-2)", maxWidth: 300 }}>{error}</p>
          <button className="btn primary block mt-20" style={{ maxWidth: 220 }} onClick={() => { setError(null); started.current = false; setStep(0); }}>Try again</button>
        </div>
      </Screen>
    );
  }

  return (
    <Screen width="narrow">
      <TopBar title="Creating new version…" back="/create/interpretation" />
      <div className="body">
        <div className="mt-12"><Steps items={ITEMS} current={step} /></div>

        <div style={{ position: "relative", width: 150, height: 150, margin: "44px auto 0" }}>
          <svg width="150" height="150" viewBox="0 0 130 130" style={{ transform: "rotate(-90deg)" }}>
            <defs>
              <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#3a5bff" /><stop offset=".5" stopColor="#7a4dff" /><stop offset="1" stopColor="#e2449e" />
              </linearGradient>
            </defs>
            <circle cx="65" cy="65" r={R} fill="none" stroke="var(--line)" strokeWidth="10" />
            <circle cx="65" cy="65" r={R} fill="none" stroke="url(#ring)" strokeWidth="10" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 800 }}>{pct}%</span>
          </div>
        </div>
        <p className="center small muted mt-12">Quality check in progress…</p>

        <div className="frame mt-24" style={{ height: 70, borderRadius: 18, background: "var(--grad-soft)" }}>
          <div className="skeleton-shimmer" style={{ position: "absolute", inset: 0 }} />
        </div>
      </div>
    </Screen>
  );
}

export default function Page() {
  return <Suspense><Regenerating /></Suspense>;
}
