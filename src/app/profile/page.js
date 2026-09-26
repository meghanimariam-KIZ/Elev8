"use client";

import Link from "next/link";
import {
  Building2, Brain, Link2, Bell, ShieldCheck, Mic, Zap, CircleHelp, Lock, LogOut, ChevronRight, Pencil,
} from "lucide-react";
import { Screen, TopBar, BottomNav } from "@/components/Screen";
import { useStore } from "@/lib/store";

const ITEMS = [
  { icon: Building2, label: "Business Profile", href: "/onboarding/business" },
  { icon: Brain, label: "Brand Brain", href: "/brand" },
  { icon: Link2, label: "Connected Accounts", meta: "Instagram" },
  { icon: Bell, label: "Notifications" },
  { icon: ShieldCheck, label: "Approval Preferences", meta: "Always ask" },
  { icon: Mic, label: "Voice Preferences", meta: "Hindi + English" },
  { icon: Zap, label: "Usage / Credits", meta: "320 left" },
  { icon: CircleHelp, label: "Help & Support" },
  { icon: Lock, label: "Privacy" },
];

export default function Profile() {
  const { user, business } = useStore();
  const initials = user.name.split(" ").map((w) => w[0]).join("").slice(0, 2);

  return (
    <Screen>
      <TopBar title="Profile & Settings" back="/home" />
      <div className="body">
        <div className="card pad row gap-12">
          <span style={{ width: 56, height: 56, borderRadius: 18, background: "var(--grad)", color: "#fff", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20 }}>
            {initials}
          </span>
          <div className="grow">
            <p className="h-sm">{user.name}</p>
            <p className="tiny muted">{business.name} · {business.location}</p>
          </div>
          <Link href="/signup" className="icon-btn" aria-label="Edit profile"><Pencil size={16} /></Link>
        </div>

        <div className="card mt-12" style={{ padding: 14, background: "linear-gradient(120deg,#1e1760,#4a2aa8 60%,#b43c8d)", color: "#fff", border: 0 }}>
          <div className="row between">
            <p className="small" style={{ fontWeight: 700 }}>ELEV8 Pro</p>
            <span className="tiny" style={{ opacity: .8 }}>Renews 12 Oct</span>
          </div>
          <div className="progress mt-8" style={{ background: "rgba(255,255,255,.2)" }}><i style={{ width: "64%", background: "#fff" }} /></div>
          <p className="tiny mt-8" style={{ opacity: .8 }}>320 of 500 AI credits left this month</p>
        </div>

        <div className="card mt-12">
          {ITEMS.map(({ icon: Icon, label, href, meta }) => {
            const inner = (
              <>
                <span className="tile-icon" style={{ width: 34, height: 34, borderRadius: 10 }}><Icon size={16} /></span>
                <span className="grow small" style={{ fontWeight: 600 }}>{label}</span>
                {meta && <span className="tiny muted">{meta}</span>}
                <ChevronRight size={16} color="var(--ink-3)" />
              </>
            );
            return href
              ? <Link key={label} href={href} className="list-row">{inner}</Link>
              : <button key={label} className="list-row" style={{ width: "100%", textAlign: "left" }}>{inner}</button>;
          })}
        </div>

        <Link href="/welcome" className="btn secondary block mt-16" style={{ color: "var(--red)" }}><LogOut size={17} /> Sign out</Link>
      </div>
      <BottomNav />
    </Screen>
  );
}
