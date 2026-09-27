"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House, Package, Wand2, Sparkles, CalendarDays, BarChart3, Brain, Plus, Ellipsis, Zap,
} from "lucide-react";
import Logo from "./Logo";
import { useStore } from "@/lib/store";

const AUTH_ROUTES = ["/", "/welcome", "/signup"];
const isAuth = (p) => AUTH_ROUTES.includes(p) || p.startsWith("/onboarding");

// Top-level pages that show the bottom nav on phones.
const MOBILE_NAV_ROUTES = ["/home", "/products", "/experience", "/calendar", "/analytics", "/profile", "/brand"];

const SIDE = [
  { href: "/home", label: "Home", icon: House },
  { href: "/products", label: "Products", icon: Package },
  { href: "/create", label: "Create content", icon: Wand2 },
  { href: "/experience", label: "Experiences", icon: Sparkles },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/brand", label: "Brand Brain", icon: Brain },
];

const MOBILE = [
  { href: "/home", label: "Home", icon: House },
  { href: "/products", label: "Products", icon: Package },
  { href: "/products/new", label: "Create", icon: Plus, create: true },
  { href: "/experience", label: "Experience", icon: Sparkles },
  { href: "/profile", label: "More", icon: Ellipsis },
];

const matches = (pathname, href) => pathname === href || (href !== "/home" && pathname.startsWith(href + "/"));

export default function AppShell({ children }) {
  const pathname = usePathname();
  if (isAuth(pathname)) return <div className="app">{children}</div>;

  const mobileNav = MOBILE_NAV_ROUTES.includes(pathname);
  return (
    <div className={`app with-side ${mobileNav ? "with-mobile-nav" : ""}`}>
      <Sidebar pathname={pathname} />
      {children}
      {mobileNav && <MobileNav pathname={pathname} />}
    </div>
  );
}

function Sidebar({ pathname }) {
  const { user, business, credits } = useStore();
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <Link href="/home" className="side-logo"><Logo size={26} /></Link>
      <Link href="/products/new" className="btn primary sm" style={{ margin: "0 4px 14px" }}><Plus size={17} /> New product</Link>
      {SIDE.map(({ href, label, icon: Icon }) => {
        const active = matches(pathname, href) && !(href === "/products" && pathname.startsWith("/products/new"));
        return (
          <Link key={href} href={href} className={`side-link${active ? " active" : ""}`}>
            <Icon size={19} /> {label}
          </Link>
        );
      })}
      <div style={{ flex: 1 }} />
      <div className="card" style={{ padding: 14, background: "var(--grad-soft)", border: 0, margin: "12px 4px" }}>
        <p className="tiny row gap-6" style={{ fontWeight: 700 }}><Zap size={14} color="var(--violet)" /> {credits} AI credits left</p>
        <div className="progress mt-8" style={{ height: 5 }}><i style={{ width: `${(credits / 500) * 100}%` }} /></div>
      </div>
      <Link href="/profile" className={`side-link${pathname === "/profile" ? " active" : ""}`} style={{ height: 56 }}>
        <span style={{ width: 34, height: 34, borderRadius: 11, background: "var(--grad-soft)", border: "1px solid var(--line)", display: "grid", placeItems: "center", flex: "none" }}>
          <Logo size={22} markOnly />
        </span>
        <span className="grow" style={{ minWidth: 0 }}>
          <span style={{ display: "block", fontSize: 13.5, color: "var(--ink)" }}>{user.name}</span>
          <span className="tiny muted" style={{ display: "block", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{business.name}</span>
        </span>
      </Link>
    </aside>
  );
}

function MobileNav({ pathname }) {
  return (
    <nav className="bottomnav mobilenav" aria-label="Primary">
      {MOBILE.map(({ href, label, icon: Icon, create }) => {
        const active = !create && matches(pathname, href);
        return (
          <Link key={href} href={href} className={`${active ? "active" : ""} ${create ? "create" : ""}`}>
            {create ? <span className="plus"><Icon size={24} strokeWidth={2.5} /></span> : <Icon size={22} strokeWidth={active ? 2.4 : 1.9} />}
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
