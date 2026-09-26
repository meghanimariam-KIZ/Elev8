"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Megaphone, PartyPopper, Rocket, Clock } from "lucide-react";
import { Screen, TopBar } from "@/components/Screen";
import GarmentArt from "@/components/GarmentArt";
import MonthCalendar, { Legend, EVENT_COLORS } from "@/components/MonthCalendar";
import { useStore, toISO } from "@/lib/store";
import { eventsForMonth, PLATFORM_LABEL } from "@/lib/posts";

export default function CalendarPage() {
  const { products, posts } = useStore();
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [day, setDay] = useState(() => new Date().getDate());
  const iso = toISO(new Date(month.getFullYear(), month.getMonth(), day));
  const dayPosts = posts.filter((p) => p.date === iso);
  const today = toISO(new Date());
  const upcoming = posts.filter((p) => p.date >= today && p.status !== "published").sort((a, b) => a.date.localeCompare(b.date));

  return (
    <Screen>
      <TopBar title="Content Calendar" subtitle={`${upcoming.length} upcoming posts`} right={<Link href="/create" className="btn primary sm"><Plus size={16} /> New post</Link>} />
      <div className="body">
        <div className="split">
          <div className="card pad">
            <MonthCalendar month={month} onMonth={setMonth} selected={day} onSelect={setDay} events={eventsForMonth(posts, month)} />
            <div className="mt-16"><Legend /></div>
          </div>

          <div className="stack gap-16">
            <div>
              <h3 className="h-sm">{longDate(iso)}</h3>
              <div className="stack gap-8 mt-8">
                {dayPosts.length === 0 && <div className="card pad center small muted">Nothing planned. <Link href="/create" className="link">Create content</Link></div>}
                {dayPosts.map((post) => <PostRow key={post.id} post={post} product={products.find((p) => p.id === post.productId)} />)}
              </div>
            </div>

            <div>
              <h3 className="h-sm">Upcoming</h3>
              <div className="stack gap-8 mt-8">
                {upcoming.length === 0 && <p className="small muted">No upcoming posts.</p>}
                {upcoming.slice(0, 5).map((post) => <PostRow key={post.id} post={post} product={products.find((p) => p.id === post.productId)} showDate />)}
              </div>
            </div>

            <div className="g-3">
              {[[Megaphone, "Campaign"], [PartyPopper, "Festival"], [Rocket, "Launch"]].map(([Icon, label]) => (
                <Link key={label} href="/create" className="card center" style={{ padding: "12px 4px" }}>
                  <span className="tile-icon" style={{ margin: "0 auto", width: 36, height: 36 }}><Icon size={17} /></span>
                  <p className="tiny mt-4" style={{ fontWeight: 600 }}>{label}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// Formatted by hand so server and browser render identical text.
function longDate(iso) {
  const d = new Date(iso + "T00:00");
  return `${WEEKDAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

function PostRow({ post, product, showDate }) {
  if (!product) return null;
  return (
    <div className="card row gap-12" style={{ padding: 10 }}>
      <div className="frame" style={{ width: 44, height: 54, borderRadius: 10, flex: "none" }}>
        <GarmentArt variant={product.variant} color={product.color} accent={product.accent} scene="studio" />
      </div>
      <div className="grow" style={{ minWidth: 0 }}>
        <p className="small" style={{ fontWeight: 700 }}>{product.name}</p>
        <p className="tiny muted row gap-4 mt-4">
          <Clock size={12} />
          {showDate && `${new Date(post.date + "T00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short" })} · `}
          {post.time} · {post.platforms.map((x) => PLATFORM_LABEL[x]).join(", ")}
        </p>
      </div>
      <span className="badge" style={{ background: "var(--surface-2)", color: EVENT_COLORS[post.status], textTransform: "capitalize" }}>{post.status}</span>
    </div>
  );
}
