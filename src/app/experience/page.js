import Link from "next/link";
import { Camera, UserRound, Rotate3d, MonitorSmartphone, ChevronRight } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";
import GarmentArt from "@/components/GarmentArt";

const CARDS = [
  { href: "/experience/try-on", icon: Camera, title: "Live Camera", text: "Try in real time", bg: "linear-gradient(135deg,#d7f5ee,#b9ebe0)", scene: "studio", variant: "anarkali" },
  { href: "/experience/model", icon: UserRound, title: "AI Model", text: "Explore on an AI model", bg: "linear-gradient(135deg,#e4e6ff,#efe0ff)", scene: "room", variant: "lehenga" },
  { href: "/experience/360", icon: Rotate3d, title: "360° View", text: "Explore every angle", bg: "linear-gradient(135deg,#ffe4ef,#ffeede)", scene: "studio", variant: "saree" },
];

export default function ExperienceHome() {
  return (
    <Screen tone="soft">
      <TopBar title="Bring your products to life" subtitle="Let customers see, try and explore." />
      <div className="body">
        <div className="g-3">
          {CARDS.map(({ href, icon: Icon, title, text, bg, scene, variant }) => (
            <Link key={href} href={href} className="card row xp-card" style={{ overflow: "hidden", background: bg, border: 0, alignItems: "stretch" }}>
              <div className="grow stack" style={{ padding: 18, justifyContent: "space-between" }}>
                <span className="tile-icon" style={{ background: "rgba(255,255,255,.7)" }}><Icon size={19} /></span>
                <div>
                  <p className="h-sm">{title}</p>
                  <p className="tiny" style={{ color: "var(--ink-2)" }}>{text}</p>
                </div>
              </div>
              <div className="xp-art" style={{ position: "relative" }}>
                <GarmentArt scene={scene} variant={variant} style={{ position: "absolute", inset: 0 }} />
                <span style={{ position: "absolute", right: 10, bottom: 10, width: 28, height: 28, borderRadius: 99, background: "#fff", display: "grid", placeItems: "center" }}><ChevronRight size={16} /></span>
              </div>
            </Link>
          ))}
        </div>

        <div className="card pad row gap-12 mt-12" style={{ borderStyle: "dashed", background: "transparent" }}>
          <span className="tile-icon"><MonitorSmartphone size={19} /></span>
          <div className="grow">
            <p className="h-sm" style={{ fontSize: 14 }}>ELEV8 Smart Mirror</p>
            <p className="tiny muted">In-store magic mirror try-on — coming soon</p>
          </div>
          <span className="badge pink">Soon</span>
        </div>
      </div>
      <style>{`
        .xp-card { height: 140px; }
        .xp-art { width: 128px; }
        @media (min-width: 720px) {
          .xp-card { height: 360px; flex-direction: column-reverse; }
          .xp-art { width: 100%; flex: 1; }
          .xp-card > .grow { flex: none; gap: 10px; }
        }
      `}</style>
    </Screen>
  );
}
