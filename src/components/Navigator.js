"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SCREEN_GROUPS } from "@/lib/screens";
import Logo from "./Logo";

export default function Navigator() {
  const pathname = usePathname();
  let n = 0;

  return (
    <aside className="navigator" aria-label="Screen navigator">
      <div className="nav-brand">
        <Logo size={26} />
        <small>AI-powered retail transformation. Browse every screen of the app flow.</small>
      </div>
      {SCREEN_GROUPS.map((group) => (
        <div className="nav-group" key={group.title}>
          <h6>{group.title}</h6>
          {group.screens.map((s) => {
            n += 1;
            return (
              <Link key={s.href} href={s.href} className={`nav-link${pathname === s.href ? " active" : ""}`}>
                <span className="num">{String(n).padStart(2, "0")}</span>
                {s.label}
              </Link>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
