"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, House, Package, Plus, Sparkles, Ellipsis } from "lucide-react";

export function StatusBar({ overlay = false }) {
  return (
    <div className={`statusbar${overlay ? " overlay" : ""}`} aria-hidden="true">
      <span>9:41</span>
      <span className="icons">
        <svg width="18" height="11" viewBox="0 0 18 11" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="5" y="5" width="3" height="6" rx="1" />
          <rect x="10" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="15" y="0" width="3" height="11" rx="1" />
        </svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
          <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3C13.3 1.5 10.8.4 8 .4S2.7 1.5.8 3.3L2 4.6c1.6-1.5 3.7-2.4 6-2.4zm0 3.5c1.3 0 2.5.5 3.5 1.3l1.2-1.3C11.4 4.6 9.8 4 8 4s-3.4.6-4.7 1.7L4.5 7c1-.8 2.2-1.3 3.5-1.3zm0 3.3a1.1 1.1 0 100 2.2 1.1 1.1 0 000-2.2z" />
        </svg>
        <span className="batt" />
      </span>
    </div>
  );
}

/** Full-height phone screen. `tone` = default | soft | night | black. */
export function Screen({ tone, children, overlayStatus = false, className = "" }) {
  return (
    <div className={`screen ${tone || ""} ${className}`}>
      <StatusBar overlay={overlayStatus} />
      {children}
    </div>
  );
}

export function BackButton({ href, dark = false }) {
  const router = useRouter();
  const cls = `icon-btn ${dark ? "dark" : "ghost"}`;
  if (href) {
    return (
      <Link href={href} className={cls} aria-label="Back">
        <ChevronLeft size={22} />
      </Link>
    );
  }
  return (
    <button className={cls} aria-label="Back" onClick={() => router.back()}>
      <ChevronLeft size={22} />
    </button>
  );
}

export function TopBar({ title, back, right, dark = false, children }) {
  return (
    <div className="topbar">
      {back !== false && <BackButton href={back} dark={dark} />}
      {title ? <h1>{title}</h1> : <span className="spacer" />}
      {children}
      {right}
    </div>
  );
}

const NAV = [
  { href: "/home", label: "Home", icon: House },
  { href: "/products", label: "Products", icon: Package },
  { href: "/products/new", label: "Create", icon: Plus, create: true },
  { href: "/experience", label: "Experience", icon: Sparkles },
  { href: "/profile", label: "More", icon: Ellipsis },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="bottomnav" aria-label="Primary">
      {NAV.map(({ href, label, icon: Icon, create }) => {
        const active = !create && (pathname === href || (href !== "/home" && pathname.startsWith(href + "/")));
        return (
          <Link key={href} href={href} className={`${active ? "active" : ""} ${create ? "create" : ""}`}>
            {create ? (
              <span className="plus"><Icon size={24} strokeWidth={2.5} /></span>
            ) : (
              <Icon size={22} strokeWidth={active ? 2.4 : 1.9} />
            )}
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
