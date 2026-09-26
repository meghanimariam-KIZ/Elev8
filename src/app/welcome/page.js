import Link from "next/link";
import { Wand2, Sparkles, TrendingUp } from "lucide-react";
import { Screen } from "@/components/Screen";
import AuthLayout from "@/components/AuthLayout";
import GarmentArt from "@/components/GarmentArt";
import Logo from "@/components/Logo";

const FEATURES = [
  { icon: Wand2, title: "Create amazing content", text: "Studio-quality photos, videos & captions" },
  { icon: Sparkles, title: "Enable virtual experiences", text: "Try-on, AI models and 360° views" },
  { icon: TrendingUp, title: "Grow your business", text: "Post, schedule and learn what sells" },
];

export default function Welcome() {
  return (
    <AuthLayout>
      <Screen width="narrow">
        <div className="mobile-only" style={{ position: "relative", height: 360, background: "#f7e6de", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 30, bottom: 0 }}><GarmentArt scene="room" /></div>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 55%, var(--bg) 100%)" }} />
          <div style={{ position: "absolute", top: 20, left: 20 }}><Logo size={24} /></div>
        </div>
        <div className="body stack" style={{ justifyContent: "center" }}>
          <div className="desktop-only" style={{ marginBottom: 28 }}><Logo size={30} /></div>
          <h1 className="h-xl">Welcome to <span className="grad-text">ELEV8</span></h1>
          <p className="sub mt-8" style={{ fontSize: 16 }}>Your digital AI employee for physical retail.</p>
          <div className="stack gap-16 mt-24">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="row gap-12">
                <span className="tile-icon"><Icon size={19} /></span>
                <div>
                  <div className="h-sm" style={{ fontSize: 14.5 }}>{title}</div>
                  <div className="tiny muted">{text}</div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/signup" className="btn primary block mt-24">Get Started</Link>
          <p className="center small muted mt-12">
            Already have an account? <Link href="/home" className="link">Sign In</Link>
          </p>
        </div>
      </Screen>
    </AuthLayout>
  );
}
