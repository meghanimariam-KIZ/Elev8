"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

/**
 * A page. `tone` = soft | night | black; `width` = narrow | medium | wide (default).
 */
export function Screen({ tone = "", width = "wide", className = "", children }) {
  return <div className={`screen ${tone} w-${width} ${className}`}>{children}</div>;
}

export function BackButton({ href, dark = false }) {
  const router = useRouter();
  const cls = `icon-btn ${dark ? "dark" : ""}`;
  if (href) {
    return <Link href={href} className={cls} aria-label="Back"><ChevronLeft size={20} /></Link>;
  }
  return <button className={cls} aria-label="Back" onClick={() => router.back()}><ChevronLeft size={20} /></button>;
}

/** Page header: optional back button, title, right-hand actions. */
export function TopBar({ title, subtitle, back, right, dark = false, children }) {
  return (
    <header className="topbar">
      {back !== false && back !== undefined && <BackButton href={back === true ? undefined : back} dark={dark} />}
      <div className="grow" style={{ minWidth: 0 }}>
        {title && <h1>{title}</h1>}
        {subtitle && <p className="small muted mt-4">{subtitle}</p>}
      </div>
      {children}
      {right}
    </header>
  );
}
